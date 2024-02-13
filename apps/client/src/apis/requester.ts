import {
  AxiosAdaptor,
  DeveloperRequester,
  PublicRequester,
  SourceRequester,
  ViewRequester,
} from '@shukun/api';
import { UnknownSourceModel } from '@shukun/schema';

import { environment } from '../environments';
import { sessionService } from '../services/session';

export const axiosAdaptor = new AxiosAdaptor({
  baseUrl: `${environment.VITE_CLIENT_BASE_URL}/apis/v1`,
  onOrgName: () => sessionService.getOrgName(),
  onAccessToken: () =>
    sessionService.getSessionValidAuth()?.accessToken ?? null,
});

export const publicRequester = new PublicRequester(axiosAdaptor);

export const viewRequester = new ViewRequester(axiosAdaptor);

export const developerRequester = new DeveloperRequester(axiosAdaptor);

export const createSourceRequester = <Model extends UnknownSourceModel>(
  atomName: string,
) => new SourceRequester<Model>(axiosAdaptor, atomName);
