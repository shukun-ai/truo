/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PRESENTER_BASE_URL: string | undefined;
  readonly VITE_PRESENTER_STORAGE_URL: string | undefined;
  readonly VITE_PRESENTER_POST_MESSAGE_CROSS_ORIGIN: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
