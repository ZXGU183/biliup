'use client'
// 其他 import 保持不变
import {
  Layout,
  Nav,
  Button,
  Breadcrumb,
  Skeleton,
  Avatar,
  Tag,
  Modal,
  Form,
  Row,
  Col,
  Dropdown,
  SplitButtonGroup,
  Typography,
  Popconfirm,
  List,
  Descriptions,
  Rating,
  ButtonGroup,
} from '@douyinfe/semi-ui'

import {
  IconBell,
  IconHelpCircle,
  IconBytedanceLogo,
  IconPlusCircle,
  IconHistogram,
  IconLive,
  IconSetting,
  IconStoryStroked,
  IconCheckCircleStroked,
  IconVideoListStroked,
  IconTreeTriangleDown,
  IconSendStroked,
  IconEdit2Stroked,
  IconDeleteStroked,
} from '@douyinfe/semi-icons'
import { useState, useEffect, useRef, useCallback } from 'react'
import useStreamers from './lib/use-streamers' // 假设这些自定义 hook 和组件存在且正确
import TemplateModal from './ui/TemplateModal'
import { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown'
import { LiveStreamerEntity } from './lib/api-streamer'


// 辅助函数，用于确定最终生效的主题
const getEffectiveTheme = (themeMode: string | null): 'light' | 'dark' => {
  if (themeMode === 'dark') return 'dark';
  if (themeMode === 'light') return 'light';
  // 对于 'auto' 或 null/undefined，根据系统偏好来决定
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light'; // 兜底，例如在SSR或matchMedia不可用时
};

const HomeContainer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [appTheme, setAppTheme] = useState<string | null>(() => {
    // 如果在客户端，尝试从 document.body 初始化
    if (typeof document !== 'undefined') {
      return document.body.getAttribute('theme-mode');
    }
    return null;
  });

  const applyThemeToIframe = useCallback((themeToApply: 'light' | 'dark') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      console.log('[父页面] 尝试向 iframe 应用主题。生效主题:', themeToApply);
      const iframeContentWindow = iframeRef.current.contentWindow as any;
      if (typeof iframeContentWindow.setChangelogTheme === 'function') {
        iframeContentWindow.setChangelogTheme(themeToApply);
        console.log('[父页面] 已调用 iframe.setChangelogTheme，参数:', themeToApply);
      } else {
        console.warn('[父页面] 未找到 iframe.setChangelogTheme 函数。Iframe 可能未完全加载或脚本执行失败。');
      }
    } else {
      console.warn('[父页面] Iframe ref 或 contentWindow 不可用，无法同步主题。');
    }
  }, []);

  // 当 appTheme 状态改变时，应用主题的 Effect
  useEffect(() => {
    const effectiveTheme = getEffectiveTheme(appTheme);
    console.log(`[父页面] appTheme 状态变为: ${appTheme}, 生效主题: ${effectiveTheme}`);
    applyThemeToIframe(effectiveTheme);
  }, [appTheme, applyThemeToIframe]);

  // 用于 MutationObserver 和 iframe 加载事件的 Effect
  useEffect(() => {
    const updateAndTriggerThemeSync = () => {
      const currentThemeOnBody = document.body.getAttribute('theme-mode');
      console.log('[父页面] updateAndTriggerThemeSync - 父页面 body 当前 theme-mode:', currentThemeOnBody);
      setAppTheme(currentThemeOnBody);
    };

    const handleIframeLoad = () => {
      console.log('[父页面] Iframe 已加载。');
      updateAndTriggerThemeSync();
    };

    const currentIframe = iframeRef.current;
    if (currentIframe) {
      currentIframe.addEventListener('load', handleIframeLoad);
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'theme-mode') {
          console.log('[父页面] 检测到父页面 body 的 theme-mode 属性变化。');
          updateAndTriggerThemeSync();
        }
      }
    });

    if (typeof document !== 'undefined') { // 确保在客户端执行
        observer.observe(document.body, { attributes: true });
        updateAndTriggerThemeSync(); // 初始同步
    }


    return () => {
      console.log('[父页面] 清理 HomeContainer 的 effects。');
      observer.disconnect();
      if (currentIframe) {
        currentIframe.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []); // 空依赖数组表示此 effect 仅在挂载时运行一次，并在卸载时清理

  return (
    <iframe
      ref={iframeRef}
      style={{ borderWidth: 0, width: '100%', height: '100%' }}
      src="/CHANGELOG.html"
      title="Changelog"
    ></iframe>
  );
};

export default HomeContainer;
