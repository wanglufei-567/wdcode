import { createContext, type ReactNode, useContext } from 'react'

import type { SiteNavigationItem } from '@wdcode/site-module-contract'

const SiteNavigationContext = createContext<readonly SiteNavigationItem[] | undefined>(undefined)

interface SiteNavigationProviderProps {
  children: ReactNode
  items: readonly SiteNavigationItem[]
}

/**
 * @description 向站点公共导航提供已经校验和排序的模块入口
 * @param props.items 主应用注册表生成的导航清单
 * @param props.children 需要消费公共导航的页面树
 * @returns 包含导航上下文的页面树
 */
export function SiteNavigationProvider({ children, items }: SiteNavigationProviderProps) {
  return (
    <SiteNavigationContext.Provider value={items}>
      {children}
    </SiteNavigationContext.Provider>
  )
}

/**
 * @description 读取主应用装配后的站点导航，禁止页面维护第二份入口清单
 * @returns 已按展示顺序排列的导航入口
 */
export function useSiteNavigation(): readonly SiteNavigationItem[] {
  const navigation = useContext(SiteNavigationContext)

  if (navigation === undefined) {
    throw new Error('SiteHeader 必须在 SiteNavigationProvider 内使用')
  }

  return navigation
}
