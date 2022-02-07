import { HttpRequestService } from '@shukun/api';
import { sessionService } from '../../services/session';
import { environment } from '../../environments';

export const httpRequestService = new HttpRequestService({
  baseUrl: `${environment.serverDomain}/apis/v1`,
  getOrgNameFunction: () => sessionService.getOrgName(),
  getAccessTokenFunction: () =>
    sessionService.getSessionValidAuth()?.accessToken ?? null,
});
