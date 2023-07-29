/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EDITOR_BASE_URL: string | undefined;
  readonly VITE_EDITOR_STORAGE_URL: string | undefined;
  readonly VITE_EDITOR_PUBLIC_PATH: string | undefined;
  readonly VITE_EDITOR_PREVIEW_URL: string | undefined;
  readonly VITE_ORG_REGISTER_MODE: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
