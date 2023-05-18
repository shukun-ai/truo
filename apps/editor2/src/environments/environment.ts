// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Environment } from './environment.type';

export const environment: Environment = {
  production: false,
  serverDomain: process.env.NX_EDITOR_BASE_URL ?? '',
  storageDomain: process.env.NX_EDITOR_STORAGE_URL ?? '',
  assetDomain: process.env.NX_EDITOR_STORAGE_URL ?? '',
  version: process.env.NX_EDITOR_VERSION ?? '1.0.0',
  authPersistKey: process.env.NX_EDITOR_AUTH ?? 'SHUKUN_EDITOR_AUTH',
};
