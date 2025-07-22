'use client'

// 从你的版本中保留的 imports，用于主题同步和 React hooks
import { useState, useEffect, useRef, useCallback } from 'react'
// 从上游 PR 版本中保留的 imports，用于布局和认证
import { Layout } from '@douyinfe/semi-ui'
import { AuthGuard } from './lib/auth-guard'
import ProtectedLayout from './lib/protected-layout'

// 辅助函数，用于确定最终生效的主题
const getEffectiveTheme = (themeMode: string | null): 'light' | 'dark' => {
  if (themeMode === 'dark') return 'dark'
  if (themeMode === 'light') return 'light'
  // 对于 'auto' 或 null/undefined，根据系统偏好来决定
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light' // 兜底，例如在SSR或matchMedia不可用时
}

// 将 HomeContainer 组件逻辑直接放入 Home 组件中
const Home: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [appTheme, setAppTheme] = useState<string | null>(() => {
    // 如果在客户端，尝试从 document.body 初始化
    if (typeof document !== 'undefined') {
      return document.body.getAttribute('theme-mode')
    }
    return null
  })

  const applyThemeToIframe = useCallback((themeToApply: 'light' | 'dark') => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      console.log('[父页面] 尝试向 iframe 应用主题。生效主题:', themeToApply)
      const iframeContentWindow = iframeRef.current.contentWindow as any
      if (typeof iframeContentWindow.setChangelogTheme === 'function') {
        iframeContentWindow.setChangelogTheme(themeToApply)
        console.log('[父页面] 已调用 iframe.setChangelogTheme，参数:', themeToApply)
      } else {
        console.warn('[父页面] 未找到 iframe.setChangelogTheme 函数。Iframe 可能未完全加载或脚本执行失败。')
      }
    } else {
      console.warn('[父页面] Iframe ref 或 contentWindow 不可用，无法同步主题。')
    }
  }, [])

  // 当 appTheme 状态改变时，应用主题的 Effect
  useEffect(() => {
    const effectiveTheme = getEffectiveTheme(appTheme)
    console.log(`[父页面] appTheme 状态变为: ${appTheme}, 生效主题: ${effectiveTheme}`)
    applyThemeToIframe(effectiveTheme)
  }, [appTheme, applyThemeToIframe])

  // 用于 MutationObserver 和 iframe 加载事件的 Effect
  useEffect(() => {
    const updateAndTriggerThemeSync = () => {
      const currentThemeOnBody = document.body.getAttribute('theme-mode')
      console.log('[父页面] updateAndTriggerThemeSync - 父页面 body 当前 theme-mode:', currentThemeOnBody)
      setAppTheme(currentThemeOnBody)
    }

    const handleIframeLoad = () => {
      console.log('[父页面] Iframe 已加载。')
      updateAndTriggerThemeSync()
    }

    const currentIframe = iframeRef.current
    if (currentIframe) {
      currentIframe.addEventListener('load', handleIframeLoad)
    }

    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'theme-mode') {
          console.log('[父页面] 检测到父页面 body 的 theme-mode 属性变化。')
          updateAndTriggerThemeSync()
        }
      }
    })

    if (typeof document !== 'undefined') { // 确保在客户端执行
      observer.observe(document.body, { attributes: true })
      updateAndTriggerThemeSync() // 初始同步
    }

    return () => {
      console.log('[父页面] 清理 HomeContainer 的 effects。')
      observer.disconnect()
      if (currentIframe) {
        currentIframe.removeEventListener('load', handleIframeLoad)
      }
    }
  }, []) // 空依赖数组表示此 effect 仅在挂载时运行一次，并在卸载时清理

  // 这里是融合的关键：
  // 使用上游 PR 的 AuthGuard 和 ProtectedLayout 结构
  // 内部是你实现的 iframe 逻辑
  return (
    <AuthGuard>
      <ProtectedLayout>
        <Layout>
          <iframe
            ref={iframeRef}
            style={{ borderWidth: 0, width: '100%', height: '100%' }}
            src="/CHANGELOG.html" // 使用你的本地路径
            title="Changelog"
          ></iframe>
        </Layout>
      </ProtectedLayout>
    </AuthGuard>
  )
}

// 导出组件，注意组件名是 Home，与上游保持一致
export default Home
