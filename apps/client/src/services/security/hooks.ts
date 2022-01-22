import { Query, AccessControl } from 'accesscontrol';
import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { AccessInternalRoles } from '../../models/role';
import { GrantList, GrantRoles } from '../../models/security';

import { grantList$, grantRoles$ } from './query';

export function useGranted(
  resource: string,
  action: 'read:any' | 'create:any' | 'update:any' | 'delete:any',
) {
  const grantList = useObservableState(grantList$, null);
  const grantRoles = useObservableState(grantRoles$, null);

  return useMemo<boolean>(() => {
    return isGranted({ grantList, grantRoles, resource, action });
  }, [grantList, grantRoles, resource, action]);
}

export function isGranted(options: {
  grantList: GrantList | null;
  grantRoles: GrantRoles | null;
  resource: string;
  action: string;
}): boolean {
  const { grantList, grantRoles, resource, action } = options;

  if (!grantList || !grantRoles || grantRoles.length === 0) {
    return false;
  }

  if (grantRoles?.includes(AccessInternalRoles.Owner)) {
    return true;
  }

  const accessControl = new AccessControl(grantList);
  const accessQuery = accessControl.can(grantRoles);

  const permission = switchAction(accessQuery, resource, action);

  return permission.granted;
}

function switchAction(accessQuery: Query, resource: string, action: string) {
  switch (action) {
    case 'read:any':
      return accessQuery.readAny(resource);

    case 'create:any':
      return accessQuery.createAny(resource);

    case 'update:any':
      return accessQuery.updateAny(resource);

    case 'delete:any':
      return accessQuery.deleteAny(resource);

    default:
      throw new Error('No accurate actions.');
  }
}
