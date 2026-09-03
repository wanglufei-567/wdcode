import type { ComponentType } from 'react'

export interface WorkDefinition {
  id: string
  name: string
  summary: string
  introduction: string
  technologies: readonly string[]
  repositoryUrl: string
  demoUrl?: string
  IndexFeature: ComponentType<{ work: WorkDefinition }>
  CasePage: ComponentType<{ work: WorkDefinition }>
}

export interface WorkRegistry {
  works: readonly WorkDefinition[]
  findById: (workId: string) => WorkDefinition | undefined
}

/**
 * @description 校验并建立作品模块内部注册表，阻止重复案例占用同一路由标识
 * @param works 由作品适配器提供的展示摘要
 * @returns 保持声明顺序并支持按 id 查询的只读注册表
 */
export function createWorkRegistry(works: readonly WorkDefinition[]): WorkRegistry {
  const workById = new Map<string, WorkDefinition>()

  for (const work of works) {
    if (workById.has(work.id)) {
      throw new Error(`作品 id 重复：${work.id}`)
    }

    workById.set(work.id, work)
  }

  return {
    works,
    findById: (workId) => workById.get(workId),
  }
}
