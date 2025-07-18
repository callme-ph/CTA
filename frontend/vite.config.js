import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/CTA/frontend/', // Caminho relativo no GitHub Pages
  plugins: [react()],
})
