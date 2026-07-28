import { useParams } from 'react-router-dom'

import { SiteFooter } from '../components/SiteFooter'
import { SiteHeader } from '../components/SiteHeader'
import { NoteBreadcrumbs } from '../notes/NoteBreadcrumbs'
import { NoteDirectoryList } from '../notes/NoteDirectoryList'
import { MarkdownReader } from '../notes/MarkdownReader'
import { NotesSidebar } from '../notes/NotesSidebar'
import { getNoteDisplayName, normalizeNoteRoutePath } from '../notes/paths'
import { useNoteDirectory } from '../notes/useNoteDirectory'

interface DirectoryReaderProps {
  sourcePath: string
}

function DirectoryReader({ sourcePath }: DirectoryReaderProps) {
  const directory = useNoteDirectory(sourcePath)
  const title = sourcePath === '' ? '全部笔记' : getNoteDisplayName(sourcePath)

  return (
    <>
      <header className="notes-directory-header">
        <p>{sourcePath === '' ? 'DebrisRecord' : '目录'}</p>
        <h1>{title}</h1>
        <span>目录结构直接来自当前 DebrisRecord 工作区</span>
      </header>

      {directory.status === 'loading' && <p className="note-reader-status">正在读取目录</p>}
      {directory.status === 'error' && (
        <div className="note-reader-status note-reader-status--error" role="alert">
          <h2>{directory.message}</h2>
          <p>请确认内容仓库已经挂载，并且当前目录仍然存在</p>
        </div>
      )}
      {directory.status === 'ready' && (
        <NoteDirectoryList entries={directory.entries} sourcePath={sourcePath} />
      )}
    </>
  )
}

/**
 * @description 承载完整 DebrisRecord 目录和阅读态文章的 `/notes/*` 路由
 * @returns 根目录、子目录或 Markdown 阅读页
 */
export function NotesPage() {
  const params = useParams()
  const sourcePath = normalizeNoteRoutePath(params['*'] ?? '')
  const isMarkdown = /\.md$/i.test(sourcePath)

  return (
    <div className="page-shell page-shell--notes">
      <a className="skip-link" href="#notes-content">跳到笔记内容</a>
      <SiteHeader />

      <div className="notes-layout">
        <NotesSidebar />

        <main id="notes-content" className="notes-content">
          <NoteBreadcrumbs sourcePath={sourcePath} />
          {isMarkdown ? (
            <MarkdownReader sourcePath={sourcePath} />
          ) : (
            <DirectoryReader sourcePath={sourcePath} />
          )}
        </main>
      </div>
      <SiteFooter />
    </div>
  )
}
