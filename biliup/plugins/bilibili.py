import time
import json
import re
import math
import random
import hmac
import hashlib
from typing import Dict, List, Any, Optional

from biliup.common.util import client
from biliup.config import config
from . import match1, logger, wbi, json_loads
from biliup.Danmaku import DanmakuClient
from ..engine.decorators import Plugin
from ..engine.download import DownloadBase


OFFICIAL_API = "https://api.live.bilibili.com"
STREAM_NAME_REGEXP = r"/live-bvc/\d+/(live_[^/\.]+)"
WBI_WEB_LOCATION = "444.8"

@Plugin.download(regexp=r'https?://(b23\.tv|live\.bilibili\.com)')
class Bililive(DownloadBase):
    def __init__(self, fname, url, suffix='flv'):
        super().__init__(fname, url, suffix)
        self.__cookies: Dict[str, Any] = dict()
        self.__cookies_update_time: int = 0
        self.__cookies_update_interval: int = 60 * 60 * 6 # 6 hours
        self.live_start_time: int = 0
        self.bilibili_danmaku: bool = config.get('bilibili_danmaku', False)
        self.bilibili_danmaku_detail: bool = config.get('bilibili_danmaku_detail', False)
        self.bilibili_danmaku_raw: bool = config.get('bilibili_danmaku_raw', False)
        self.__real_room_id: Optional[int] = None
        self.__login_mid: int = 0
        self.bili_cookie: Optional[str] = config.get('user', {}).get('bili_cookie')
        self.bili_cookie_file: Optional[str] = config.get('user', {}).get('bili_cookie_file')
        self.bili_qn: int = int(config.get('bili_qn', 20000))
        self.bili_protocol: str = config.get('bili_protocol', 'stream')
        self.bili_cdn: List[str] = config.get('bili_cdn', [])
        self.bili_hls_timeout: int = config.get('bili_hls_transcode_timeout', 60)
        self.bili_api_list: List[str] = [
            normalize_url(config.get('bili_liveapi', OFFICIAL_API)),
            normalize_url(config.get('bili_fallback_api', OFFICIAL_API)).rstrip('/'),
        ]
        self.bili_force_source: bool = config.get('bili_force_source', False)
        self.bili_anonymous_origin: bool = config.get('bili_anonymous_origin', False)
        self.bili_ov2cn: bool = config.get('bili_ov2cn', False)
        self.bili_normalize_cn204: bool = config.get('bili_normalize_cn204', False)
        self.cn01_sids: List[str] = config.get('bili_replace_cn01', [])
        self.bili_cdn_fallback: bool = config.get('bili_cdn_fallback', False)

    async def acheck_stream(self, is_check=False):

        if int(time.time()) - wbi.last_update >= wbi.UPDATE_INTERVAL:
            await self.update_wbi()

        if "b23.tv" in self.url:
            try:
                resp = await client.get(self.url, follow_redirects=False)
                if resp.status_code not in {301, 302}:
                    raise Exception("不支持的链接")
                url = str(resp.next_request.url)
                if "live.bilibili" not in url:
                    raise Exception("不支持的链接")
                self.url = url
            except Exception as e:
                logger.error(f"{self.plugin_msg}: {e}")
                return False


        await self.update_cookies()
        room_id: str = match1(self.url, r'bilibili.com/(\d+)')
        self.fake_headers['referer'] = self.url

        # 获取直播状态与房间标题
        try:
            params = {
                "room_id": room_id,
                "web_location": WBI_WEB_LOCATION,
            }
            wbi.sign(params)
            room_info = await client.get(
                f"{OFFICIAL_API}/xlive/web-room/v1/index/getInfoByRoom",
                params=params,
                headers=self.fake_headers,
                cookies=self.__cookies
            )
            room_info.raise_for_status()
            room_info = json_loads(room_info.text)
        except Exception as e:
            logger.error(f"{self.plugin_msg}: {e}", exc_info=True)
            return False
        if room_info['code'] != 0:
            logger.error(f"{self.plugin_msg}: {room_info}")
            return False
        else:
            room_info = room_info['data']
        if room_info['room_info']['live_status'] != 1:
            logger.debug(f"{self.plugin_msg}: 未开播")
            self.raw_stream_url = None
            return False

        self.live_cover_url = room_info['room_info']['cover']
        self.room_title = room_info['room_info']['title']
        self.__real_room_id = room_info['room_info']['room_id']
        live_start_time = room_info['room_info']['live_start_time']
        special_type = room_info['room_info']['special_type'] # 0: 公开直播, 1: 大航海专属
        if live_start_time > self.live_start_time:
            self.live_start_time = live_start_time
            is_new_live = True
        else:
            is_new_live = False

        if is_check:
            return True
        else:
            self.__login_mid = await self.check_login_status()

        # 复用原画 m3u8 流
        if  self.raw_stream_url is not None \
            and ".m3u8" in self.raw_stream_url \
            and self.bili_qn >= 10000 \
            and not is_new_live:
            url = await self.acheck_url_healthy(self.raw_stream_url)
            if url is not None:
                logger.debug(f"{self.plugin_msg}: 复用 {url}")
                return True
            else:
                self.raw_stream_url = None


        stream_urls = await self.aget_stream(self.bili_qn, self.bili_protocol, special_type)
        if not stream_urls:
            if self.bili_protocol == 'hls_fmp4':
                if int(time.time()) - live_start_time <= self.bili_hls_timeout:
                    logger.warning(f"{self.plugin_msg}: 暂未提供 hls_fmp4 流，等待下一次检测")
                    return False
                else:
                    # 回退首个可用格式
                    stream_urls = await self.aget_stream(self.bili_qn, 'stream', special_type)
            else:
                logger.error(f"{self.plugin_msg}: 获取{self.bili_protocol}流失败")
                return False

        target_quality_stream = stream_urls.get(
            str(self.bili_qn), next(iter(stream_urls.values()))
        )
        stream_url = {}
        if self.bili_cdn is not None:
            for cdn in self.bili_cdn:
                stream_info = target_quality_stream.get(cdn)
                if stream_info is not None:
                    current_cdn = cdn
                    stream_url = stream_info['url']
                    break
        if not stream_url:
            current_cdn, stream_info = next(iter(target_quality_stream.items()))
            stream_url = stream_info['url']
            logger.debug(f"{self.plugin_msg}: 使用 {current_cdn} 流")

        self.raw_stream_url = self.normalize_cn204(
            f"{stream_url['host']}{stream_url['base_url']}{stream_url['extra']}"
        )

        # 替换 cn-gotcha01 节点
        if self.cn01_sids and "cn-gotcha01" in current_cdn:
            if isinstance(self.cn01_sids, str):
                self.cn01_sids = self.cn01_sids.split(',')
            for sid in self.cn01_sids:
                new_url = f"https://{sid}.bilivideo.com{stream_url['base_url']}{stream_url['extra']}"
                new_url = await self.acheck_url_healthy(new_url)
                if new_url is not None:
                    self.raw_stream_url = new_url
                    break
                else:
                    logger.debug(f"{self.plugin_msg}: {sid} is not available")

        # 强制原画
        if self.bili_qn <= 10000 and self.bili_force_source:
            # 不处理 qn 20000
            if stream_info['suffix'] not in {'origin', 'uhd', 'maxhevc'}:
                __base_url = stream_url['base_url'].replace(f"_{stream_info['suffix']}", "")
                __sk = match1(stream_url['extra'], r'sk=([^&]+)')
                __extra = stream_url['extra'].replace(__sk, __sk[:32])
                __url = self.normalize_cn204(f"{stream_url['host']}{__base_url}{__extra}")
                if (await self.acheck_url_healthy(__url)) is not None:
                    self.raw_stream_url = __url
                    logger.info(f"{self.plugin_msg}: force_source 处理 {current_cdn} 成功 {stream_info['stream_name']}")
                else:
                    logger.debug(
                        f"{self.plugin_msg}: force_source 处理 {current_cdn} 失败 {stream_info['stream_name']}"
                    )

        # 回退
        if self.bili_cdn_fallback:
            __url = await self.acheck_url_healthy(self.raw_stream_url)
            if __url is None:
                for cdn, stream_info in target_quality_stream.items():
                    stream_url = stream_info['url']
                    __fallback_url = self.normalize_cn204(
                        f"{stream_url['host']}{stream_url['base_url']}{stream_url['extra']}"
                    )
                    try:
                        __url = await self.acheck_url_healthy(__fallback_url)
                        if __url is not None:
                            self.raw_stream_url = __url
                            logger.info(f"{self.plugin_msg}: cdn_fallback 回退到 {cdn} - {__fallback_url}")
                            break
                    except Exception as e:
                        logger.error(f"{self.plugin_msg}: cdn_fallback {e} - {__fallback_url}")
                        continue
                else:
                    logger.error(f"{self.plugin_msg}: 所有 cdn 均不可用")
                    self.raw_stream_url = None
                    return False
            else:
                self.raw_stream_url = __url

        return True

    def danmaku_init(self):
        if self.bilibili_danmaku:
            self.danmaku = DanmakuClient(
                self.url, self.gen_download_filename(), {
                    'room_id': self.__real_room_id,
                    'cookie': self.__cookies,
                    'detail': self.bilibili_danmaku_detail,
                    'raw': self.bilibili_danmaku_raw,
                    'uid': self.__login_mid
                }
            )


    async def get_play_info(self, api: str, qn: int = 10000) -> dict:
        full_url = f"{api}/xlive/web-room/v2/index/getRoomPlayInfo"
        try:
            params = {
                'room_id': str(self.__real_room_id),
                # 'no_playurl': '0',
                # 'mask': '1',
                'qn': str(qn),
                'platform': 'html5',  # 平台名称，web, html5, android, ios
                'protocol': '0,1',  # 流协议，0: http_stream(flv), 1: http_hls
                'format': '0,1,2',  # 编码格式，0: flv, 1: ts, 2: fmp4
                'codec': '0',  # 编码器，0: avc, 1: hevc, 2: av1
                # 'ptype': '8', # P2P配置，-1: disable, 8: WebRTC, 8192: MisakaTunnel
                'dolby': '5', # 杜比格式，5: 杜比音频
                # 'panorama': '1', # 全景(不支持 html5)
                # 'hdr_type': '0,1', # HDR类型(不支持 html5)，0: SDR, 1: PQ
                # 'req_reason': '0', # 请求原因，0: Normal, 1: PlayError
                # 'http': '1', # 优先 http 协议
                'web_location': WBI_WEB_LOCATION,
            }
            wbi.sign(params)
            api_res = await client.get(
                full_url, params=params, headers=self.fake_headers
            )
            api_res = json.loads(api_res.text)
            if api_res['code'] != 0:
                logger.error(f"{self.plugin_msg}: {api} 返回内容错误: {api_res}")
                return {}
            return api_res['data']
        except json.JSONDecodeError:
            logger.error(f"{self.plugin_msg}: {api} 返回内容错误: {api_res.text}")
        except Exception as e:
            logger.error(f"{self.plugin_msg}: {api} 获取 play_info 失败 -> {e}", exc_info=True)
        return {}

    async def get_master_m3u8(self, api: str) -> dict:
        full_url = f"{api}/xlive/web-room/v2/index/master_playurl"
        params = {
            "cid": self.__real_room_id,
            "mid": self.__login_mid,
            "pt": "html5", # platform
            # "p2p_type": "-1",
            # "net": 0,
            # "free_type": 0,
            # "build": 0,
            # "feature": 2 # 1:? 2:?
        }
        try:
            m3u8_res = await client.get(
                full_url, params=params, headers=self.fake_headers
            )
            if m3u8_res.status_code == 200 and m3u8_res.text.startswith("#EXTM3U"):
                return self.parse_master_m3u8(m3u8_res.text)
        except Exception as e:
            logger.error(f"{self.plugin_msg}: {api} 获取 m3u8 失败 -> {e}", exc_info=True)
        return {}

    async def aget_stream(self, qn: int = 10000, protocol: str = 'stream', special_type: int = 0) -> dict:
        """
        :param qn: 目标画质
        :param protocol: 流协议
        :param special_type: 特殊直播类型
        :return: 流信息
        """
        stream_urls = {}
        for api in self.bili_api_list:
            play_info = await self.get_play_info(api, qn)
            if not play_info or check_areablock(play_info):
                # logger.error(f"{self.plugin_msg}: {api} 返回内容错误: {play_info}")
                continue
            streams = play_info['playurl_info']['playurl']['stream']
            if protocol == 'hls_fmp4':
                if self.bili_anonymous_origin:
                    if special_type in play_info['all_special_types'] and not self.__login_mid:
                        logger.warn(f"{self.plugin_msg}: 特殊直播{special_type}")
                    else:
                        stream_urls = await self.get_master_m3u8(api)
                        if stream_urls:
                            break
                # 处理 API 信息
                stream = streams[1] if len(streams) > 1 else streams[0]
                for format in stream['format']:
                    if format['format_name'] == 'fmp4':
                        stream_urls = self.parse_stream_url(format['codec'][0])
                        # fmp4 可能没有原画
                        if qn == 10000 and qn in stream_urls.keys():
                            break
                        else:
                            stream_urls = {}
            else:
                stream_urls = self.parse_stream_url(streams[0]['format'][0]['codec'][0])
            if stream_urls:
                break
        # 空字典照常返回，重试交给上层方法处理
        return stream_urls

    async def get_user_status(self) -> dict:
        try:
            nav_res = await client.get(
                'https://api.bilibili.com/x/web-interface/nav',
                headers=self.fake_headers
            )
            nav_res.raise_for_status()
            nav_res = json.loads(nav_res.text)
            if (
                nav_res['code'] == 0 or
                (nav_res['code'] == -101 and nav_res['message'] == '账号未登录')
            ):
                return nav_res['data']
            logger.error(f"{self.plugin_msg}: 获取 nav 失败-{nav_res}")
        except:
            logger.error(f"{self.plugin_msg}: 获取 nav 失败", exc_info=True)
        return {}

    async def update_wbi(self):
        def _extract_key(url):
            if not url:
                return None
            slash = url.rfind('/')
            dot = url.find('.', slash)
            if slash == -1 or dot == -1:
                return None
            return url[slash + 1:dot]
        data = await self.get_user_status()
        wbi_key = data.get('wbi_img')
        if wbi_key:
            img_key = _extract_key(wbi_key.get('img_url'))
            sub_key = _extract_key(wbi_key.get('sub_url'))
            if img_key and sub_key:
                wbi.update_key(img_key, sub_key)
            else:
                logger.warning(f"img_key-{img_key}, sub_key-{sub_key}")
        else:
            logger.warning(f"Can not get wbi key by {data}")

    async def check_login_status(self) -> int:
        """
        检查B站登录状态
        :return: 当前登录用户 mid
        """
        try:
            data = await self.get_user_status()
            if data.get('isLogin'):
                logger.info(f"用户名：{data['uname']}, mid: {data['mid']}")
                return data['mid']
            else:
                logger.warning(f"{self.plugin_msg}: 未登录，或将只能录制到最低画质。")
        except Exception as e:
            logger.error(f"{self.plugin_msg}: 登录态校验失败 {e}")
        return 0

    def normalize_cn204(self, url: str) -> str:
        if self.bili_normalize_cn204 and "cn-gotcha204" in url:
            return re.sub(r"(?<=cn-gotcha204)-[1-4]", "", url, 1)
        return url

    def parse_stream_url(self, *args) -> dict:
        suffix_regexp = r'suffix=([^&]+)'
        if isinstance(args[0], str):
            url = args[0]
            host = "https://" + match1(url, r'https?://([^/]+)')
            stream_url = {
                'host': host if not self.bili_ov2cn else host.replace("ov-", "cn-"),
                'base_url': url.split("?")[0].split(host)[1] + "?",
                'extra': url.split("?")[1]
            }
            return {
                'url': stream_url,
                'stream_name': match1(url, STREAM_NAME_REGEXP),
                'suffix': match1(url, suffix_regexp)
            }
        elif isinstance(args[0], dict):
            streams = {}
            current_qn = args[0]['current_qn']
            streams.setdefault(current_qn, {})
            base_url = args[0]['base_url']
            for info in args[0]['url_info']:
                cdn_name = match1(info['extra'], r'cdn=([^&]+)')
                stream_url = {
                    'host': info['host'] if not self.bili_ov2cn else info['host'].replace("ov-", "cn-"),
                    'base_url': base_url,
                    'extra': info['extra']
                }
                streams[current_qn].setdefault(cdn_name, {
                    'url': stream_url,
                    'stream_name': match1(base_url, STREAM_NAME_REGEXP),
                    'suffix': match1(info['extra'], suffix_regexp)
                })
            return streams


    def parse_master_m3u8(self, m3u8_content: str) -> dict:
        """
        Returns:
            {
                "qn值": {
                    "cdn名称": {
                        "url": parsed_stream_url,
                        "stream_name": "流名称",
                        "suffix": "二压后缀"
                    }
                }
            }
        """
        lines = m3u8_content.strip().splitlines()
        current_qn = None
        result = {}

        if not lines[0].startswith('#EXTM3U'):
            raise ValueError('Invalid m3u8 file')

        for line in lines:
            if line.startswith('#EXT-X-STREAM-INF:'):
                codec = match1(line, r'CODECS="([^"]+)"')
                current_qn = match1(line, r'BILI-QN=(\d+)')

                if codec and current_qn:
                    if 'avc' in codec.lower():
                        result.setdefault(current_qn, {})
                    else:
                        current_qn = None

            elif line.startswith('http') and current_qn is not None:
                cdn_name = match1(line, r'cdn=([^&]+)')
                if cdn_name:
                    result[current_qn].setdefault(cdn_name, self.parse_stream_url(line))

        return dict(sorted(result.items(), key=lambda x: int(x[0]), reverse=True))


    async def update_cookies(self):
        if self.bili_cookie:
            for cookie in self.bili_cookie.split(';'):
                name, value = cookie.split('=', 1)
                self.__cookies[name] = value
        if self.bili_cookie_file:
            try:
                with open(self.bili_cookie_file, encoding='utf-8') as stream:
                    _cookies = json.load(stream)["cookie_info"]["cookies"]
                    for i in _cookies:
                        self.__cookies[i['name']] = i['value']
            except Exception:
                logger.exception("load_cookies error")
        if int(time.time()) - self.__cookies_update_time >= self.__cookies_update_interval:
            self.__cookies.update(self.gen_b_nut())
            self.__cookies.update(await self.get_buvid())
            self.__cookies.update(await self.get_bili_ticket())
            self.__cookies.update(self.gen_b_lsid())
            self.__cookies.update(self.gen_uuid())
            self.__cookies_update_time = int(time.time())
        print(self.__cookies)


    async def get_buvid(self) -> Dict:
        result = {}
        try:
            resp = await client.get(
                'https://api.bilibili.com/x/frontend/finger/spi',
                headers=self.fake_headers,
                cookies=self.__cookies
            )
            resp.raise_for_status()
            resp = json_loads(resp.text)
            if resp['code'] != 0:
                raise ValueError(f"{resp}")
            result = {
                'buvid3': resp['data']['b_3'],
                'buvid4': resp['data']['b_4'],
            }
        except Exception as e:
            logger.error(f"{self.plugin_msg}: 获取 buvid 失败 {e}", exc_info=True)
        return result


    async def get_bili_ticket(self) -> Dict:
        def hmac_sha256(key: str, data: str) -> str:
            return hmac.new(
                key.encode('utf-8'), data.encode('utf-8'), hashlib.sha256
            ).hexdigest()
        result = {}
        context = {
            'ts': str(int(time.time())),
        }
        try:
            # 构建用于签名的字符串
            sign_data = ''.join(f"{k}{v}" for k, v in context.items())
            params = {
                'key_id': 'ec02',
                'hexsign': hmac_sha256("XgwSnGZ1p", sign_data),
                'csrf': self.__cookies.get('bili_jct', ''),
                **{f'context[{k}]': v for k, v in context.items()}
            }
            resp = await client.post(
                'https://api.bilibili.com/bapis/bilibili.api.ticket.v1.Ticket/GenWebTicket',
                headers=self.fake_headers,
                params=params,
                cookies=self.__cookies
            )
            resp.raise_for_status()
            resp = json_loads(resp.text)
            if resp['code'] != 0:
                raise ValueError(f"{resp}")
            result = {
                'bili_ticket': resp['data']['ticket'],
                'bili_ticket_expires': str(resp['data']['created_at'] + resp['data']['ttl']),
            }
        except Exception as e:
            logger.error(f"{self.plugin_msg}: 获取 bili_ticket 失败 {e}", exc_info=True)
        return result


    def gen_b_lsid(self, millisecond=None) -> Dict:
        """
        Args:
            millisecond: 时间戳（毫秒），如果为None则使用当前时间

        Returns:
            Dict: {'b_lsid': cookie_value}
        """
        def o(e):
            return format(math.ceil(e), 'X')
        def a(length: int):
            t = ""
            for _ in range(length):
                t += o(16 * random.random())
            return pad_string(t, length)
        if millisecond is None:
            millisecond = int(time.time())
        t = o(millisecond)
        r = f"{a(8)}_{t}"
        return {
            'b_lsid': r,
        }


    def gen_uuid(self) -> Dict:
        def o(length: int):
            result = ""
            for _ in range(length):
                result += format(int(16 * random.random()), 'x')
            return pad_string(result, length)

        # Get current timestamp and format last 5 digits
        timestamp_part = pad_string(str(int(time.time()) % 100), 5)

        # Combine all parts
        return {
            '_uuid': f"{o(8)}-{o(4)}-{o(4)}-{o(4)}-{o(12)}{timestamp_part}infoc",
        }


    def gen_b_nut(self) -> Dict:
        return {
            'b_nut': str(int(time.time())),
        }



def pad_string(string: str, target_length: int) -> str:
    """Pad string with leading zeros to reach target length"""
    padding = "0" * max((target_length - len(string)), 0)
    return f"{padding}{string}"


# Copy from room-player.js
def check_areablock(data):
    '''
    :return: True if area block
    '''
    if not data['playurl_info']['playurl']:
        logger.error('Sorry, bilibili is currently not available in your country according to copyright restrictions.')
        logger.error('非常抱歉，根据版权方要求，您所在的地区无法观看本直播')
        return True
    return False

def normalize_url(url: str) -> str:
    return OFFICIAL_API if not url else (url if url.startswith(('http://', 'https://')) else 'http://' + url).rstrip('/')