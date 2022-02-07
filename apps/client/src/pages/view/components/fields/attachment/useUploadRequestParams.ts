import { useEffect, useState } from 'react';

import { environment } from '../../../../../environments';

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
        action: `${environment.storageDomain}/oss/upload`,
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
