import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import type { NoteDirectoryEntry } from './api'
import { getNoteDisplayName, isNotePathWithin, toNoteRoute } from './paths'
import { useNoteDirectory } from './useNoteDirectory'

interface NotesSidebarProps {
  activeSourcePath: string
}

interface NoteTreeBranchProps {
  activeSourcePath: string
  sourcePath: string
}

interface NoteTreeEntriesProps extends NoteTreeBranchProps {
  entries: readonly NoteDirectoryEntry[]
}

interface NoteTreeDirectoryProps {
  activeSourcePath: string
  entryPath: string
  name: string
}

interface NoteTreeLinkProps {
  children: string
  isCurrent: boolean
  onClick?: () => void
  to: string
}

const NOTE_TREE_ANCHOR_RATIO = 0.42
const NOTE_TREE_SCROLL_DURATION_MS = 240

/**
 * @description 为目录锚点滚动提供自然减速曲线，避免短距离定位像瞬间跳变
 * @param progress 从 0 到 1 的动画进度
 * @returns 使用 quart 曲线减速后的动画进度
 */
function easeOutQuart(progress: number): number {
  return 1 - (1 - progress) ** 4
}

function joinNotePath(parentPath: string, entryName: string): string {
  return [parentPath, entryName].filter(Boolean).join('/')
}

/**
 * @description 在当前路由节点出现时将它锚定到目录树主要视区，同时保持普通链接语义
 * @param props.isCurrent 链接是否对应当前笔记路由
 * @param props.to 目标笔记路由
 * @returns 支持当前项定位的目录树链接
 */
function NoteTreeLink({ children, isCurrent, onClick, to }: NoteTreeLinkProps) {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const link = linkRef.current
    const sidebar = link?.closest<HTMLElement>('.notes-sidebar')

    if (!isCurrent || !link || !sidebar) {
      return
    }

    const heading = sidebar.querySelector<HTMLElement>('.notes-sidebar__heading')
    const sidebarRect = sidebar.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    const headingHeight = heading?.offsetHeight ?? 0
    const treeViewportHeight = sidebar.clientHeight - headingHeight
    const anchorTop = sidebarRect.top + headingHeight + treeViewportHeight * NOTE_TREE_ANCHOR_RATIO
    const linkCenter = linkRect.top + linkRect.height / 2
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const initialScrollTop = sidebar.scrollTop
    const targetScrollTop = Math.max(0, initialScrollTop + linkCenter - anchorTop)
    const scrollDistance = targetScrollTop - initialScrollTop

    if (prefersReducedMotion || Math.abs(scrollDistance) < 1) {
      sidebar.scrollTop = targetScrollTop
      return
    }

    const startedAt = performance.now()
    const scrollContainer = sidebar
    let animationFrame = 0

    function animateScroll(timestamp: number) {
      const progress = Math.min((timestamp - startedAt) / NOTE_TREE_SCROLL_DURATION_MS, 1)
      scrollContainer.scrollTop = initialScrollTop + scrollDistance * easeOutQuart(progress)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animateScroll)
      }
    }

    animationFrame = requestAnimationFrame(animateScroll)

    return () => cancelAnimationFrame(animationFrame)
  }, [isCurrent])

  return (
    <Link
      ref={linkRef}
      className="notes-tree__link"
      to={to}
      aria-current={isCurrent ? 'page' : undefined}
      onClick={onClick}
    >
      {children}
    </Link>
  )
}

/**
 * @description 按需读取一个已展开目录的直接子项，避免初次渲染递归请求完整仓库
 * @param props.sourcePath 当前展开的 DebrisRecord 相对目录
 * @param props.activeSourcePath 当前路由对应的目录或文章路径
 * @returns 目录树分支的加载态、错误态或子项列表
 */
