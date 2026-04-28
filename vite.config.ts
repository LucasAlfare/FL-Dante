import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Custom Vite plugin for watching markdown content changes.
 * Automatically rebuilds content when markdown files change and triggers hot reload.
 * 
 * @returns {object} Vite plugin configuration
 */
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
              // Force client reload
              server.ws.send({ type: 'full-reload' })
            }
          })
        }
      })
    }
  }
}

/**
 * Vite configuration for FL-Dante project.
 * 
 * Features:
 * - React plugin for JSX support
 * - TailwindCSS plugin for styling
 * - Custom content watcher for markdown files
 * - Custom base path for deployment
 * - Development server configuration
 * - Build output configuration
 */
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
