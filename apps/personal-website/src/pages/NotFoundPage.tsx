import { Link } from 'react-router-dom'

import { SiteHeader } from '../components/SiteHeader'

/**
 * @description 为未知路由或缺失文章提供明确恢复入口
 * @returns 简洁的不存在页面
 */
export function NotFoundPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="not-found">
        <p className="not-found__code">404</p>
        <h1>这里没有可阅读的内容</h1>
        <p>文章可能尚未被选入个人站，或者当前链接已经失效</p>
        <Link to="/">返回精选文章</Link>
      </main>
    </div>
  )
}
