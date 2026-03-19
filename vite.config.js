import { defineConfig } from 'vite'
<<<<<<< HEAD
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
=======
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
>>>>>>> 28ced4f6dde8b24c6357b5069f090ee7b9edfe2d
})
