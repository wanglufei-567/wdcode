import { useLayoutEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * @description 在站内路由提交绘制前瞬时恢复页面顶部，避免全局平滑滚动让新页面从旧位置滑回顶部
 * @returns 不渲染可见节点的路由副作用组件
 */
export function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const htmlScrollBehavior = document.documentElement.style.scrollBehavior
    const bodyScrollBehavior = document.body.style.scrollBehavior

    // `behavior: auto` 会继续服从样式表中的 smooth，需要短暂覆盖滚动容器的计算来源
    document.documentElement.style.scrollBehavior = 'auto'
    document.body.style.scrollBehavior = 'auto'
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.style.scrollBehavior = htmlScrollBehavior
    document.body.style.scrollBehavior = bodyScrollBehavior
  }, [pathname])

  return null
}
