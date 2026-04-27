import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Plugin custom para watcher de markdowns
function watchContent() {
  return {
    name: 'watch-content',
    configureServer(server: any) {
      const { exec } = require('child_process')
      
      // Watch content directory
      const contentWatcher = server.watcher.add('./content')
      
      contentWatcher.on('change', (filePath: string) => {
        if (filePath.endsWith('.md')) {
          console.log('📝 Markdown changed, rebuilding content...')
          exec('node scripts/build-content.js', (error: any) => {
            if (error) {
              console.error('❌ Build error:', error)
            } else {
              console.log('✅ Content rebuilt successfully')
              // Forçar reload dos clientes
              server.ws.send({ type: 'full-reload' })
            }
          })
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), watchContent()],
  base: '/FL-Dante/',
  assetsInclude: ['**/*.md'],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  build: {
    outDir: 'dist',
    copyPublicDir: true
  }
})
