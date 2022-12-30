import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { RoutePath } from '../../routes';

export interface WorkspaceSidebarProps {}

export const WorkspaceSidebar: FunctionComponent<
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
