import { LegacyFunctionComponent } from '@shukun/component';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { RoutePath } from '../../routes';

export interface WorkspaceSidebarProps {}

export const WorkspaceSidebar: LegacyFunctionComponent<
  WorkspaceSidebarProps
> = () => {
  return (
    <div>
      <div>
        <Link to={RoutePath.FlowList}>Flows</Link>
      </div>
    </div>
  );
};
