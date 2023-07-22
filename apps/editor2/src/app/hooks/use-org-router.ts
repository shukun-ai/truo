import { useCallback } from 'react';

import { useParams } from 'react-router-dom';

export const useOrgRoute = () => {
  const { orgName } = useParams();

  return useCallback(
    (path: string) => {
      if (!path.includes(':orgName')) {
        return path;
      }
      if (orgName === ':orgName') {
        throw new Error('The routerOrgName did not parsed');
      }
      if (!orgName) {
        throw new Error('The routerOrgName did not set');
      }
      return path.replace(':orgName', orgName);
    },
    [orgName],
  );
};
