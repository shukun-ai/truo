// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

export const environment = {
  production: false,
  enableCrossOriginAuth: true,
  serverDomain: process.env?.['NX_CLIENT_BASE_URL'] ?? '',
  storageDomain: process.env?.['NX_CLIENT_STORAGE_URL'] ?? '',
  assetDomain: process.env?.['NX_CLIENT_STORAGE_URL'] ?? '',
  rsaPublicKey: process.env?.['NX_CLIENT_RSA_PUBLIC_KEY'] ?? '',
};
