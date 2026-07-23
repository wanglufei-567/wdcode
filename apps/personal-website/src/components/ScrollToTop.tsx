import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * @description 在站内路由切换后恢复页面顶部，避免正文页继承首页滚动位置
 * @returns 不渲染可见节点的路由副作用组件
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])

  return null
}
