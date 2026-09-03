import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const sourceExtensions = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx'])
const importPattern = /(?:from\s*|import\s*\()\s*['"]([^'"]+)['"]/g

async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const nestedFiles = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      return collectSourceFiles(entryPath)
    }

    return sourceExtensions.has(path.extname(entry.name)) ? [entryPath] : []
  }))

  return nestedFiles.flat()
}

function readImportSpecifiers(source) {
  return [...source.matchAll(importPattern)].map((match) => match[1])
}

function assertModuleImport(moduleName, filePath, importSpecifier) {
  if (importSpecifier.startsWith('apps/') || importSpecifier.includes('/apps/')) {
    throw new Error(`${filePath} 不得导入应用实现：${importSpecifier}`)
  }

  if (
    importSpecifier.startsWith('@wdcode/')
    && importSpecifier !== '@wdcode/site-module-contract'
    && importSpecifier !== '@wdcode/site-ui'
    && !importSpecifier.startsWith(`@wdcode/${moduleName}`)
  ) {
    throw new Error(`${filePath} 不得依赖其他业务模块：${importSpecifier}`)
  }
}

/**
 * @description 检查根级业务模块没有反向导入主应用或横向依赖其他业务模块
 * @returns 所有模块边界有效时正常结束，发现违规依赖时抛出可定位错误
 */
async function checkModuleBoundaries() {
  const modulesRoot = path.join(repositoryRoot, 'modules')
  const moduleEntries = await readdir(modulesRoot, { withFileTypes: true })

  for (const moduleEntry of moduleEntries) {
    if (!moduleEntry.isDirectory()) {
      continue
    }

    const sourceRoot = path.join(modulesRoot, moduleEntry.name, 'src')
    const sourceFiles = await collectSourceFiles(sourceRoot)

    for (const sourceFile of sourceFiles) {
      const source = await readFile(sourceFile, 'utf8')

      for (const importSpecifier of readImportSpecifiers(source)) {
        assertModuleImport(
          moduleEntry.name,
          path.relative(repositoryRoot, sourceFile),
          importSpecifier,
        )
      }
    }
  }
}

await checkModuleBoundaries()
console.log('Module boundary check passed')
