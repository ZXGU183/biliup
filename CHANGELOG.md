### [>>Wiki<<](https://github.com/ZXGU183/biliup/wiki) —— [>>Readme<<](https://github.com/ZXGU183/biliup?tab=readme-ov-file)

# 更新日志

## 标签含义
- 💡新添加的功能
- 🔧已修复的问题
- ⚠️需要注意的更新信息

## 1.0.2.a0

- 💡feat(Huya): 支持 Huya Wup 协议以获取正确直播流，来自 [biliup#1385](https://github.com/biliup/biliup/pull/1385)
- 🔧chore(Upload): 优化登录功能

## 1.0.1.0a

- 💡feat(Upload): 添加登录页面，实现完整的用户认证系统
- 🔧fix(douyin): 修复抖音直播流获取问题

## 1.0.0.a0

- 💡feat(Upload): 新增上传重试次数限制和上传结果webhook通知，重新合并来自 [biliup#1355](https://github.com/biliup/biliup/pull/1355)
- 💡chore(rs): 同步 biliup-rs 组件更新
    - 💡feat(proxy): 添加proxy与用户绑定机制，添加proxy有效性检测。来自 [biliup-rs#189](https://github.com/biliup/biliup-rs/pull/189)
    - 🔧fix(stream-gears): [修复下载视频proxy不传递报错](https://github.com/biliup/biliup-rs/commit/dd791cecd6427ff1a5674e053635b82c82e35e0b)
- 💡chore: 批量检测支持发送上传事件，来自 [biliup#1246](https://github.com/biliup/biliup/pull/1246)

## 0.4.101.0a

- 🔧fix(Upload): bili_web 上传插件适配 biliup-rs 生成的 cookie file，stream-gears 上传接口默认修改为 app
- 🔧修复B站弹幕问题 by [unknown-o](https://github.com/unknown-o) in [#1342](https://github.com/biliup/biliup/pull/1342)

## 0.4.100.b3

- 🔧fix(Docker): 全局声明C.UTF-8字符编码以解决 [issue#1332](https://github.com/biliup/biliup/issues/1332) 提及的中文等字符乱码问题

[>在 Github 查看此版本](https://github.com/ZXGU183/biliup/releases/tag/v0.4.100.b3)

## 0.4.100.3a

- 💡feat: 抖音弹幕录制：添加用户名、id、礼物弹幕的录制。来自[biliup#1321](https://github.com/biliup/biliup/pull/1321)

[>在 Github 查看此版本](https://github.com/ZXGU183/biliup/releases/tag/v0.4.100.3a)

## 0.4.100.1

- 🔧[fix](https://github.com/biliup/biliup/pull/1325): 回滚文件名编解码返回逻辑以修复直接出现 unicode 的问题

- 🔧fix(Danmaku.bilibili): 适配B站弹幕连接风控策略，来自[biliup#1312](https://github.com/biliup/biliup/pull/1312)

- 🔧fix([sync-downloader.title](https://github.com/ZXGU183/biliup/commit/8f4b55760059cb373526969bfa0a718f95cf473c)): 对 sync-downloader 优先使用配置的标题格式

- _💡新增文件包括Windows下的FFmpeg变量批处理和配置模板、推荐的目录模板链式处理流部分示例，使用说明见[Wiki](https://github.com/ZXGU183/biliup/wiki)_

[>在 Github 查看此版本](https://github.com/ZXGU183/biliup/releases/tag/v0.4.100.1)

#### v0.4.100 - 2025-06-11

What's Changed

- 💡(Youtube): 拆分 YoutubeLive，添加 ytarchive 支持 by @xxxxuanran in https://github.com/biliup/biliup/pull/1307

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.99...v0.4.100

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.100)

#### v0.4.99 - 2025-06-10

What's Changed

* 可能修复了边录边传稿件标题为直播间标题和简介未格式化的情况 by @ransxd in https://github.com/biliup/biliup/pull/1297

- 🔧(Plugins.Huya): 修复当标题存在转义字符时正则匹配失败的问题 by @Kataick in https://github.com/biliup/biliup/pull/1301

- 🔧(Danmaku.bilibili): 修复B站弹幕连接异常 by @DetectiveLemon in https://github.com/biliup/biliup/pull/1311

New Contributors

* @ransxd made their first contribution in https://github.com/biliup/biliup/pull/1297

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.98...v0.4.99

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.99)

### May (2025)

#### v0.4.98 - 2025-05-12

What's Changed

- 🔧(Plugins.Huya): Update HuYaUA by @xxxxuanran in https://github.com/biliup/biliup/pull/1291

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.97...v0.4.98

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.98)

#### v0.4.97 - 2025-05-06

What's Changed

- 🔧: 修复播完自动上传时，仅自己可见状态失效 by @gweesin in https://github.com/biliup/biliup/pull/1276

- 💡: 适配TwitCasting,TwitCasting添加Cookie,TwitCasting添加画质选择 by @CoolZxp in https://github.com/biliup/biliup/pull/1282

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.96...v0.4.97

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.97)

### April (2025)

#### v0.4.96 - 2025-04-29

What's Changed

- 💡: 移动端响应式增强 by @gweesin in https://github.com/biliup/biliup/pull/1266

- 🔧(huya): update ua ts calculation and mobile api key error by @xxxxuanran in https://github.com/biliup/biliup/pull/1271

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.95...v0.4.96

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.96)

#### v0.4.95 - 2025-04-27

What's Changed

* docs: 修复开发环境缺失的步骤 by @gweesin in https://github.com/biliup/biliup/pull/1262

* chore(Dockerfile): 更新Dockerfile配置 by @SimonGino in https://github.com/biliup/biliup/pull/1260

- 💡: 支持仅自己可见开关 by @gweesin in https://github.com/biliup/biliup/pull/1261

- 🔧: ncp and sass should not production dependencies by @gweesin in https://github.com/biliup/biliup/pull/1265

- 💡: 抖音真原画 by @xxxxuanran in https://github.com/biliup/biliup/pull/1267

New Contributors

* @gweesin made their first contribution in https://github.com/biliup/biliup/pull/1262

* @SimonGino made their first contribution in https://github.com/biliup/biliup/pull/1260

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.94...v0.4.95

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.95)

#### v0.4.94 - 2025-04-24

What's Changed

* 增加+ by @TajangSec in https://github.com/biliup/biliup/pull/1249

- 💡(douyu): 构建斗鱼直播 tct & hs 流链接 by @xxxxuanran in https://github.com/biliup/biliup/pull/1256

New Contributors

* @TajangSec made their first contribution in https://github.com/biliup/biliup/pull/1249

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.93...v0.4.94

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.94)

#### v0.4.93 - 2025-04-14

What's Changed

* refactor: plugins.Huya by @xxxxuanran in https://github.com/biliup/biliup/pull/1238

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.92...v0.4.93

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.93)

#### v0.4.92 - 2025-04-05

What's Changed

- 🔧 修复一些边录边传下载器的bug by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1220

* mod: 修改原始弹幕录制逻辑 by @unknown-o in https://github.com/biliup/biliup/pull/1217

- 💡: Implement WBI signing mechanism for Bilibili API requests by @xxxxuanran in https://github.com/biliup/biliup/pull/1223

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.91...v0.4.92

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.92)

#### v0.4.91 - 2025-04-03

What's Changed

* webui: 录制时间范围改用TimePicker，选择时间 by @ruinmi in https://github.com/biliup/biliup/pull/1211

- 🔧: stream-gears上传投稿参数错误 by @hxzll in https://github.com/biliup/biliup/pull/1221

- 🔧: 修复streamlink下载器header参数 by @dreammu in https://github.com/biliup/biliup/pull/1218

New Contributors

* @hxzll made their first contribution in https://github.com/biliup/biliup/pull/1221

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.90...v0.4.91

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.91)

#### v0.4.90 - 2025-04-01

What's Changed

* Add 添加实时日志展示 by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1210

* Bump version to 0.4.90 by @xxxxuanran in https://github.com/biliup/biliup/pull/1215

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.89...v0.4.90

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.90)

### March (2025)

#### v0.4.89 - 2025-03-31

What's Changed

- 🔧: 移除streamlink的弃用参数 by @dreammu in https://github.com/biliup/biliup/pull/1201

- 🔧 修复一些问题 by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1207

* Update README.md by @viondw in https://github.com/biliup/biliup/pull/1205

- 💡: 支持B站完整弹幕录制 by @unknown-o in https://github.com/biliup/biliup/pull/1186

- 💡ure: 关键词不录播 by @ruinmi in https://github.com/biliup/biliup/pull/1200

- 🔧: 回归下载器选择streamlink时的正常行为 by @dreammu in https://github.com/biliup/biliup/pull/1202

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.88...v0.4.89

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.89)

#### v0.4.88 - 2025-03-23

What's Changed

- 🔧(Huya): 星秀区下载错误 by @xxxxuanran in https://github.com/biliup/biliup/pull/1197

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.87...v0.4.88

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.88)

#### v0.4.87 - 2025-03-12

What's Changed

* Update dependencies and Python version requirements by @xxxxuanran in https://github.com/biliup/biliup/pull/1185

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.86...v0.4.87

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.87)

#### v0.4.86 - 2025-03-12

What's Changed

* Update pyproject.toml by @ZRdRy in https://github.com/biliup/biliup/pull/1183

New Contributors

* @ZRdRy made their first contribution in https://github.com/biliup/biliup/pull/1183

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.85...v0.4.86

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.86)

#### v0.4.85 - 2025-03-11

What's Changed

- 🔧:  解决边录边传中默认值错误导致的异常 by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1159

* B站弹幕部分的参数兼容DanmakuFactory可识别用户名 by @rslywhj in https://github.com/biliup/biliup/pull/1172

- 🔧非详细弹幕content丢失 by @rslywhj in https://github.com/biliup/biliup/pull/1175

- 💡: Use system certificate store by default by @xxxxuanran in https://github.com/biliup/biliup/pull/1176

* Dev 修复边录边传的一些bug by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1167

* logo readme up by @viondw in https://github.com/biliup/biliup/pull/1164

New Contributors

* @rslywhj made their first contribution in https://github.com/biliup/biliup/pull/1172

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.84...v0.4.85

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.85)

