import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown, { type Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { normalizeNotebookMarkdown } from '../content/markdown'
import { fetchNoteMarkdown } from './api'
import {
  getNoteDisplayName,
  resolveRelativeNotePath,
  toNoteContentUrl,
  toNoteRoute,
} from './paths'

interface MarkdownReaderProps {
  sourcePath: string
}

type MarkdownState =
  | { status: 'loading'; markdown?: undefined; message?: undefined }
  | { status: 'ready'; markdown: string; message?: undefined }
  | { status: 'error'; markdown?: undefined; message: string }

const externalUrlPattern = /^[a-z][a-z\d+.-]*:/i

function splitHref(href: string): { path: string; suffix: string } {
  const suffixIndex = href.search(/[?#]/)
  return suffixIndex === -1
    ? { path: href, suffix: '' }
    : { path: href.slice(0, suffixIndex), suffix: href.slice(suffixIndex) }
}

function isExternalOrAbsoluteUrl(href: string): boolean {
  return externalUrlPattern.test(href) || href.startsWith('//') || href.startsWith('/') || href.startsWith('#')
}

/**
 * @description 将 Markdown 相对链接映射到笔记路由或同目录静态资源
 * @param href Markdown 中的原始链接
 * @param sourcePath 当前文章相对于 DebrisRecord 的路径
 * @returns 可供 React 链接组件消费的站内或原始地址
 */
function resolveReaderHref(href: string, sourcePath: string): { href: string; isNoteRoute: boolean } {
  if (isExternalOrAbsoluteUrl(href)) {
    return { href, isNoteRoute: false }
  }

  const { path, suffix } = splitHref(href)
  const resolvedPath = resolveRelativeNotePath(sourcePath, path)

  if (resolvedPath === undefined) {
    return { href, isNoteRoute: false }
  }

  if (/\.md$/i.test(resolvedPath)) {
    return { href: `${toNoteRoute(resolvedPath)}${suffix}`, isNoteRoute: true }
  }

  return { href: `${toNoteContentUrl(resolvedPath)}${suffix}`, isNoteRoute: false }
}

/**
 * @description 按需读取并以阅读态渲染一篇 DebrisRecord Markdown
 * @param props.sourcePath 当前文章相对于内容根的路径
 * @returns 包含加载、错误和 Markdown 阅读态的正文区域
 */
export function MarkdownReader({ sourcePath }: MarkdownReaderProps) {
  const [state, setState] = useState<MarkdownState>({ status: 'loading' })
  const title = getNoteDisplayName(sourcePath)

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchNoteMarkdown(sourcePath, controller.signal)
      .then((markdown) => {
        setState({
          status: 'ready',
          markdown: normalizeNotebookMarkdown(markdown, title),
        })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        setState({
          status: 'error',
          message: error instanceof Error ? error.message : '笔记暂时无法读取',
        })
      })

    return () => controller.abort()
  }, [sourcePath, title])

  const components = useMemo<Components>(() => ({
    a({ href = '', children, ...props }) {
      const resolved = resolveReaderHref(href, sourcePath)

      return resolved.isNoteRoute ? (
        <Link to={resolved.href}>{children}</Link>
      ) : (
        <a {...props} href={resolved.href}>{children}</a>
      )
    },
    img({ src = '', alt = '', ...props }) {
      const resolved = resolveReaderHref(src, sourcePath)
      return <img {...props} src={resolved.href} alt={alt} loading="lazy" />
    },
  }), [sourcePath])

  if (state.status === 'loading') {
    return <p className="note-reader-status">正在读取笔记</p>
  }

  if (state.status === 'error') {
    return (
      <div className="note-reader-status note-reader-status--error" role="alert">
        <h1>{state.message}</h1>
        <p>请返回上级目录确认文章路径，或稍后重新加载</p>
      </div>
    )
  }

  return (
    <>
      <header className="note-reader-header">
        <p>Markdown 笔记</p>
        <h1>{title}</h1>
      </header>
      <article className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {state.markdown}
        </ReactMarkdown>
      </article>
    </>
  )
}
