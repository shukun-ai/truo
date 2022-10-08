export const environment = {
  production: true,
  enableCrossOriginAuth: true,
  serverDomain: process.env?.['NX_CLIENT_BASE_URL'] ?? '',
  storageDomain: process.env?.['NX_CLIENT_STORAGE_URL'] ?? '',
  assetDomain: process.env?.['NX_CLIENT_STORAGE_URL'] ?? '',
  cryptoPassword: process.env?.['NX_CLIENT_CRYPTO_PASSWORD'] ? true : false,
  rsaPublicKey: process.env?.['NX_CLIENT_RSA_PUBLIC_KEY'] ?? '',
};
