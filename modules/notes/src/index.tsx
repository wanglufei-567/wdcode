import {
  defineSiteModule,
  type SiteChrome,
  type SiteModule,
} from '@wdcode/site-module-contract'

import { NotesPage } from './NotesPage'

export { toNoteRoute } from './paths'

/**
 * @description 创建笔记模块公开声明，由主应用注入公共页头和页脚后完成构建时注册
 * @param chrome 主应用拥有的全站公共展示组件
 * @returns `/notes/*` 导航和路由声明
 */
export function createNotesModule(chrome: SiteChrome): SiteModule {
  return defineSiteModule({
    id: 'notes',
    navigation: {
      label: '笔记',
      path: '/notes',
      order: 20,
    },
    routes: [{
      path: '/notes/*',
      element: <NotesPage {...chrome} />,
    }],
  })
}
