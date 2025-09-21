import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/plugin-react-swc
export default defineConfig({
  plugins: [react()],
})
