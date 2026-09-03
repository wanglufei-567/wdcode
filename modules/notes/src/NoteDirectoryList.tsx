import { Link } from 'react-router-dom'

import type { NoteDirectoryEntry } from './api'
import { getNoteDisplayName, toNoteRoute } from './paths'

interface NoteDirectoryListProps {
  entries: readonly NoteDirectoryEntry[]
  sourcePath: string
}

/**
 * @description 展示一个 DebrisRecord 目录中的子目录和 Markdown 文件
 * @param props.entries 经过过滤和排序的目录条目
 * @param props.sourcePath 当前目录相对于内容根的路径
 * @returns 保持原始目录层级的站内导航列表
 */
export function NoteDirectoryList({ entries, sourcePath }: NoteDirectoryListProps) {
  if (entries.length === 0) {
    return <p className="notes-empty">这个目录暂时没有 Markdown 笔记</p>
  }

  return (
    <ul className="note-entry-list">
      {entries.map((entry) => {
        const entryPath = [sourcePath, entry.name].filter(Boolean).join('/')
        const isDirectory = entry.type === 'directory'

        return (
          <li key={entry.name}>
            <Link to={toNoteRoute(entryPath)}>
              <span className="note-entry-list__kind" aria-hidden="true">
                {isDirectory ? 'DIR' : 'MD'}
              </span>
              <span className="note-entry-list__name">
                {isDirectory ? entry.name : getNoteDisplayName(entry.name)}
              </span>
              <span className="note-entry-list__action" aria-hidden="true">
                {isDirectory ? '进入' : '阅读'} →
              </span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
