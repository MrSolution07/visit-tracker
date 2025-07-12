/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: {
      VITE_SUPABASE_URL: string
      VITE_SUPABASE_KEY: string
    }
  }