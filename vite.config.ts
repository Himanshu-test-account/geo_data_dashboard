import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // React plugin for Vite
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Easy imports with "@"
    },
  },
  server: {
    open: true, // Automatically open the browser on dev start
  },
  build: {
    sourcemap: true, // Optional: helps with debugging production build
  },
});
