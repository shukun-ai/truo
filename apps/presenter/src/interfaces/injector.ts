import {
  ConnectorRequester,
  PublicRequester,
  SourceRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';
import { Observable } from 'rxjs';

export type Injector = {
  environments: {
    production: boolean;
    serverDomain: string;
    storageDomain: string;
    assetDomain: string;
  };
  devtool: {
    send: (action: string, scope: string, state: unknown) => void;
  };
  store: {
    update: <T>(path: string[], callback: (previous: T) => T) => void;
    remove: (path: string[]) => void;
    getValue: <T>(path: string[]) => T;
    query: <T>(path: string[]) => Observable<T>;
    queryAll: () => Observable<unknown>;
    getAllValue: () => unknown;
  };
  api: {
    publicRequester: PublicRequester;
    connectorRequester: ConnectorRequester;
    createSourceRequester: <Model extends UnknownSourceModel>(
      atomName: string,
    ) => SourceRequester<Model>;
  };
};
