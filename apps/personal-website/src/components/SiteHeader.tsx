import { Link } from 'react-router-dom'

/**
 * @description 个人站全局身份栏，只提供返回首页的站点标识和内容定位
 * @returns 页面顶部语义化导航
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-brand" to="/" aria-label="返回 WD Code 首页">
        WD CODE
      </Link>
      <span className="site-purpose">
        <span className="site-purpose__dot" aria-hidden="true" />
        个人编程笔记
      </span>
    </header>
  )
}
