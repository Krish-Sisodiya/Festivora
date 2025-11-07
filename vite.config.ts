// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Festivora/",  // ✅ MUST have leading + trailing slash
  plugins: [react()],
});
