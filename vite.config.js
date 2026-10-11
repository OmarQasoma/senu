import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', 'TMDB_')

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/tmdb': {
          target: 'https://api.themoviedb.org',
          changeOrigin: true,
          rewrite: path => path.replace('/api/tmdb', '/3'),
          headers: {
            Authorization: `Bearer ${env.TMDB_READ_ACCESS_TOKEN}`,
          },
        },
      },
    },
  }
})