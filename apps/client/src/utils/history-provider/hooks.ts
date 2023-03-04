import { useParams } from 'react-router-dom';

import { RoutePath } from './constants';

import { replaceList } from '.';

export function replaceOrgPath(routePath: RoutePath, orgName: string): string {
  if (replaceList.includes(routePath)) {
    return routePath.replace('/:orgName', `/${orgName}`);
  } else {
    return routePath;
  }
}

export function useOrgPath(routePath: RoutePath): string {
  const { orgName } = useParams<{ orgName: string | undefined }>();

  if (!orgName) {
    // throw new Error("Did not find orgName from react router params.");
    return routePath;
  }

  return replaceOrgPath(routePath, orgName);
}