### February (2025)

#### v0.4.84 - 2025-02-08

What's Changed

* Update layout.tsx by @q8018414 in https://github.com/biliup/biliup/pull/1156

* 相似备注检查跳过自身；格式化用户模板提交之数据 by @xxxxuanran in https://github.com/biliup/biliup/pull/1157

* Bumping version by @ForgQi in https://github.com/biliup/biliup/pull/1158

New Contributors

* @q8018414 made their first contribution in https://github.com/biliup/biliup/pull/1156

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.83...v0.4.84

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.84)

#### v0.4.83 - 2025-02-06

What's Changed

* README changelog Update by @viondw in https://github.com/biliup/biliup/pull/1153

- 💡: Add override configuration support for streamers by @xxxxuanran in https://github.com/biliup/biliup/pull/1151

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.82...v0.4.83

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.83)

#### v0.4.82 - 2025-02-05

What's Changed

* perf: 优化B站弹幕录制 by @unknown-o in https://github.com/biliup/biliup/pull/1126

* Style(webui): 执行前端代码格式化 by @alpzmj9 in https://github.com/biliup/biliup/pull/1141

* Dev 适配 biliup/biliup-rs186  测试边录边上传功能 by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1140

- 💡: Add Kilakila streaming platform support by @xxxxuanran in https://github.com/biliup/biliup/pull/1148

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.81...v0.4.82

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.82)

### January (2025)

#### v0.4.81 - 2025-01-04

What's Changed

- 💡: B站弹幕录制优化 by @unknown-o in https://github.com/biliup/biliup/pull/1120

New Contributors

* @unknown-o made their first contribution in https://github.com/biliup/biliup/pull/1120

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.80...v0.4.81

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.81)

## 2024 年

### December (2024)

#### v0.4.80 - 2024-12-31

What's Changed

- 🔧: dtime by @xxxxuanran in https://github.com/biliup/biliup/pull/1121

修复延迟发布（来自赞助者的要求）。 resolves https://github.com/biliup/biliup/issues/1106

更换播放器以支持 mp4 封装和 HEVC on FLV。 fixes https://github.com/biliup/biliup/issues/1117

fixes https://github.com/biliup/biliup/issues/1116

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.79...v0.4.80

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.80)

#### v0.4.79 - 2024-12-19

What's Changed

* web ui 功能更改；增加录制时间范围功能 by @ruinmi in https://github.com/biliup/biliup/pull/1017

* style: refactor mobile client header style by @see-more in https://github.com/biliup/biliup/pull/1064

* Update README.md Docker by @viondw in https://github.com/biliup/biliup/pull/1080

- 🔧(huya): skip query param generation for "xingxiu" streamers by @xxxxuanran in https://github.com/biliup/biliup/pull/1099

- 💡(webui): 深色模式添加自动跟随系统，添加格式化配置文件。 by @alpzmj9 in https://github.com/biliup/biliup/pull/1109

- 💡: enhance dashboard and plugin by @xxxxuanran in https://github.com/biliup/biliup/pull/1114

New Contributors

* @ruinmi made their first contribution in https://github.com/biliup/biliup/pull/1017

* @see-more made their first contribution in https://github.com/biliup/biliup/pull/1064

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.78...v0.4.79

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.79)

### September (2024)

#### v0.4.78 - 2024-09-01

What's Changed

- 🔧(Douyin): 修复 PCWeb 直播页电台类型直播录制 by @xxxxuanran in https://github.com/biliup/biliup/pull/1044

