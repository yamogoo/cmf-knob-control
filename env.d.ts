/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PORT: number
  readonly APP_VERSION: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
