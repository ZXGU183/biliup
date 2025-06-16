'use client'
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
import { useState, useEffect, useRef } from 'react' // Added useEffect, useRef
import useStreamers from './lib/use-streamers'
import TemplateModal from './ui/TemplateModal'
import { DropDownMenuItem } from '@douyinfe/semi-ui/lib/es/dropdown'
import { LiveStreamerEntity } from './lib/api-streamer'

const Home: React.FC = () => (
  <iframe
    ref={iframeRef}
    style={{
      borderWidth: 0,
    }}
    height="100%"
    src="/CHANGELOG.html"
  ></iframe>
);

const HomeContainer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // This state helps ensure the effect runs if the iframe loads later than the initial theme check.
  const [appTheme, setAppTheme] = useState<string | null>(null);

  useEffect(() => {
    const getEffectiveTheme = (themeMode: string | null): 'light' | 'dark' => {
      if (themeMode === 'dark') return 'dark';
      if (themeMode === 'light') return 'light';
      // For 'auto' or null/undefined, determine from system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyThemeToIframe = (themeMode: string | null) => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const iframeContentWindow = iframeRef.current.contentWindow as any;
        if (typeof iframeContentWindow.setChangelogTheme === 'function') {
          const effectiveTheme = getEffectiveTheme(themeMode);
          iframeContentWindow.setChangelogTheme(effectiveTheme);
        } else {
          // Function might not be available yet if iframe is still loading its script
          // It will be caught by the iframe's 'load' event or subsequent appTheme changes.
        }
      }
    };

    // Function to initialize and update theme
    const updateIframeTheme = () => {
      const currentThemeOnBody = document.body.getAttribute('theme-mode');
      setAppTheme(currentThemeOnBody); // Update state
      applyThemeToIframe(currentThemeOnBody);
    };

    // Initial theme sync when iframe loads
    const handleIframeLoad = () => {
      updateIframeTheme();
    };

    if (iframeRef.current) {
      iframeRef.current.addEventListener('load', handleIframeLoad);
    }

    // Observe changes to document.body's theme-mode attribute
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'theme-mode') {
          updateIframeTheme();
        }
      }
    });

    observer.observe(document.body, { attributes: true });
    updateIframeTheme(); // Initial sync attempt

    // Cleanup
    return () => {
      observer.disconnect();
      if (iframeRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        iframeRef.current.removeEventListener('load', handleIframeLoad);
      }
    };
  }, []); // Runs once on mount

  // This effect ensures that if appTheme state changes (e.g. from initial null to actual theme),
  // we re-attempt to apply the theme. This helps if the iframe wasn't ready during the first attempt.
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
        const iframeContentWindow = iframeRef.current.contentWindow as any;
        if (typeof iframeContentWindow.setChangelogTheme === 'function') {
            const currentThemeOnBody = document.body.getAttribute('theme-mode');
            const effectiveTheme = (currentThemeOnBody === 'dark' || (currentThemeOnBody !== 'light' && window.matchMedia('(prefers-color-scheme: dark)').matches)) ? 'dark' : 'light';
            iframeContentWindow.setChangelogTheme(effectiveTheme);
        }
    }
  }, [appTheme]); // Re-run when appTheme changes

  return (
    <iframe
      ref={iframeRef}
      style={{ borderWidth: 0 }}
      height="100%"
      src="/CHANGELOG.html"
      title="Changelog"
    ></iframe>
  );
};

export default HomeContainer;