- 🔧(Upload): 重传时未能从数据库获取直播信息 by @xxxxuanran in https://github.com/biliup/biliup/pull/1045

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.77...v0.4.78

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.78)

### August (2024)

#### v0.4.77 - 2024-08-17

What's Changed

- 🔧[build]: 修复直接提交 commit时，ci 构建失败的问题 by @XiaoMiku01 in https://github.com/biliup/biliup/pull/1037

- 🔧: 虎牙弹幕丢失 (949) by @CoolZxp in https://github.com/biliup/biliup/pull/1035

- 🔧(Huya): platform_id error by @xxxxuanran in https://github.com/biliup/biliup/pull/1039

New Contributors

* @XiaoMiku01 made their first contribution in https://github.com/biliup/biliup/pull/1037

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.76...v0.4.77

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.77)

#### v0.4.76 - 2024-08-12

What's Changed

- 🔧修复v0.4.75抖音默认开启录制弹幕的问题 by @hfdem in https://github.com/biliup/biliup/pull/1022

- 🔧(webui): 修复直播历史与历史记录排序问题 by @Kataick in https://github.com/biliup/biliup/pull/1025

* flx(build): 修复1025 npm会编译失败的问题 by @Kataick in https://github.com/biliup/biliup/pull/1031

New Contributors

* @hfdem made their first contribution in https://github.com/biliup/biliup/pull/1022

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.75...v0.4.76

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.76)

#### v0.4.75 - 2024-08-05

What's Changed

* 支持抖音短链录制弹幕 by @xxxxuanran in https://github.com/biliup/biliup/pull/1015

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.74...v0.4.75

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.75)

### July (2024)

#### v0.4.74 - 2024-07-31

What's Changed

- 🔧修复变量未定义 by @xxxxuanran in https://github.com/biliup/biliup/pull/1012

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.73...v0.4.74

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.74)

#### v0.4.73 - 2024-07-31

What's Changed

* 适配抖音短链、电台、多屏直播 by @xxxxuanran in https://github.com/biliup/biliup/pull/1010

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.72...v0.4.73

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.73)

#### v0.4.72 - 2024-07-17

What's Changed

* update Readme by @xxxxuanran in https://github.com/biliup/biliup/pull/992

- 🔧: 在没有配置最大码率时跳过码率选择 by @xxxxuanran in https://github.com/biliup/biliup/pull/993

- 💡: Add cache during runtime by @xxxxuanran in https://github.com/biliup/biliup/pull/995

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.71...v0.4.72

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.72)

#### v0.4.71 - 2024-07-10

What's Changed

* Add by @viondw in https://github.com/biliup/biliup/pull/976

- 💡: danmaku xml 兼容b站格式 by @BugKun in https://github.com/biliup/biliup/pull/985

* 减少douyu通过发送请求获取房间号次数 by @Kataick in https://github.com/biliup/biliup/pull/950

- 💡(Huya): use the api to get live streams by @xxxxuanran in https://github.com/biliup/biliup/pull/986

New Contributors

* @BugKun made their first contribution in https://github.com/biliup/biliup/pull/985

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.70...v0.4.71

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.71)

### June (2024)

#### v0.4.70 - 2024-06-23

What's Changed

- 🔧: first run error by @xxxxuanran in https://github.com/biliup/biliup/pull/968

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.69...v0.4.70

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.70)

#### v0.4.69 - 2024-06-22

What's Changed

- 💡(download): Support hls for huya, douyin by @xxxxuanran in https://github.com/biliup/biliup/pull/958

- 🔧: val name err by @xxxxuanran in https://github.com/biliup/biliup/pull/962

* Minimal import by @xxxxuanran in https://github.com/biliup/biliup/pull/963

- 🔧(douyin-danmaku): include signature parameter by @xxxxuanran in https://github.com/biliup/biliup/pull/967

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.68...v0.4.69

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.69)

#### v0.4.68 - 2024-06-02

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.67...v0.4.68

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.68)

### May (2024)

#### v0.4.67 - 2024-05-29

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.66...v0.4.67

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.67)

#### v0.4.66 - 2024-05-28

What's Changed

- 🔧(Blive): 原画优先 by @xxxxuanran in https://github.com/biliup/biliup/pull/946

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.65...v0.4.66

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.66)

#### v0.4.65 - 2024-05-26

What's Changed

* 限制 Twitch 同时查询数量 by @xxxxuanran in https://github.com/biliup/biliup/pull/941

- 💡(Douyu): 拒绝互动游戏 by @xxxxuanran in https://github.com/biliup/biliup/pull/943

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.64...v0.4.65

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.65)

#### v0.4.64 - 2024-05-20

What's Changed

* 更新 CC 平台 by @xxxxuanran in https://github.com/biliup/biliup/pull/936

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.63...v0.4.64

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.64)

#### v0.4.63 - 2024-05-19

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.62...v0.4.63

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.63)

#### v0.4.62 - 2024-05-19

What's Changed

* Update CHANGELOG.md by @viondw in https://github.com/biliup/biliup/pull/932

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.61...v0.4.62

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.62)

#### v0.4.61 - 2024-05-19

What's Changed

* 修正不存在配置时出现的错误引用 by @xxxxuanran in https://github.com/biliup/biliup/pull/933

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.60...v0.4.61

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.61)

#### v0.4.60 - 2024-05-18

What's Changed

* Update README.md by @viondw in https://github.com/biliup/biliup/pull/930

* 行为调整 by @xxxxuanran in https://github.com/biliup/biliup/pull/925

* 适配白色背景 by @viondw in https://github.com/biliup/biliup/pull/931

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.59...v0.4.60

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.60)

#### v0.4.59 - 2024-05-13

What's Changed

* Update README.md by @ikun1993 in https://github.com/biliup/biliup/pull/926

* 下载流程调整 by @CoolZxp in https://github.com/biliup/biliup/pull/927

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.58...v0.4.59

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.59)

#### v0.4.58 - 2024-05-11

What's Changed

* 使上传转载来源生效 by @CoolZxp in https://github.com/biliup/biliup/pull/910

* 909 补充 by @xxxxuanran in https://github.com/biliup/biliup/pull/916

* 下载流程优化 by @CoolZxp in https://github.com/biliup/biliup/pull/917

* 避免streamlink进程残留 by @CoolZxp in https://github.com/biliup/biliup/pull/918

* 精简 Docker 镜像 by @xxxxuanran in https://github.com/biliup/biliup/pull/921

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.57...v0.4.58

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.58)

### April (2024)

#### v0.4.57 - 2024-04-30

What's Changed

* 下载流程调整 by @CoolZxp in https://github.com/biliup/biliup/pull/906

* Patch 20240501 by @xxxxuanran in https://github.com/biliup/biliup/pull/909

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.56...v0.4.57

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.57)

