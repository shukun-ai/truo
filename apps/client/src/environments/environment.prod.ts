export const environment = {
  production: true,
  enableCrossOriginAuth: true,
  serverDomain: process.env?.['NX_CLIENT_BASE_URL'] ?? '',
  storageDomain: process.env?.['NX_CLIENT_STORAGE_URL'] ?? '',
  assetDomain: process.env?.['NX_CLIENT_ASSETS_URL'] ?? '',
};
