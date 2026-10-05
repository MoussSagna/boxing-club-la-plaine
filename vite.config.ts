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
  build: {
    rolldownOptions: {
      output: {
        // Les bibliothèques changent rarement : dans leurs propres fichiers, elles restent
        // en cache chez le visiteur quand seul le code du site est mis à jour.
        advancedChunks: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/ },
            { name: 'gsap', test: /node_modules[\\/](gsap|@gsap)[\\/]/ },
          ],
        },
      },
    },
  },
})
