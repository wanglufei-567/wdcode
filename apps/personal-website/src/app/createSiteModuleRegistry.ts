import type {
  SiteModule,
  SiteNavigationItem,
  SiteRoute,
} from '@wdcode/site-module-contract'

export interface SiteModuleRegistry {
  navigation: readonly SiteNavigationItem[]
  routes: readonly RegisteredSiteRoute[]
}

export interface RegisteredSiteRoute extends SiteRoute {
  moduleId: string
}

function assertUniqueValues(values: readonly string[], label: string): void {
  const seen = new Set<string>()

  for (const value of values) {
    if (seen.has(value)) {
      throw new Error(`${label} 重复：${value}`)
    }

    seen.add(value)
  }
}

/**
 * @description 校验并汇总站点核心导航与业务模块声明，阻止冲突配置进入 Router
 * @param modules 构建时显式注册的根级业务模块
 * @param coreNavigation 主应用自身拥有的首页等导航入口
 * @returns 已按顺序整理的导航和可直接交给 React Router 的模块路由
 */
export function createSiteModuleRegistry(
  modules: readonly SiteModule[],
  coreNavigation: readonly SiteNavigationItem[],
): SiteModuleRegistry {
  assertUniqueValues(modules.map((siteModule) => siteModule.id), '模块 id')

  const navigation = [
    ...coreNavigation,
    ...modules.flatMap((siteModule) => siteModule.navigation ?? []),
  ].sort((left, right) => left.order - right.order)
  const routes = modules.flatMap((siteModule) => siteModule.routes.map((route) => ({
    ...route,
    moduleId: siteModule.id,
  })))
  const routePaths = routes.map((route) => route.path)

  assertUniqueValues(navigation.map((item) => item.path), '导航路径')
  assertUniqueValues(routePaths, '模块路由')

  return { navigation, routes }
}
