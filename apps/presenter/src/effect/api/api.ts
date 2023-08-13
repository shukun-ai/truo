import {
  AxiosAdaptor,
  ConnectorRequester,
  PublicRequester,
  SourceRequester,
} from '@shukun/api';

import { Injector } from '../../interfaces/injector';

export const initializeApi = (
  environments: Injector['environments'],
  devtool: Injector['devtool'],
  store: Injector['store'],
): Injector['api'] => {
  const adaptor = new AxiosAdaptor({
    baseUrl: `${environments.serverDomain}/apis/v1`,
    onOrgName: () => getOrgName(store),
    onAccessToken: () => getAccessToken(store),
  });

  return {
    publicRequester: new PublicRequester(adaptor),
    connectorRequester: new ConnectorRequester(adaptor),
    createSourceRequester: (atomName: string) =>
      new SourceRequester(adaptor, atomName),
  };
};

const getOrgName = (store: Injector['store']): string | null => {
  const auth: any = store.getValue(['auth']);
  return auth?.current?.orgName ?? null;
};

const getAccessToken = (store: Injector['store']): string | null => {
  const auth: any = store.getValue(['auth']);
  return auth?.current?.accessToken ?? null;
};
