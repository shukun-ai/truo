import { HttpRequestService } from '@shukun/api';

import { environment } from '../../environments';
import { sessionService } from '../../services/session';

export const httpRequestService = new HttpRequestService({
  baseUrl: `${environment.serverDomain}/apis/v1`,
  getOrgNameFunction: () => sessionService.getOrgName(),
  getAccessTokenFunction: () =>
    sessionService.getSessionValidAuth()?.accessToken ?? null,
});
