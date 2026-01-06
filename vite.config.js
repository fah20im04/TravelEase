import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        darkMode: 'class',
        theme: {
          extend: {
            colors: {
              primary: '#2563EB',   // Blue-600
              secondary: '#F59E0B', // Amber-500
            },
          },
        },
      },
    }),
  ],
})
