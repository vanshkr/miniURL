import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dirname } from "path";
import { fileURLToPath } from "url";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(dirname(fileURLToPath(import.meta.url)), "./src"),
    },
  },
});
