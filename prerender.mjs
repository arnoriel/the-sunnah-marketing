import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distPath = path.resolve(__dirname, 'dist')

async function prerender() {
  // Load server bundle yang sudah di-build
  const { render } = await import('./dist/server/entry-server.js')

  // Baca template HTML dari client build
  const template = fs.readFileSync(
    path.resolve(distPath, 'index.html'),
    'utf-8'
  )

  // Render React jadi HTML string
  const appHtml = render()

  // Inject HTML ke dalam root div
  const html = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  )

  fs.writeFileSync(path.resolve(distPath, 'index.html'), html)
  console.log('✅ Pre-render berhasil!')
}

prerender().catch((e) => {
  console.error('❌ Pre-render gagal:', e)
  process.exit(1)
})