import { Link } from 'react-router-dom'

import { getNoteDisplayName, toNoteRoute } from './paths'

interface NoteBreadcrumbsProps {
  sourcePath: string
}

/**
 * @description 按 DebrisRecord 相对路径生成可返回任意上级目录的笔记面包屑
 * @param props.sourcePath 当前目录或文章相对于内容根的路径
 * @returns 笔记根目录到当前位置的语义化导航
 */
export function NoteBreadcrumbs({ sourcePath }: NoteBreadcrumbsProps) {
  const segments = sourcePath.split('/').filter(Boolean)

  return (
    <nav className="note-breadcrumbs" aria-label="笔记路径">
      <Link to="/notes">全部笔记</Link>
      {segments.map((segment, index) => {
        const segmentPath = segments.slice(0, index + 1).join('/')
        const isCurrent = index === segments.length - 1

        return (
          <span key={segmentPath}>
            <span aria-hidden="true">/</span>
            {isCurrent ? (
              <span aria-current="page">{getNoteDisplayName(segment)}</span>
            ) : (
              <Link to={toNoteRoute(segmentPath)}>{segment}</Link>
            )}
          </span>
        )
      })}
    </nav>
  )
}
