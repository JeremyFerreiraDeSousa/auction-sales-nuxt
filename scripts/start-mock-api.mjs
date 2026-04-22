import { spawn } from 'node:child_process'

const port = process.env.API_PORT || '3001'

const child = spawn(
  'json-server',
  ['--watch', 'db.json', '--port', port],
  {
    stdio: 'inherit',
    shell: true
  }
)

child.on('exit', (code) => {
  process.exit(code ?? 0)
})
