import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // Permite que o Vite escute em todos os hosts de rede locais
    port: 5173, // Porta padrão do Vite ou outra que preferir
  },
});
