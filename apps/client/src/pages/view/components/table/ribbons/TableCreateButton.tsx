import { LegacyFunctionComponent } from '@shukun/component';
import { RoleResourceType, ViewSchema } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useCallback, useMemo } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router';

import { RibbonButton } from '../../../../../components/ribbon/RibbonButton';
import {
  grantList$,
  grantRoles$,
  isGranted,
} from '../../../../../services/security';
import { RoutePath, useOrgPath } from '../../../../../utils/history-provider';

export interface TableCreateButtonProps {
  view: ViewSchema;
}

export const TableCreateButton: LegacyFunctionComponent<
  TableCreateButtonProps
> = ({ view }) => {
  const navigate = useNavigate();

  const viewCreateOrgPath = useOrgPath(RoutePath.ViewCreate);

  const handleClick = useCallback(() => {
    navigate(viewCreateOrgPath.replace(':viewName', view.name));
  }, [navigate, viewCreateOrgPath, view.name]);

  const grantList = useObservableState(grantList$, []);

  const grantRoles = useObservableState(grantRoles$, []);

  const canCreate = useMemo(() => {
    if (!view.atomName) {
      throw new Error('Did not configure atomName in view.');
    }
    return isGranted({
      grantList,
      grantRoles,
      type: RoleResourceType.Source,
      name: view.atomName,
      action: 'create',
    });
  }, [view.atomName, grantList, grantRoles]);

  if (!canCreate) {
    return <></>;
  }

  return (
    <RibbonButton
      name="create"
      label="新建"
      icon={<AiOutlinePlusCircle />}
      color="green"
      //   disabled={}
      disabledTip="您没有权限新建"
      onClick={handleClick}
    />
  );
};
