import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VisitTracker',
      fileName: 'bundle',
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: [
        '@fingerprintjs/fingerprintjs',
        '@supabase/supabase-js',
        'uuid'
      ],
      output: {
        globals: {
          '@fingerprintjs/fingerprintjs': 'FingerprintJS',
          '@supabase/supabase-js': 'supabase',
          'uuid': 'uuid'
        }
      }
    }
  },
  plugins: [dts()],
  resolve: {
    alias: {
      '@api': resolve(__dirname, 'src/api'),
      '@core': resolve(__dirname, 'src/core')
    }
  }
})