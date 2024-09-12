import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [react(), svgr()],
      server: {
        host: 'sungwook.dev',
        port: 8080
      },
      preview: {
        host: 'localhost',
        port: 8080
      },
      build: {
        sourcemap: true
      },
      envDir: './env'
    }
  }
  // todo: ssl
  return {
    plugins: [react(), basicSsl(), svgr()],
    server: {
      host: 'sungwook.dev',
      port: 8080
    },
    preview: {
      host: 'localhost',
      port: 8080
    },
    build: {
      sourcemap: true
    },
    envDir: './env'
  }
})
