import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // If React; adjust for others
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})