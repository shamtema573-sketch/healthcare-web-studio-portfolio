import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = process.cwd();
const pages = [
  ['portfolio', resolve(root, 'index.html')],
  ['aurelia', resolve(root, 'sites/aurelia/index.html')],
  ['forma', resolve(root, 'sites/forma/index.html')],
  ['clarity', resolve(root, 'sites/clarity/index.html')],
  ['movewell', resolve(root, 'sites/movewell/index.html')]
];

export default defineConfig({
  plugins: [react()],
  base: './',
  build: { rollupOptions: { input: Object.fromEntries(pages) }, outDir: 'dist', emptyOutDir: true }
});
