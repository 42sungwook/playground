import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const commonConfig = {
    plugins: [react(), svgr()],
    build: {
      sourcemap: true
    },
    envDir: './env'
  }

  if (command === 'serve') {
    return {
      ...commonConfig,
      server: {
        host: mode === 'development' ? 'localhost' : 'sungwook.dev',
        port: 8080
      },
      preview: {
        host: 'localhost',
        port: 8080
      }
    }
  }

  // Production config
  return {
    ...commonConfig,
    plugins: [...commonConfig.plugins, basicSsl()],
    server: {
      https: true,
      host: 'sungwook.dev',
      port: 8080
    },
    preview: {
      host: 'localhost',
      port: 8080
    }
  }
})
