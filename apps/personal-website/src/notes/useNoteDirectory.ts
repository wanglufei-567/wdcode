import { useEffect, useState } from 'react'

import { fetchNoteDirectory, type NoteDirectoryEntry } from './api'

type DirectoryState =
  | { status: 'loading'; entries: readonly NoteDirectoryEntry[]; message?: undefined }
  | { status: 'ready'; entries: readonly NoteDirectoryEntry[]; message?: undefined }
  | { status: 'error'; entries: readonly NoteDirectoryEntry[]; message: string }

/**
 * @description 随当前笔记目录变化读取 Nginx JSON Autoindex，并取消已经过期的请求
 * @param sourcePath 相对于 DebrisRecord 根目录的目录路径
 * @returns 可直接驱动加载态、目录列表和错误态的状态对象
 */
export function useNoteDirectory(sourcePath: string): DirectoryState {
  const [state, setState] = useState<DirectoryState>({
    status: 'loading',
    entries: [],
  })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', entries: [] })

    fetchNoteDirectory(sourcePath, controller.signal)
      .then((entries) => {
        setState({ status: 'ready', entries })
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) {
          return
        }

        setState({
          status: 'error',
          entries: [],
          message: error instanceof Error ? error.message : '笔记目录暂时无法读取',
        })
      })

    return () => controller.abort()
  }, [sourcePath])

  return state
}
