import {
  defineSiteModule,
  type SiteChrome,
  type SiteModule,
} from '@wdcode/site-module-contract'

import { WorksRoutes } from './WorksRoutes'

/**
 * @description 创建工程实践展示模块公开声明，由主应用注入公共页头和页脚后完成构建时注册
 * @param chrome 主应用拥有的全站公共展示组件
 * @returns `/works/*` 导航和路由声明
 */
export function createWorksShowcaseModule(chrome: SiteChrome): SiteModule {
  return defineSiteModule({
    id: 'works-showcase',
    navigation: {
      label: '实践',
      path: '/works',
      order: 30,
    },
    routes: [{
      path: '/works/*',
      element: <WorksRoutes {...chrome} />,
    }],
  })
}
