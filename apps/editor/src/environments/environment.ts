// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

import { Environment } from './environment.type';

const getOrgRegisterMode = () => {
  switch (import.meta.env?.VITE_ORG_REGISTER_MODE) {
    case 'self-create':
      return 'self-create';
    case 'disabled':
      return 'disabled';
    default:
      return 'disabled';
  }
};

export const environment: Environment = {
  serverDomain: import.meta.env?.VITE_EDITOR_BASE_URL ?? '',
  storageDomain: import.meta.env?.VITE_EDITOR_STORAGE_URL ?? '',
  assetDomain: import.meta.env?.VITE_EDITOR_STORAGE_URL ?? '',
  previewDomain: import.meta.env?.VITE_EDITOR_PREVIEW_URL ?? '',
  version: import.meta.env?.NX_EDITOR_VERSION ?? '1.0.0',
  authPersistKey: import.meta.env?.NX_EDITOR_AUTH ?? 'SHUKUN_EDITOR_AUTH',
  orgRegisterMode: getOrgRegisterMode(),
};
