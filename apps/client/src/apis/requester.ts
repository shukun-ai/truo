import { AxiosAdaptor, PublicRequester } from '@shukun/api';

import { environment } from '../environments';
import { sessionService } from '../services/session';

export const axiosAdaptor = new AxiosAdaptor({
  baseUrl: `${environment.serverDomain}/apis/v1`,
  onOrgName: () => sessionService.getOrgName(),
  onAccessToken: () =>
    sessionService.getSessionValidAuth()?.accessToken ?? null,
});

export const publicRequester = new PublicRequester(axiosAdaptor);
