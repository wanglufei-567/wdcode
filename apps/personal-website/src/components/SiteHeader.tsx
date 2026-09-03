import { Link, NavLink } from 'react-router-dom'

import { useSiteNavigation } from '../app/SiteNavigationContext'

/**
 * @description 个人站全局身份栏，只提供返回首页的站点标识和内容定位
 * @returns 页面顶部语义化导航
 */
export function SiteHeader() {
  const navigation = useSiteNavigation()

  return (
    <header className="site-header">
      <Link className="site-brand" to="/" aria-label="返回编程实践笔记首页">
        <span className="site-brand__name">编程实践笔记</span>
        <span className="site-brand__alias" aria-hidden="true">WD CODE</span>
      </Link>
      <nav className="site-nav" aria-label="站点导航">
        {navigation.map((item) => (
          <NavLink key={item.path} to={item.path} end={item.end}>
            <span className="site-nav__active-marker" aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
