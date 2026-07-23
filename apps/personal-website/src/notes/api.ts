import { toNoteContentUrl, toNoteDirectoryUrl } from './paths'

export type NoteEntryType = 'directory' | 'file' | 'other'

export interface NoteDirectoryEntry {
  name: string
  type: NoteEntryType
  mtime?: string
  size?: number
}

/**
 * @description 从 Nginx JSON Autoindex 读取一个 DebrisRecord 目录，并过滤隐藏项与非 Markdown 文件
 * @param sourcePath 相对于 DebrisRecord 根目录的目录路径
 * @param signal 用于路由切换时取消过期请求
 * @returns 目录优先、名称稳定排序的目录条目
 */
export async function fetchNoteDirectory(
  sourcePath: string,
  signal?: AbortSignal,
): Promise<readonly NoteDirectoryEntry[]> {
  const response = await fetch(toNoteDirectoryUrl(sourcePath), { signal })

  if (!response.ok) {
    throw new Error(response.status === 404 ? '笔记目录不存在' : '笔记目录暂时无法读取')
  }

  const entries = (await response.json()) as NoteDirectoryEntry[]

  return entries
    .filter((entry) => !entry.name.startsWith('.'))
    .filter((entry) => entry.type === 'directory' || /\.md$/i.test(entry.name))
    .sort((left, right) => {
      if (left.type !== right.type) {
        return left.type === 'directory' ? -1 : 1
      }

      return left.name.localeCompare(right.name, 'zh-CN', {
        numeric: true,
        sensitivity: 'base',
      })
    })
}

/**
 * @description 按需读取一篇 DebrisRecord 原始 Markdown，不缓存内容副本
 * @param sourcePath 相对于 DebrisRecord 根目录的 Markdown 路径
 * @param signal 用于路由切换时取消过期请求
 * @returns 可交给 ReactMarkdown 的原始文本
 */
export async function fetchNoteMarkdown(sourcePath: string, signal?: AbortSignal): Promise<string> {
  const response = await fetch(toNoteContentUrl(sourcePath), {
    signal,
    cache: 'no-cache',
  })

  if (!response.ok) {
    throw new Error(response.status === 404 ? '笔记不存在' : '笔记暂时无法读取')
  }

  return response.text()
}