#### v0.4.56 - 2024-04-27

What's Changed

- 🔧修复按大小分段 by @CoolZxp in https://github.com/biliup/biliup/pull/904

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.55...v0.4.56

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.56)

#### v0.4.55 - 2024-04-27

What's Changed

* Update README.md by @viondw in https://github.com/biliup/biliup/pull/899

* Update CHANGELOG.md by @viondw in https://github.com/biliup/biliup/pull/900

* 防止分段后处理超出预期的执行次数 by @Kataick in https://github.com/biliup/biliup/pull/895

* 下载功能调整 by @CoolZxp in https://github.com/biliup/biliup/pull/902

* Webui 优化 by @xxxxuanran in https://github.com/biliup/biliup/pull/903

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.54...v0.4.55

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.55)

#### v0.4.54 - 2024-04-24

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.53...v0.4.54

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.54)

#### v0.4.53 - 2024-04-23

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.52...v0.4.53

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.53)

#### v0.4.52 - 2024-04-23

What's Changed

* Update CHANGELOG.md by @viondw in https://github.com/biliup/biliup/pull/880

* 缓解 HTTP 漏洞 by @xxxxuanran in https://github.com/biliup/biliup/pull/877

* Update CHANGELOG.md by @viondw in https://github.com/biliup/biliup/pull/882

* Update bug-report.yaml by @xxxxuanran in https://github.com/biliup/biliup/pull/885

* remove some shields by @Kataick in https://github.com/biliup/biliup/pull/886

* 小小美化一下 by @viondw in https://github.com/biliup/biliup/pull/888

* Update cookie.tsx by @ikun1993 in https://github.com/biliup/biliup/pull/889

* 优化显示 by @viondw in https://github.com/biliup/biliup/pull/890

* 优化排版/链接 by @viondw in https://github.com/biliup/biliup/pull/891

New Contributors

* @ikun1993 made their first contribution in https://github.com/biliup/biliup/pull/889

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.51...v0.4.52

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.52)

#### v0.4.51 - 2024-04-17

What's Changed

* 新增分段后处理功能(返回当前分段的视频文件 只支持run指令) by @Kataick in https://github.com/biliup/biliup/pull/868

- 🔧修复WebUI 405 Method Not Allowed by @CoolZxp in https://github.com/biliup/biliup/pull/878

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.50...v0.4.51

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.51)

#### v0.4.50 - 2024-04-16

What's Changed

- 🔧修复排序错误 by @xxxxuanran in https://github.com/biliup/biliup/pull/865

- 🔧修复Youtube在下载完成前的意外错误 by @CoolZxp in https://github.com/biliup/biliup/pull/869

* 适配FlexTv by @CoolZxp in https://github.com/biliup/biliup/pull/870

* 避免虎牙在选取码率时发生错误后依旧继续执行 by @CoolZxp in https://github.com/biliup/biliup/pull/871

* 适配 Twitcasting.TV by @xxxxuanran in https://github.com/biliup/biliup/pull/874

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.49...v0.4.50

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.50)

#### v0.4.49 - 2024-04-10

What's Changed

- 🔧修复录播管理页卡片重叠问题 by @alpzmj9 in https://github.com/biliup/biliup/pull/851

* 录播管理页面卡片样式优化 by @alpzmj9 in https://github.com/biliup/biliup/pull/861

* 添加捐赠信息 by @viondw in https://github.com/biliup/biliup/pull/863

* 调整功能 by @xxxxuanran in https://github.com/biliup/biliup/pull/860

- 🔧：日志格式以及丢失问题 by @alpzmj9 in https://github.com/biliup/biliup/pull/864

New Contributors

* @viondw made their first contribution in https://github.com/biliup/biliup/pull/863

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.48...v0.4.49

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.49)

#### v0.4.48 - 2024-04-07

What's Changed

* 添加 kuaishou_cookie 格式说明，尝试回避快手风控 by @xxxxuanran in https://github.com/biliup/biliup/pull/855

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.47...v0.4.48

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.48)

### March (2024)

#### v0.4.47 - 2024-03-27

What's Changed

* Incorrect override behavior by @xxxxuanran in https://github.com/biliup/biliup/pull/850

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.46...v0.4.47

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.47)

#### v0.4.46 - 2024-03-25

What's Changed

- 🔧修复Bililive登录校验失败时输出异常的问题 by @Kataick in https://github.com/biliup/biliup/pull/847

* Add more log by @xxxxuanran in https://github.com/biliup/biliup/pull/848

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.45...v0.4.46

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.46)

#### v0.4.45 - 2024-03-22

What's Changed

* [Fix] Style errors and missing Title by @xxxxuanran in https://github.com/biliup/biliup/pull/841

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.44...v0.4.45

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.45)

#### v0.4.44 - 2024-03-17

What's Changed

- 🔧 huya by @xxxxuanran in https://github.com/biliup/biliup/pull/839

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.43...v0.4.44

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.44)

#### v0.4.43 - 2024-03-17

What's Changed

* 一些更新 by @xxxxuanran in https://github.com/biliup/biliup/pull/837

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.42...v0.4.43

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.43)

#### v0.4.42 - 2024-03-11

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.41...v0.4.42

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.42)

#### v0.4.41 - 2024-03-07

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.40...v0.4.41

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.41)

#### v0.4.40 - 2024-03-05

What's Changed

- 🔧: 超出连接池上限无法释放、webui中cookie文件显示错误 by @boxie123 in https://github.com/biliup/biliup/pull/834

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.39...v0.4.40

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.40)

#### v0.4.39 - 2024-03-02

What's Changed

- 🔧修复少量bug by @boxie123 in https://github.com/biliup/biliup/pull/832

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.38...v0.4.39

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.39)

### February (2024)

#### v0.4.38 - 2024-02-29

What's Changed

* WebUI交互优化 by @alpzmj9 in https://github.com/biliup/biliup/pull/826

- 🔧: datetime被过滤、新建空间配置无法保存 by @boxie123 in https://github.com/biliup/biliup/pull/827

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.37...v0.4.38

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.38)

#### v0.4.37 - 2024-02-28

What's Changed

* 紧急修复`URL build`报错 by @boxie123 in https://github.com/biliup/biliup/pull/823

* UI代码组件化，修复部分选项BUG，文字表述优化，新增日志配置项。 by @alpzmj9 in https://github.com/biliup/biliup/pull/822

* Refactoring database using sqlalchemy by @boxie123 in https://github.com/biliup/biliup/pull/818

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.36...v0.4.37

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.37)

#### v0.4.36 - 2024-02-27

What's Changed

- 🔧修复码率类型错误、部分选项默认开启、投稿标签添加限制 by @boxie123 in https://github.com/biliup/biliup/pull/815

* 保证生成的视频文件后缀为小写 by @Kataick in https://github.com/biliup/biliup/pull/813

