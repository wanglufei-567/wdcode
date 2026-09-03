import type { ComponentType, ReactNode } from 'react'

export interface SiteNavigationItem {
  label: string
  path: string
  order: number
  end?: boolean
}

export interface SiteChrome {
  Header: ComponentType
  Footer: ComponentType
}

export interface SiteRoute {
  path: string
  element: ReactNode
}

export interface SiteModule {
  id: string
  navigation?: SiteNavigationItem
  routes: readonly SiteRoute[]
}

export type SiteModuleFactory = (chrome: SiteChrome) => SiteModule

/**
 * @description 在模块公开入口保留完整类型推断，并明确该对象遵守站点装配契约
 * @param siteModule 业务模块公开的导航与路由声明
 * @returns 不改变引用和值的站点模块声明
 */
export function defineSiteModule(siteModule: SiteModule): SiteModule {
  return siteModule
}
