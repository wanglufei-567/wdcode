import { createReadStream } from 'node:fs'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

import type { Plugin } from 'vite'

const contentTypes: Readonly<Record<string, string>> = {
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.md': 'text/markdown; charset=utf-8',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
}

function isInsideNotesRoot(notesRoot: string, candidatePath: string): boolean {
  return candidatePath === notesRoot || candidatePath.startsWith(`${notesRoot}${path.sep}`)
}

function isHiddenNotePath(relativePath: string): boolean {
  return relativePath.split(path.sep).some((segment) => segment.startsWith('.'))
}

/**
 * @description 在 Vite 开发环境复现生产 Nginx 的只读笔记目录和文件接口
 * @param notesRoot DebrisRecord 在当前开发机器上的绝对路径
 * @returns 仅处理 `/note-content/*` 的开发服务器插件
 */
export function createNotesContentPlugin(notesRoot: string): Plugin {
  const resolvedNotesRoot = path.resolve(notesRoot)

  return {
    name: 'wdcode-notes-content',
    configureServer(server) {
      server.middlewares.use('/note-content', async (request, response) => {
        try {
          const requestUrl = new URL(request.url ?? '/', 'http://localhost')
          const relativePath = decodeURIComponent(requestUrl.pathname).replace(/^\/+/, '')
          const targetPath = path.resolve(resolvedNotesRoot, relativePath)

          if (
            !isInsideNotesRoot(resolvedNotesRoot, targetPath)
            || isHiddenNotePath(path.relative(resolvedNotesRoot, targetPath))
          ) {
            response.statusCode = 404
            response.end('Not found')
            return
          }

          const targetStat = await stat(targetPath)
          response.setHeader('Cache-Control', 'no-cache')

          if (targetStat.isDirectory()) {
            const entries = await readdir(targetPath, { withFileTypes: true })
            const directoryPayload = await Promise.all(
              entries
                .filter((entry) => !entry.name.startsWith('.'))
                .map(async (entry) => {
                  const entryStat = await stat(path.join(targetPath, entry.name))
                  return {
                    name: entry.name,
                    type: entry.isDirectory() ? 'directory' : entry.isFile() ? 'file' : 'other',
                    mtime: entryStat.mtime.toISOString(),
                    size: entryStat.size,
                  }
                }),
            )

            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify(directoryPayload))
            return
          }

          response.setHeader(
            'Content-Type',
            contentTypes[path.extname(targetPath).toLowerCase()] ?? 'application/octet-stream',
          )
          createReadStream(targetPath).pipe(response)
        } catch {
          response.statusCode = 404
          response.end('Not found')
        }
      })
    },
  }
}
