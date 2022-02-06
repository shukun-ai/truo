import { HttpRequestService } from '@shukun/api';
import { sessionService } from '../../services/session';

export const httpRequestService = new HttpRequestService({
  baseUrl: `${process.env?.['NX_CLIENT_BASE_URL'] ?? ''}/apis/v1`,
  getOrgNameFunction: () => sessionService.getOrgName(),
  getAccessTokenFunction: () =>
    sessionService.getSessionValidAuth()?.accessToken ?? null,
});
