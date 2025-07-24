import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
// This configuration file sets up Vite for a React project, enabling JSX support and defining an alias for the source directory.
// The '@' alias allows for cleaner imports from the 'src' directory, making the code