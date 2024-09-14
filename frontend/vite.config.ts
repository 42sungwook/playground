import basicSsl from '@vitejs/plugin-basic-ssl'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  const commonConfig = {
    plugins: [react(), svgr()],
    preview: {
      port: 8080
    },
    build: {
      sourcemap: true
    },
    envDir: './env'
  }

  const serverConfig = {
    ...commonConfig,
    server: {
      host: env.HOST || '0.0.0.0',
      port: parseInt(env.PORT || '8080')
    }
  }

  if (command === 'serve') {
    return serverConfig
  }

  return {
    ...serverConfig,
    plugins: [...serverConfig.plugins, basicSsl()]
  }
})
