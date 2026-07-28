import { Link } from 'react-router-dom'

import { SiteFooter } from '../components/SiteFooter'
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
        <p>当前页面或笔记路径不存在，请返回首页或从完整笔记目录重新进入</p>
        <Link to="/notes">返回笔记目录</Link>
      </main>
      <SiteFooter />
    </div>
  )
}
