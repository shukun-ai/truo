export type Environment = {
  serverDomain: string;
  clientDomain: string;
  storageDomain: string;
  assetDomain: string;
  previewDomain: string;
  version: string;
  authPersistKey: string;
  orgRegisterMode: 'disabled' | 'self-create';
};
