// File: vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Repository का नाम GitHub URL से कॉपी करें:
// आपकी URL: https://github.com/Krish-Sisodiya/Festivora.git
// Repository Name: /Festivora/

export default defineConfig({
  plugins: [react()],
  
  // ✨ FIX: Base path configuration
  base: '/Festivora/', // <--- यह लाइन जोड़ें
});