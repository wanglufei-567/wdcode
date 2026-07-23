import { Link } from 'react-router-dom'

import { getNoteDisplayName, toNoteRoute } from './paths'
import { useNoteDirectory } from './useNoteDirectory'

/**
 * @description 在笔记页面持续提供 DebrisRecord 一级目录入口，不复制完整目录树
 * @returns 支持当前目录探索和快速切换主题的侧栏
 */
export function NotesSidebar() {
  const directory = useNoteDirectory('')

  return (
    <aside className="notes-sidebar" aria-labelledby="notes-sidebar-title">
      <div className="notes-sidebar__heading">
        <p id="notes-sidebar-title">笔记目录</p>
        <Link to="/notes">查看全部</Link>
      </div>

      {directory.status === 'loading' && <p className="notes-sidebar__status">正在读取目录</p>}
      {directory.status === 'error' && <p className="notes-sidebar__status">{directory.message}</p>}

      {directory.status === 'ready' && (
        <nav aria-label="一级笔记目录">
          <ul className="notes-sidebar__list">
            {directory.entries.map((entry) => (
              <li key={entry.name}>
                <Link to={toNoteRoute(entry.name)}>
                  <span>{entry.type === 'directory' ? entry.name : getNoteDisplayName(entry.name)}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  )
}
