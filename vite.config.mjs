import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig, loadEnv } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  return {
    plugins: [react(), tailwindcss()],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify - file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== "true",
      // Allow IDE/tunnel hosts to prevent Vite host-check 403 responses.
      allowedHosts: true,
      // This project path includes ".git" as a folder name, which triggers Vite's default
      // deny glob "**/.git/**". Keep other defaults but remove that deny rule.
      fs: {
        deny: [".env", ".env.*", "*.{crt,pem}"],
      },
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          changeOrigin: true,
        },
      },
    },
  };
});
