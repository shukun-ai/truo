import { Button } from 'antd';
import React, { FunctionComponent } from 'react';

import { WorkspaceSidebar } from './workspace-sidebar';
import { WorkspaceTabs } from './workspace-tabs';

export interface WorkspaceProps {}

export const Workspace: FunctionComponent<WorkspaceProps> = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
      }}
    >
      <div
        id="workspace-header"
        style={{
          display: 'flex',
          height: 44,
          borderBottom: 'solid 1px #ccc',
          backgroundColor: '#fff',
          alignItems: 'center',
        }}
      >
        <div style={{ width: SIDEBAR_WIDTH, backgroundColor: 'blue' }}>
          SHUKUN FLOWS
        </div>
        <div style={{ flex: 1 }}>
          <WorkspaceTabs />
        </div>
        <div style={{ paddingRight: 12 }}>
          <Button type="primary">Deploy</Button>
        </div>
      </div>

      <div id="workspace-main" style={{ flex: 1, display: 'flex' }}>
        <div
          style={{
            width: SIDEBAR_WIDTH,
            borderRight: 'solid 1px #ccc',
            backgroundColor: '#fff',
          }}
        >
          <WorkspaceSidebar />
        </div>
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export const SIDEBAR_WIDTH = 50;
