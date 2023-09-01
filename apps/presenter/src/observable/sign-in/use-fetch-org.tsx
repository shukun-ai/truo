import { SystemPublicOrgModel } from '@shukun/schema';
import { useEffect, useState } from 'react';

import { AppProps } from '../../interfaces/app';

export const useFetchOrg = (app: AppProps) => {
  const [org, setOrg] = useState<SystemPublicOrgModel>();

  useEffect(() => {
    app.injector.api.publicRequester
      .getOrg(app.state.router.orgName)
      .then((response) => {
        setOrg(response.data.value);
      });
  }, [app.injector.api.publicRequester, app.state.router.orgName]);

  return org;
};
