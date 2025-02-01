import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4000, // Puerto para el servidor de desarrollo
  },
  build: {
    outDir: "dist", // Carpeta de salida para la compilación
  },
});