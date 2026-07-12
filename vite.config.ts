import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';

  return {
    plugins: [react()],

    resolve: {
      alias: {
        // Import from the src root as '@/…' instead of deep '../../../' chains.
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },

    // Dev server — exposed on the LAN so you can test on real devices.
    server: {
      port: 5173,
      host: true,
    },
    preview: {
      port: 4173,
    },

    // Pre-bundle the core runtime so cold dev starts don't stall on discovery.
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@reduxjs/toolkit',
        'react-redux',
      ],
    },

    esbuild: {
      // Always drop debugger; strip noisy console.* (keep error/warn) in prod.
      drop: ['debugger'],
      pure: isProd ? ['console.log', 'console.info', 'console.debug'] : [],
    },

    build: {
      target: 'es2020',
      sourcemap: false,
      // 3D/analytics/chart libs are large; 500 kB default is too noisy.
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          // Split only libs that are used wholesale — matched by exact
          // node_modules path. Do NOT add react-icons here: it ships giant
          // per-set modules and manual-chunking it defeats tree-shaking.
          manualChunks(id) {
            if (
              id.includes('node_modules/three') ||
              id.includes('node_modules/@react-three')
            )
              return 'vendor-three';
            if (
              id.includes('node_modules/firebase') ||
              id.includes('node_modules/@firebase')
            )
              return 'vendor-firebase';
            return undefined;
          },
        },
      },
    },
  };
});
