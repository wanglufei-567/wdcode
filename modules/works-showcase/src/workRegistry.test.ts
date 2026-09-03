import { describe, expect, it } from 'vitest'

import { createWorkRegistry } from './workRegistry'
import { sqlEditorWork } from './works/sql-editor/SqlEditorCasePage'

const CasePage = () => null
const IndexFeature = () => null

function createWork(id: string, name = 'SQLEditor') {
  return {
    id,
    name,
    summary: 'SQL 编辑器',
    introduction: '可嵌入的多方言 SQL 编辑体验',
    technologies: ['React'],
    repositoryUrl: 'https://github.com/wanglufei-567/SQLEditor',
    demoUrl: 'https://wanglufei-567.github.io/SQLEditor/',
    IndexFeature,
    CasePage,
  }
}

describe('createWorkRegistry', () => {
  it('按 id 返回已经注册的作品', () => {
    const work = createWork('sql-editor')
    const registry = createWorkRegistry([work])

    expect(registry.findById('sql-editor')).toBe(work)
    expect(registry.findById('missing')).toBeUndefined()
  })

  it('拒绝重复作品 id', () => {
    expect(() => createWorkRegistry([
      createWork('sql-editor'),
      createWork('sql-editor', 'Another'),
    ])).toThrow('作品 id 重复：sql-editor')
  })

  it('SQLEditor 适配器保留外部仓库和在线演示真值', () => {
    expect(sqlEditorWork).toMatchObject({
      id: 'sql-editor',
      repositoryUrl: 'https://github.com/wanglufei-567/SQLEditor',
      demoUrl: 'https://wanglufei-567.github.io/SQLEditor/',
    })
    expect(sqlEditorWork.technologies).toContain('CodeMirror 6')
  })
})