* 增加找不到 cookies 时文件时未知提示 by @buyfakett in https://github.com/biliup/biliup/pull/816

- 🔧: refined the webui. by @alpzmj9 in https://github.com/biliup/biliup/pull/817

* 添加--no-access-log参数、修改webui启动提示 by @boxie123 in https://github.com/biliup/biliup/pull/821

New Contributors

* @buyfakett made their first contribution in https://github.com/biliup/biliup/pull/816

* @alpzmj9 made their first contribution in https://github.com/biliup/biliup/pull/817

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.35...v0.4.36

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.36)

#### v0.4.35 - 2024-02-21

What's Changed

* 添加 webui 缺失的配置项，修复账号信息显示问题 by @boxie123 in https://github.com/biliup/biliup/pull/792

- 🔧: 上传插件和简介艾特无法取消选择、分段大小单位错误 by @boxie123 in https://github.com/biliup/biliup/pull/796

- 🔧: Twitch录制报错 by @boxie123 in https://github.com/biliup/biliup/pull/800

- 🔧修复webui的某些输入框类型问题 by @Kataick in https://github.com/biliup/biliup/pull/814

**Full Changelog**: https://github.com/biliup/biliup/compare/v0.4.34...v0.4.35

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.35)
### January (2024)

#### v0.4.34 - 2024-01-27

修复B站请求开播状况API352风控的问题

