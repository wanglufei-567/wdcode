import { describe, expect, it } from 'vitest'

import { createSiteModuleRegistry } from './createSiteModuleRegistry'

const homeNavigation = [{ label: '首页', path: '/', order: 10, end: true }]

describe('createSiteModuleRegistry', () => {
  it('按导航顺序汇总核心入口和业务模块', () => {
    const registry = createSiteModuleRegistry([
      {
        id: 'notes',
        navigation: { label: '笔记', path: '/notes', order: 20 },
        routes: [{ path: '/notes/*', element: null }],
      },
    ], homeNavigation)

    expect(registry.navigation.map((item) => item.path)).toEqual(['/', '/notes'])
    expect(registry.routes.map((route) => route.path)).toEqual(['/notes/*'])
    expect(registry.routes[0]?.moduleId).toBe('notes')
  })

  it('拒绝重复模块 id', () => {
    expect(() => createSiteModuleRegistry([
      { id: 'notes', routes: [{ path: '/notes/*', element: null }] },
      { id: 'notes', routes: [{ path: '/archive/*', element: null }] },
    ], homeNavigation)).toThrow('模块 id 重复：notes')
  })

  it('拒绝重复导航路径', () => {
    expect(() => createSiteModuleRegistry([
      {
        id: 'notes',
        navigation: { label: '笔记', path: '/', order: 20 },
        routes: [{ path: '/notes/*', element: null }],
      },
    ], homeNavigation)).toThrow('导航路径 重复：/')
  })

  it('拒绝重复模块路由', () => {
    expect(() => createSiteModuleRegistry([
      { id: 'notes', routes: [{ path: '/notes/*', element: null }] },
      { id: 'archive', routes: [{ path: '/notes/*', element: null }] },
    ], homeNavigation)).toThrow('模块路由 重复：/notes/*')
  })
})
