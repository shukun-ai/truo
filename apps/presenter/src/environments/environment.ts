export const environments = {
  production: import.meta.env?.PROD || false,
  serverDomain: import.meta.env?.VITE_EDITOR_BASE_URL ?? '',
  storageDomain: import.meta.env?.VITE_EDITOR_STORAGE_URL ?? '',
  assetDomain: import.meta.env?.VITE_EDITOR_STORAGE_URL ?? '',
};
