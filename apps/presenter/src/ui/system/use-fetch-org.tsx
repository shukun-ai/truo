import { SystemPublicOrgModel } from '@shukun/schema';
import { AppProps } from '@shukun/widget-react';
import { useEffect, useState } from 'react';

export const useFetchOrg = (app: AppProps) => {
  const [org, setOrg] = useState<SystemPublicOrgModel>();

  useEffect(() => {
    app.api.publicRequester.getOrg(app.context.orgName).then((response) => {
      setOrg(response.data.value);
    });
  }, [app.api.publicRequester, app.context.orgName]);

  return org;
};
