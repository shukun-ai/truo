import { AppProps } from '@shukun/presenter/widget-react';
import { SystemPublicOrgModel } from '@shukun/schema';
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
