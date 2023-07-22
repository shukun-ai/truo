// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Environment } from './environment.type';

const getOrgRegisterMode = () => {
  switch (process.env.NX_ORG_REGISTER_MODE) {
    case 'self-create':
      return 'self-create';
    case 'disabled':
      return 'disabled';
    default:
      return 'disabled';
  }
};

export const environment: Environment = {
  serverDomain: process.env.NX_EDITOR_BASE_URL ?? '',
  storageDomain: process.env.NX_EDITOR_STORAGE_URL ?? '',
  assetDomain: process.env.NX_EDITOR_STORAGE_URL ?? '',
  previewDomain: process.env.NX_EDITOR_PREVIEW_URL ?? '',
  version: process.env.NX_EDITOR_VERSION ?? '1.0.0',
  authPersistKey: process.env.NX_EDITOR_AUTH ?? 'SHUKUN_EDITOR_AUTH',
  orgRegisterMode: getOrgRegisterMode(),
};
