import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // L'alias `@/*` est déclaré une seule fois, dans tsconfig.app.json.
    tsconfigPaths: true,
  },
})
