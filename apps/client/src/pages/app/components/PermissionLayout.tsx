import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { globalService, org$ } from '../../../services/global';
import { roleService } from '../../../services/role/service';
import { securityService } from '../../../services/security';
import { sessionService } from '../../../services/session';
import { viewService } from '../../../services/view';

export interface PermissionLayoutProps {}

export const PermissionLayout: FunctionComponent<PermissionLayoutProps> = ({
  children,
}) => {
  const org = useObservableState(org$);

  useEffect(() => {
    Promise.all([
      securityService.fetchGrantList(),
      securityService.fetchGrantRoles(),
    ]).then(() => {
      viewService.fetch();
    });
  }, []);

  useEffect(() => {
    const orgName = sessionService.getOrgName();
    if (orgName) {
      globalService.fetchOrg(orgName);
    }
  }, []);

  useEffect(() => {
    roleService.fetch();
  }, []);

  return (
    <>
      <Helmet>
        <title>{org?.label}</title>
      </Helmet>
      {children}
    </>
  );
};
