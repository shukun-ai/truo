import { Environment } from './environment.type';

export const environment: Environment = {
  production: true,
  serverDomain: process.env.NX_EDITOR_BASE_URL ?? '',
  storageDomain: process.env.NX_EDITOR_STORAGE_URL ?? '',
  assetDomain: process.env.NX_EDITOR_STORAGE_URL ?? '',
  previewDomain: process.env.NX_EDITOR_PREVIEW_URL ?? '',
  version: process.env.NX_EDITOR_VERSION ?? '1.0.0',
  authPersistKey: process.env.NX_EDITOR_AUTH ?? 'SHUKUN_EDITOR_AUTH',
  enableRegisteringOrg: process.env.NX_EDITOR_ENABLE_REGISTERING_ORG
    ? true
    : false,
};
