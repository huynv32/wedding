import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Plugin: ép trình duyệt reload toàn trang khi save file (Ctrl+S)
function fullReloadOnSave() {
  return {
    name: 'full-reload-on-save',
    configureServer(server) {
      server.watcher.on('change', (path) => {
        if (/\.(vue|css|html|js)$/.test(path) && !path.includes('node_modules')) {
          setTimeout(() => {
            server.ws.send({ type: 'full-reload', path })
          }, 100)
        }
      })
    }
  }
}

export default defineConfig({
  plugins: [vue(), fullReloadOnSave()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    open: true,
    watch: {
      usePolling: true,
      interval: 300
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  }
})