[>在 Github 查看此版本](https://github.com/biliup/biliup/releases/tag/v0.4.34)

## 0.4.32-0.4.33
⚠️⚠️⚠️⚠️⚠️⚠️超大版本更新，在升级到此版本之前请认真阅读说明。
- 🔧自动修正stream_gears设置不支持的format [@Kataick](https://github.com/Kataick)
- 🔧修复分段下载时streamlink不会退出的问题  [@dreammu](https://github.com/dreammu)
- 💡AfreecaTV添加账号密码登陆,直播间标题 [@CoolZxp](https://github.com/CoolZxp)
- 🔧修复快手直播录制,因风控严格暂时移除快手cdn及流类型选择 [@CoolZxp](https://github.com/CoolZxp)
- 🔧优化 BiliLive 部分运行逻辑 （添加登录验证，原画链接复用 使用移动端房间信息，获取正确 emoji 标题）[@xxxxuanran](https://github.com/xxxxuanran)
- 💡数据库存档 （代理原本的config文件，在此版本之后，老版本的config将会在第一次启动被读取并写入新的数据库中，之后将不在使用config文件）[@boxie123](https://github.com/boxie123)
- 🔧修复在py3.7版本运行问题 [@CoolZxp](https://github.com/CoolZxp)
- 💡添加bigo支持 [@CoolZxp](https://github.com/CoolZxp)
- 🔧兼容 stream-gears 在无 Cookie 时的下载 [@xxxxuanran](https://github.com/xxxxuanran)
- 🔧标题为空时下载报错 [@boxie123](https://github.com/boxie123)
- 🔧修复弹幕重新连接时覆盖原有弹幕问题 [@CoolZxp](https://github.com/CoolZxp)
- 🔧修复斗鱼下播后可能会录制回放问题 [@CoolZxp](https://github.com/CoolZxp)
- 🔧修复使用biliup-rs上传后内存不会清空的问题[@CoolZxp](https://github.com/CoolZxp)
- 🔧猫耳FM提供格式默认值[@xxxxuanran](https://github.com/xxxxuanran)
- 💡新增WEBUI支持，可在WEBUI进行所有的设置与管理。 [@boxie123](https://github.com/boxie123)

## 0.4.31
- 更新时间：2023.09.12
- 🔧修复抖音弹幕问题[@CoolZxp](https://github.com/CoolZxp)

## 0.4.30 ⚠️⚠️有重大问题，请勿使用该版本。
- 更新时间：2023.09.12
- 🔧youtube配置说明修改[@CoolZxp](https://github.com/CoolZxp)
- 🔧避免Windows可能的弹幕录制任务关闭失败[@CoolZxp](https://github.com/CoolZxp)
- 🔧为部分检测添加超时时间避免检测时间过长[@CoolZxp](https://github.com/CoolZxp)
- 🔧调整弹幕录制日志[@CoolZxp](https://github.com/CoolZxp)
- 🔧斗鱼录制及弹幕对URL支持同步[@CoolZxp](https://github.com/CoolZxp)
- 🔧修复斗鱼弹幕缺失[@CoolZxp](https://github.com/CoolZxp)
- 🔧修复Bilibili弹幕缺失[@CoolZxp](https://github.com/CoolZxp)
- 🔧抖音录制及弹幕对URL支持同步[@CoolZxp](https://github.com/CoolZxp)
- 🔧抖音弹幕也会使用配置内的Cookie[@CoolZxp](https://github.com/CoolZxp)
- 🔧适配新版抖音录制及弹幕[@CoolZxp](https://github.com/CoolZxp)
- 🔧优化Bilibili提示报错[@Kataick](https://github.com/Kataick)
- 🔧补全yaml配置文件抖音画质符号[@Kataick](https://github.com/Kataick)
- 💡youtube添加缓存[@CoolZxp](https://github.com/CoolZxp)
- 💡youtube跳过检测after_date日期后的视频及直播[@CoolZxp](https://github.com/CoolZxp)
- ⚠️修改preprocessor(下载直播),downloaded_processor(上传直播)时返回的开播及下播时间为时间戳[@Kataick](https://github.com/Kataick)


## 0.4.29
- 更新时间：2023.08.04
- 🔧youtube配置说明修改[@CoolZxp](https://github.com/CoolZxp)
- 🔧将上传录像时可以开始新的录制调整为默认功能[@CoolZxp](https://github.com/CoolZxp)
- 🔧下载上传逻辑调整[@CoolZxp](https://github.com/CoolZxp)
- 🔧上传后正确的删除弹幕[@CoolZxp](https://github.com/CoolZxp)
- 🔧downloaded_processor的时间被正确格式化以及明确时间默认值[@Kataick](https://github.com/Kataick)
- 🔧downloaded_processor的参数被正确格式化[@Kataick](https://github.com/Kataick)
- 🔧bili_web强制选择UpOS模式下的线路[@1toldyou](https://github.com/1toldyou)
- 🔧正确的检测进程空闲状态[@CoolZxp](https://github.com/CoolZxp)
- 🔧正确的重启进程[@CoolZxp](https://github.com/CoolZxp)
- 💡youtube添加单独下载直播和回放选项[@CoolZxp](https://github.com/CoolZxp)
- 💡youtube添加streams playlists shorts类型链接支持[@CoolZxp](https://github.com/CoolZxp)
- 💡youtube添加筛选无效时提示[@CoolZxp](https://github.com/CoolZxp)
- 💡youtube不会在运行目录产生多余文件了[@CoolZxp](https://github.com/CoolZxp)
- 💡封面下载支持webp[@CoolZxp](https://github.com/CoolZxp)
- 💡启动时删除临时缓存文件[@CoolZxp](https://github.com/CoolZxp)

## 0.4.28
- 更新时间：2023.07.30
- 🔧在读取youtube缓存失败时增加提示[@CoolZxp](https://github.com/CoolZxp)
- 🔧调整twitch日志输出[@CoolZxp](https://github.com/CoolZxp)
- 🔧调整twitch youtube封面下载逻辑[@CoolZxp](https://github.com/CoolZxp)
- 🔧修复youtube视频录制异常中断时多余文件不删除[@CoolZxp](https://github.com/CoolZxp)
- 🔧兼容低版本python[@CoolZxp](https://github.com/CoolZxp)
- 🔧斗鱼请求优化[@CoolZxp](https://github.com/CoolZxp)
- 🔧斗鱼适配移动端url[@CoolZxp](https://github.com/CoolZxp)
- 🔧斗鱼避免下播时可能的异常[@CoolZxp](https://github.com/CoolZxp)
- 🔧避免上传时由于操作文件权限不足导致后处理失败[@CoolZxp](https://github.com/CoolZxp)
- 🔧补充downloaded_processor toml配置[@Kataick](https://github.com/Kataick)
- 🔧删除多余日志输出[@Kataick](https://github.com/Kataick)
- 🔧让检测后能更快的开始下载[@CoolZxp](https://github.com/CoolZxp)
- 🔧修复快手录制问题[@CoolZxp](https://github.com/CoolZxp)
- 💡上传后封面自动删除[@CoolZxp](https://github.com/CoolZxp)
- 💡downloaded_processor增加返回参数(下播时间和视频列表)[@Kataick](https://github.com/Kataick)
- 💡stream-gears升级至0.1.19


## 0.4.27
- 更新时间：2023.07.29
- 🔧修复虎牙拉流403分段问题[@CoolZxp](https://github.com/CoolZxp)
- 🔧统一download.py的输出格式[@Kataick](https://github.com/Kataick)
- 🔧修复抖音弹幕分段与录制stop的问题[@CoolZxp](https://github.com/CoolZxp)
- 🔧调整直播流获取失败及下播延迟检测功能[@CoolZxp](https://github.com/CoolZxp)
- 🔧优化下载流程与下载日志逻辑以及下播检测延迟阈值[@CoolZxp](https://github.com/CoolZxp)
- 🔧虎牙画质修复[@CoolZxp](https://github.com/CoolZxp)
- 🔧调整封面下载逻辑[@CoolZxp](https://github.com/CoolZxp)
- 🔧调整批量检测功能[@CoolZxp](https://github.com/CoolZxp)
- 🔧优化youtube与twitch下载策略[@CoolZxp](https://github.com/CoolZxp)
- 💡添加斗鱼,虎牙,哔哩哔哩,抖音自选画质[@CoolZxp](https://github.com/CoolZxp)

## 0.4.26
- 更新时间：2023.07.27
- 🔧修复虎牙直播流下载的问题。 [@xxxxuanran](https://github.com/xxxxuanran)

## 0.4.25
- 更新时间：2023.07.27
- 💡新增NOW直播[@Kataick](https://github.com/Kataick)
- 💡新增映客直播[@Kataick](https://github.com/Kataick)
- 💡增加downloaded_processor功能，支持结束录制时执行指定Shell指令[@Kataick](https://github.com/Kataick)

## 0.4.24
- 🔧修复哔哩哔哩flv流403的问题。 [@xxxxuanran](https://github.com/xxxxuanran)
  
## 0.4.23
- 更新时间：2023.07.17
- 🔧preprocessor增加开播时返回主播名字和开播地址 [@Kataick](https://github.com/Kataick)
- 🔧修复当获取流失败后会触发获取流频繁的问题 [@Kataick](https://github.com/Kataick)
- 🔧优化设置大delay会出现漏录的问题 [@Kataick](https://github.com/Kataick)
- 🔧优化在config中读取值的代码写法 [@Kataick](https://github.com/Kataick)
- 🔧增加对yt-dlp的lazy_playlist功能支持 [@Kataick](https://github.com/Kataick)
- 🔧修复format为mp4时无法时间分段的问题 [@Kataick](https://github.com/Kataick)
- 🔧修复bilibili导致进程卡死问题(get_play_info) [@Kataick](https://github.com/Kataick)
- 🔧修复afreecaTV导致进程卡死问题 [@Kataick](https://github.com/Kataick)
- 🔧修复快手导致进程卡死问题 [@Kataick](https://github.com/Kataick)
- 🔧去除 quickjs 依赖。相对应的修改了 Readme 和 Douyu [@xxxxuanran](https://github.com/xxxxuanran)
- 🔧Bililive 兼容 `APEX分区。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧Kuaishou 新增 协议切换 和 CDN 优选。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧修正快手 HLS 流原画 [@xxxxuanran](https://github.com/xxxxuanran) 
- 🔧修复biliup-rs的参数绑定[@hguandl](https://github.com/hguandl)
- 💡增加由于地区限制导致无法下载指定区域直播间的提示。[@xxxxuanran](https://github.com/xxxxuanran)
- 💡增加对biliup-rs的支持(杜比音效、Hi-Res、转载、充电) [@Kataick](https://github.com/Kataick)
- 💡bili_web上传插件新增简介@功能 [@zzc10086](https://github.com/zzc10086)
- 💡增加抖音弹幕录制支持 [@KNaiFen](https://github.com/KNaiFen)

## 0.4.22
- 更新时间：2023.06.29
- 🔧优化虎牙错误提示和抖音代码与错误提示。[@Kataick](https://github.com/Kataick)
- 🔧优化获取直播流失败时增加等待重试。[@Kataick](https://github.com/Kataick)
- 🔧修复ffmpeg时长分段时弹幕文件不会跟着分段的问题、修复防止重复请求流的功能工作异常的问题。[@KNaiFen](https://github.com/KNaiFen)
- 🔧修正CHANGELOG更新日志、修正README.MD。[@KNaiFen](https://github.com/KNaiFen)
- 🔧弹幕报错记录增加文件名部分，方便排查BUG。[@KNaiFen](https://github.com/KNaiFen)
- 🔧yaml、toml配置文件注释修正，格式修正。[@KNaiFen](https://github.com/KNaiFen)
- 💡「BETA」增加未上传完录像时同一主播重新开播是否立刻开始录制功能。[@Kataick](https://github.com/Kataick)
- 💡「BETA」增加cn01的fmp4流获取真原画流功能。[@haha114514](https://github.com/haha114514)

## 0.4.21
- 更新时间：2023.06.11
- 🔧抖音增加获取错误时的提示并优化纯数字房间号的代码。[@Kataick](https://github.com/Kataick)
- 🔧修复虎牙与抖音关闭连接导致进程终止问题。[@Kataick](https://github.com/Kataick)
- 🔧同步yaml配置文件的更新到toml中。[@Kataick](https://github.com/Kataick)
- 🔧NICO标题获取从BS4改为正则，开播后仍然重复请求的BUG的修复。[@KNaiFen](https://github.com/KNaiFen)
- 🔧添加quickjs依赖。[@haha114514](https://github.com/haha114514)
- 💡新增NICO录播。[@KNaiFen](https://github.com/KNaiFen)
- 💡增加NICO用户配置文件模板。[@KNaiFen](https://github.com/KNaiFen)
- 💡增加Twitch的去广告开关（解决广告分段问题）[@KNaiFen](https://github.com/KNaiFen)
- 💡增加Twitch弹幕录播、修复斗鱼、虎牙的弹幕录制BUG并增加报错提示，修改了XML文件的删除部分，修改了部分代码的协程的调用，优化断流时频繁重复请求。[@KNaiFen](https://github.com/KNaiFen)

## 0.4.20
- 更新时间：2023.05.25
- 🔧修复抖音可能导致进程卡死问题。[@KkakaMann](https://github.com/KkakaMann)
- 🔧改正部分下载器的日志等级，避免刷屏。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧尝试修复斗鱼下载失败的问题，同时禁用主线路。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧修正快手日志提示，尝试规避风控。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧修正Windows下自动过滤删除文件由于占用权限问题，导致整体卡住的问题。[@haha114514](https://github.com/haha114514)

## 0.4.19
- 更新时间：2023.05.11
- 🔧修复新版本urllib3.connectionpool下xrange报错的问题。[@zclkkk](https://github.com/zclkkk)
- 🔧修复新版本urllib3 2下method_whitelist报错的问题。[@Weidows](https://github.com/Weidows)

## 0.4.18
- 更新时间：2023.04.21
- 🔧修复录制B站直播，自动上传标题里面的title为下播前的最后一个标题的bug（正确的应该是开播之后的第一个标题）。[@haha114514](https://github.com/haha114514)
- 🔧streamlink下载稳定与内存占用优化。[@haha114514](https://github.com/haha114514)
- 🔧修复多余弹幕文件自动过滤失效的问题。[@haha114514](https://github.com/haha114514)
- 🔧增加B站fmp4流的等待时间，因为有些主播开播到推流时间较慢。[@zclkkk](https://github.com/zclkkk)
- 💡B站直播优选CDN支持同时添加多个节点。[@haha114514](https://github.com/haha114514)
- 💡新增B站自定义fmp4流获取不到时，重新获取一遍flv直播流的API。[@haha114514](https://github.com/haha114514)
- 💡新增对快手平台的支持。[@xxxxuanran](https://github.com/xxxxuanran)

## 0.4.17
- 更新时间：2023.03.24
- 🔧修复不填B站自定义API就无法开始录制的问题。[@xxxxuanran](https://github.com/xxxxuanran)

## 0.4.16 ⚠️⚠️有重大问题，请勿使用该版本。
- 更新时间：2023.03.23
- 🔧修复B站自定义API不生效的问题。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧修复部分config示例的错误。[@haha114514](https://github.com/haha114514)

## 0.4.15
- 更新时间：2023.03.21
- 🔧修复上一版本关于b站下载部分的优化相关的问题。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧优化YouTube下载相关参数。[@haha114514](https://github.com/haha114514)

## 0.4.14
- 更新时间：2023.03.19
- 🔧回滚@xxxxuanran关于b站下载部分的优化。[@haha114514](https://github.com/haha114514)

## 0.4.13 ⚠️⚠️有重大问题，请勿使用该版本。
- 更新时间：2023.03.19
- 🔧优化部分下载逻辑，并将封面下载功能移动到download.py中，方便以后适配更多平台的直播间封面下载。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧修复配置文件错误。[@xxxxuanran](https://github.com/xxxxuanran)
- 🔧优化streamlink下载参数。[@haha114514](https://github.com/haha114514)
- 💡新增跳过斗鱼scdn，并增加了斗鱼与虎牙最新的CDN的支持。[@xxxxuanran](https://github.com/xxxxuanran)
- 💡新增指定YouTube视频下载时间范围区间的功能。[@haha114514](https://github.com/haha114514)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。

## 0.4.12
- 更新时间：2023.03.17
- 🔧修复优选CDN与直播流不生效的问题。[@haha114514](https://github.com/haha114514)
- 🔧优化streamlink下载参数。[@haha114514](https://github.com/haha114514)
- 🔧完善依赖列表,将最低的yt-dlp版本要求升级到2023.3.3，解决2022年版本已无法解析YouTube视频的问题。并且将streamlink最低要求版本升级到5.3.0，提升hls流录制稳定性。[@haha114514](https://github.com/haha114514)

## 0.4.11
- 更新时间：2023.03.07
- 🔧修复上一版本的封面上传问题。[@haha114514](https://github.com/haha114514)

## 0.4.10 ⚠️⚠️有重大问题，请勿使用该版本。
- 更新时间：2023.03.07
- 🔧修复上一版本的封面上传问题。[@haha114514](https://github.com/haha114514)
- 🔧优化上传过滤文件规则。[@haha114514](https://github.com/haha114514)
- 💡修改判断逻辑，支持cn-gotcha01 flv流的自选域名。[@haha114514](https://github.com/haha114514)
- 💡增加YouTube转载视频自动获取视频封面并用作投稿封面的功能。[@haha114514](https://github.com/haha114514)

## 0.4.9 ⚠️⚠️有重大问题，请勿使用该版本。
- 更新时间：2023.03.06
- 🔧biliup-rs上传器自动过滤xml文件，避免上传xml弹幕文件导致整个投稿转码失败的问题。[@haha114514](https://github.com/haha114514)
- 🔧修复自动获取封面不生效的问题[@haha114514](https://github.com/haha114514)

## 0.4.8
- 更新时间：2023.03.04
- 🔧在最后处理文件的时候，自动删除多余的xml弹幕文件，只保留有同样文件名视频的弹幕xml文件[@haha114514](https://github.com/haha114514)
- 🔧优化ffmpeg录制hls流的参数[@haha114514](https://github.com/haha114514)
- 💡新增streamlink+ffmpeg混合下载器选项[@haha114514](https://github.com/haha114514)
- 💡新增B站直播hls_fmp4流的获取（目前只有streamlink+ffmpeg混合模式才能稳定下载）[@haha114514](https://github.com/haha114514)
- ⚠️上两条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。

## 0.4.7 
- 更新时间：2023.02.28
- 🔧修复0.4.5的BUG并添加缺失的依赖[@haha114514](https://github.com/haha114514)

## 0.4.5 ⚠️⚠️有重大问题，请勿使用该版本。
- 更新时间：2023.02.28
- 💡新增斗鱼，虎牙，B站的弹幕录制功能，默认关闭，需要在config文件中开启，只支持FFMPEG（目前）[@KNaiFen](https://github.com/KNaiFen) （感谢：[THMonster/danmaku](https://github.com/THMonster/danmaku) ）
- 🔧修复了BILIBILI录制中OV05节点的BUG[@haha114514](https://github.com/haha114514)
- ⚠️由于为Config新增了弹幕录制的设置，如需使用相关功能请参考最新的config示例添加缺失的部分。
- 🔧优化代码[@ForgQi](https://github.com/ForgQi)

## 0.4.4 ⚠️⚠️本次修改了config内部分参数的名称，请需要使用的用户参考最新的config示例修改
-  更新时间：2023.02.20
- 💡统一了Config中关键词替换的关键词。 [@haha114514](https://github.com/haha114514)
- ⚠️⚠️请注意修改file_name与title和Description中关键词替换的部分。目前全部统一为streamer，title和url了。
- 💡新增cn-gotcha01和ov-gotcha05自选ip/节点的设置。 [@haha114514](https://github.com/haha114514)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。
- 🔧修复上一版本由于新增的哔哩哔哩直播自定义下载CDN导致报错的问题。 [@haha114514](https://github.com/haha114514)
- 🔧修复过多请求开播API导致IP被限制访问的问题。[@ForgQi](https://github.com/ForgQi)

## 0.4.3
-  更新时间：2023.02.15
- 💡为YouTube视频下载增加指定音视频编码的设置。 [@haha114514](https://github.com/haha114514)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。
- 🔧修复上一版本由于新增的哔哩哔哩直播自定义下载CDN导致报错的问题。 [@haha114514](https://github.com/haha114514)

## 0.4.2 ⚠️⚠️此版本存在重大BUG，导致很多情况下无法录制B站直播，请勿使用。
-  更新时间：2023.02.15
- 💡为YouTube视频下载增加指定封装格式，最大纵向分辨率，最大单视频大小的设置。 [@haha114514](https://github.com/haha114514)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。
- 🔧修复上一版本由于新增的哔哩哔哩登录Cookie导致报错的问题。 [@haha114514](https://github.com/haha114514)
- 🔧修复Twitch的Clips无法下载的问题。 [@haha114514](https://github.com/haha114514)
- 🔧为上一版本的B站Fallback机制启用开关。[@haha114514](https://github.com/haha114514)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。

## 0.4.1
-  更新时间：2023.02.13
- 💡增加Preprocessor功能，支持开始录制时执行指定Shell指令 [@haha114514](https://github.com/haha114514)
- 💡为上传标题与简介增加streamers变量 [@haha114514](https://github.com/haha114514)
- ⚠️上两条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。
- 🔧修复访问acfun过于频繁导致ip被拉黑之后报错卡住的问题 [@haha114514](https://github.com/haha114514)
- 🔧修复嵌入示例中延后发布时间的错误 [@stevenlele](https://github.com/setvenlele)
- 🔧修复twitch_cookie配置不生效问题 [@v2wy](https://github.com/v2wy)
- 🔧尝试为B站直播录制启用Fallback机制，当指定CDN反复无法下载之后，自动尝试另外的CDN [@xxxxuanran](https://github.com/xxxxuanran)
- 🔧增加Cookie登录B站功能，可用于下载付费直播与大航海专属直播 [@xxxxuanran](https://github.com/xxxxuanran)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。

## 0.4.0
-  更新时间：2023.02.10
- ⚠️修改cookie在配置文件中的位置 [@haha114514](https://github.com/haha114514)
- 🔧修复斗鱼直播间被关闭一直报错的问题 [@v2wy](https://github.com/v2wy)
- 🔧修改probe_version参数，增加两个常用的网页上传地址 [@FairyWorld](https://github.com/FairyWorld)

## 0.3.12
-  更新时间：2023.02.05
- 🔧为readme文档添加关于主要支持录制的直播平台的介绍以及删掉关于上传CDN描述中已经失效的节点 [@haha114514](https://github.com/haha114514)
- 🔧修复ffmpeg录制参数缺失.part后缀，导致录制出来的文件都没有.part后缀的问题 [@haha114514](https://github.com/haha114514)
- 🔧修复了ffmpeg录制情况下，按大小分段录制时，分段之后上一段的.part后缀不会被去掉的问题 [@haha114514](https://github.com/haha114514)
- 🔧完善config示例，增加postprocessor可参考用法的描述 [@haha114514](https://github.com/haha114514)
- ⚠️上一条由于为Config新增了一些设置，如需使用相关功能请参考最新的config示例添加缺失的部分。

## 0.3.11
-  更新时间：2023.02.02
- 🔧修复config.yaml示例中filename_prefix配置格式 [@FairyWorld](https://github.com/FairyWorld)
- 🔧添加config.toml示例中缺失的关于downloader的设置 [@haha114514](https://github.com/haha114514)
- 🔧修改postprocessor，避免出现指令有问题导致反复从头开始执行任务的问题 [@haha114514](https://github.com/haha114514)
- 🔧去掉自动替换文件名中空格为_字符的功能，避免和录播完毕自动改名冲突 [@haha114514](https://github.com/haha114514)
- 🔧修复由于上一版的修改导致stream-gears录制文件名重复出现分段覆盖的问题[@haha114514](https://github.com/haha114514)

## 0.3.10 ⚠️⚠️此版本存在stream-gears录制文件名重复导致覆盖上一段分段的问题，请勿使用
-  更新时间：2023.02.01
- 💡添加全局与单个主播自定义录播文件命名设置 [@haha114514](https://github.com/haha114514)
- ⚠️新增与主播自定义录播文件命名设置的两个参数，如需使用此功能，请老版本用户参考config的示例添加。[@haha114514](https://github.com/haha114514)
- 💡启用了文件名过滤特殊字符的功能，避免文件名中出现特殊字符，导致ffmpeg无法录制的问题。[@haha114514](https://github.com/haha114514)

## 0.3.9 
-  更新时间：2023.01.31
- 💡添加一个虎牙的CDN线路 [@ForgQi](https://github.com/ForgQi)
- 🔧虎牙无法正确获取房间标题的问题 [@luckycat0426](https://github.com/luckycat0426)
- 💡哔哩哔哩直播流协议.可选 stream（Flv）、hls [@xxxxuanran](https://github.com/xxxxuanran)
- 💡哔哩哔哩直播优选CDN [@xxxxuanran](https://github.com/xxxxuanran)
- 💡哔哩哔哩直播强制原画（仅限HLS流的 cn-gotcha01 CDN） [@xxxxuanran](https://github.com/xxxxuanran)
- 💡自定义哔哩哔哩直播API [@xxxxuanran](https://github.com/xxxxuanran)
- 💡Twitch自定义用户Cookie，作用是可以不让广告嵌入到视频流中 [@KNaiFen](https://github.com/KNaiFen)
