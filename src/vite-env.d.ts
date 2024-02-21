/// <reference types="vite/client" />

// See https://vitejs.dev/guide/env-and-mode#intellisense-for-typescript
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
