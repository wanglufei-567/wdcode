const NOTES_ROUTE_BASE = '/notes'
const NOTE_CONTENT_BASE = '/note-content'

/**
 * @description 将笔记相对路径编码为可放入 URL 的分段路径，同时保留目录层级
 * @param sourcePath 相对于 DebrisRecord 根目录的文件或目录路径
 * @returns 每个路径分段均完成 URL 编码的路径
 */
export function encodeNotePath(sourcePath: string): string {
  return sourcePath
    .split('/')
    .filter(Boolean)
    .map((segment) => encodeURIComponent(segment))
    .join('/')
}

/**
 * @description 把精选文章或目录的源路径转换为公开笔记路由
 * @param sourcePath 相对于 DebrisRecord 根目录的路径
 * @returns `/notes/*` 下的公开站内地址
 */
export function toNoteRoute(sourcePath: string): string {
  const encodedPath = encodeNotePath(sourcePath)
  return encodedPath === '' ? NOTES_ROUTE_BASE : `${NOTES_ROUTE_BASE}/${encodedPath}`
}

/**
 * @description 把目录路径转换为 Nginx JSON Autoindex 请求地址
 * @param sourcePath 相对于 DebrisRecord 根目录的目录路径
 * @returns 以斜杠结尾的只读内容目录地址
 */
export function toNoteDirectoryUrl(sourcePath: string): string {
  const encodedPath = encodeNotePath(sourcePath)
  return encodedPath === '' ? `${NOTE_CONTENT_BASE}/` : `${NOTE_CONTENT_BASE}/${encodedPath}/`
}

/**
 * @description 把文章或资源路径转换为只读内容请求地址
 * @param sourcePath 相对于 DebrisRecord 根目录的文件路径
 * @returns `/note-content/*` 下的资源地址
 */
export function toNoteContentUrl(sourcePath: string): string {
  return `${NOTE_CONTENT_BASE}/${encodeNotePath(sourcePath)}`
}

/**
 * @description 规范化 React Router 通配参数，禁止路径越过 DebrisRecord 根目录
 * @param routePath `/notes/*` 路由中的剩余路径
 * @returns 可用于目录和文章查询的相对路径
 */
export function normalizeNoteRoutePath(routePath: string): string {
  const segments: string[] = []

  for (const segment of routePath.split('/')) {
    if (segment === '' || segment === '.') {
      continue
    }

    if (segment === '..') {
      segments.pop()
      continue
    }

    segments.push(segment)
  }

  return segments.join('/')
}

/**
 * @description 从笔记路径提取适合阅读页和目录列表显示的名称
 * @param sourcePath 相对于 DebrisRecord 根目录的路径
 * @returns 移除 Markdown 扩展名后的末级名称
 */
export function getNoteDisplayName(sourcePath: string): string {
  const name = sourcePath.split('/').at(-1) ?? ''
  return name.replace(/\.md$/i, '')
}

/**
 * @description 返回文章所在的 DebrisRecord 相对目录
 * @param sourcePath 相对于 DebrisRecord 根目录的 Markdown 路径
 * @returns 不包含文件名的相对目录
 */
export function getNoteDirectoryPath(sourcePath: string): string {
  return sourcePath.split('/').slice(0, -1).join('/')
}

/**
 * @description 解析 Markdown 中相对于当前文章的路径，并阻止越过内容根目录
 * @param currentSourcePath 当前文章相对于 DebrisRecord 的路径
 * @param relativePath Markdown 链接或图片中的相对地址
 * @returns 解析后的内容相对路径，越界时返回 undefined
 */
export function resolveRelativeNotePath(currentSourcePath: string, relativePath: string): string | undefined {
  const baseSegments = getNoteDirectoryPath(currentSourcePath).split('/').filter(Boolean)

  for (const segment of relativePath.split('/')) {
    if (segment === '' || segment === '.') {
      continue
    }

    if (segment === '..') {
      if (baseSegments.length === 0) {
        return undefined
      }

      baseSegments.pop()
      continue
    }

    baseSegments.push(decodeURIComponent(segment))
  }

  return baseSegments.join('/')
}
