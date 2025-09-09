import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    assetsDir: 'assets',
  },
  // Remove the entire server section or keep just the port
  server: {
    port: 5173
  }
})