import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '#': path.resolve('./src'),
    },
  },
  server: { port: 3113 },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