function NoteTreeBranch({ sourcePath, activeSourcePath }: NoteTreeBranchProps) {
  const directory = useNoteDirectory(sourcePath)

  if (directory.status === 'loading') {
    return <p className="notes-tree__status">正在读取</p>
  }

  if (directory.status === 'error') {
    return <p className="notes-tree__status notes-tree__status--error">{directory.message}</p>
  }

  if (directory.entries.length === 0) {
    return <p className="notes-tree__status">暂无笔记</p>
  }

  return (
    <NoteTreeEntries
      activeSourcePath={activeSourcePath}
      entries={directory.entries}
      sourcePath={sourcePath}
    />
  )
}

/**
 * @description 渲染一个可独立展开的目录节点，目录链接负责导航，按钮只控制树分支
 * @param props.entryPath 当前目录的 DebrisRecord 相对路径
 * @param props.name 保持原始命名的目录名称
 * @param props.activeSourcePath 当前路由对应的目录或文章路径
 * @returns 支持当前路径自动展开和键盘操作的目录节点
 */
function NoteTreeDirectory({ entryPath, name, activeSourcePath }: NoteTreeDirectoryProps) {
  const containsActivePath = isNotePathWithin(entryPath, activeSourcePath)
  const [isExpanded, setIsExpanded] = useState(containsActivePath)
  const branchId = useId()

  useEffect(() => {
    if (containsActivePath) {
      setIsExpanded(true)
    }
  }, [containsActivePath])

  return (
    <li className="notes-tree__item notes-tree__item--directory">
      <div className="notes-tree__row">
        <button
          className="notes-tree__toggle"
          type="button"
          aria-controls={branchId}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? '收起' : '展开'} ${name}`}
          onClick={() => setIsExpanded((expanded) => !expanded)}
        >
          <span aria-hidden="true">›</span>
        </button>
        <NoteTreeLink
          to={toNoteRoute(entryPath)}
          isCurrent={activeSourcePath === entryPath}
          onClick={() => setIsExpanded(true)}
        >
          {name}
        </NoteTreeLink>
      </div>

      {isExpanded && (
        <div id={branchId} className="notes-tree__branch">
          <NoteTreeBranch sourcePath={entryPath} activeSourcePath={activeSourcePath} />
        </div>
      )}
    </li>
  )
}

/**
 * @description 将同级目录和 Markdown 文件渲染为可递归嵌套的语义列表
 * @param props.entries 当前目录已经过滤和排序的直接子项
 * @param props.sourcePath 当前目录的 DebrisRecord 相对路径
 * @param props.activeSourcePath 当前路由对应的目录或文章路径
 * @returns 保留原始目录层级的导航列表
 */
function NoteTreeEntries({ entries, sourcePath, activeSourcePath }: NoteTreeEntriesProps) {
  return (
    <ul className="notes-tree__list">
      {entries.map((entry) => {
        const entryPath = joinNotePath(sourcePath, entry.name)

        if (entry.type === 'directory') {
          return (
            <NoteTreeDirectory
              key={entryPath}
              activeSourcePath={activeSourcePath}
              entryPath={entryPath}
              name={entry.name}
            />
          )
        }

        return (
          <li className="notes-tree__item notes-tree__item--file" key={entryPath}>
            <div className="notes-tree__row">
              <span className="notes-tree__file-marker" aria-hidden="true" />
              <NoteTreeLink
                to={toNoteRoute(entryPath)}
                isCurrent={activeSourcePath === entryPath}
              >
                {getNoteDisplayName(entry.name)}
              </NoteTreeLink>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * @description 在笔记页面提供按需加载的 DebrisRecord 完整目录树，并定位当前文章
 * @param props.activeSourcePath 当前路由对应的目录或文章路径
 * @returns 支持逐级展开、目录导航和当前项高亮的侧栏
 */
export function NotesSidebar({ activeSourcePath }: NotesSidebarProps) {
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
        <nav className="notes-tree" aria-label="笔记目录树">
          <NoteTreeEntries
            activeSourcePath={activeSourcePath}
            entries={directory.entries}
            sourcePath=""
          />
        </nav>
      )}
    </aside>
  )
}
