// File: vite.config.ts

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // ✅ FIX: 'base' को हटा दें (या इसे '/' पर सेट करें)
  // Vercel या Netlify पर डिप्लॉय करते समय इसकी आवश्यकता नहीं होती है।
  // base: '/Festivora/', // <-- यह लाइन हटा दें या कमेंट कर दें।
});