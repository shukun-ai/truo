/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CLIENT_BASE_URL: string | undefined;
  readonly VITE_CLIENT_STORAGE_URL: string | undefined;
  readonly VITE_CLIENT_STORAGE_URL: string | undefined;
  readonly VITE_CLIENT_CRYPTO_PASSWORD: string | undefined;
  readonly VITE_CLIENT_RSA_PUBLIC_KEY: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
