import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

if (process.platform !== 'darwin') {
  console.error('Run this script on macOS to build the DMG installer.')
  process.exit(1)
}

const root = fileURLToPath(new URL('..', import.meta.url))
const steps = [
  ['node_modules/typescript/bin/tsc', '--noEmit'],
  ['node_modules/vite/bin/vite.js', 'build'],
  [
    'node_modules/@tauri-apps/cli/tauri.js',
    'build',
    '--bundles',
    'app,dmg',
    '--config',
    JSON.stringify({ build: { beforeBuildCommand: '' } }),
  ],
]

for (const args of steps) {
  const result = spawnSync(process.execPath, args, {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
  })
  if (result.error) {
    console.error(result.error.message)
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}
