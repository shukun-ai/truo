// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: import.meta.env.PROD,
  enableCrossOriginAuth: true,
  serverDomain: import.meta.env?.VITE_CLIENT_BASE_URL ?? '',
  storageDomain: import.meta.env?.VITE_CLIENT_STORAGE_URL ?? '',
  assetDomain: import.meta.env?.VITE_CLIENT_STORAGE_URL ?? '',
  cryptoPassword: import.meta.env?.VITE_CLIENT_CRYPTO_PASSWORD ? true : false,
  rsaPublicKey: import.meta.env?.VITE_CLIENT_RSA_PUBLIC_KEY ?? '',
};
