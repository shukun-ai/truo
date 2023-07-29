// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  serverDomain: import.meta.env?.VITE_EDITOR_BASE_URL ?? '',
  storageDomain: import.meta.env?.VITE_EDITOR_STORAGE_URL ?? '',
  assetDomain: import.meta.env?.VITE_EDITOR_STORAGE_URL ?? '',
};
