import { useEffect, useState } from 'react';

import { sessionService } from '../../../../../services/session';

export interface UploadRequestParams {
  action: string;
  orgId: string;
  orgName: string;
  token: string;
}

export function useUploadRequestParams() {
  const [params, setParams] = useState<UploadRequestParams | null>(null);

  useEffect(() => {
    const auth = sessionService.getSessionValidAuth();
    if (auth) {
      setParams({
        action: `${process.env?.['NX_CLIENT_STORAGE_URL'] ?? ''}/oss/upload`,
        orgId: auth.orgId,
        orgName: auth.orgName,
        token: auth.accessToken,
      });
    } else {
      setParams(null);
    }
  }, []);

  return params;
}
