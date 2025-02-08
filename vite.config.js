import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000', // Your backend server (json-server or any API server)
          changeOrigin: true,              // Change origin to match the target
          secure: false,                   // Set to false if you're not using HTTPS
          rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Rewrite URL path
        },
      },
    },
  },
})
