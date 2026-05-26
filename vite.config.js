import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        login: resolve(__dirname, 'login.html'),
        services: resolve(__dirname, 'services.html'),
        'cloud-vps': resolve(__dirname, 'cloud-vps.html'),
        'dedicated-servers': resolve(__dirname, 'dedicated-servers.html'),
      },
    },
  },
});
