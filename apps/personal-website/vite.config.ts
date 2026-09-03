import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { createNotesContentPlugin } from '@wdcode/notes/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const configDirectory = path.dirname(fileURLToPath(import.meta.url))
const defaultNotesRoot = path.resolve(configDirectory, '../../content/debris-record')
const notesRoot = path.resolve(process.env.DEBRIS_RECORD_PATH ?? defaultNotesRoot)

export default defineConfig({
  plugins: [react(), createNotesContentPlugin(notesRoot)],
  resolve: {
    dedupe: ['react', 'react-dom', 'react-router', 'react-router-dom'],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
