import { Button } from 'antd';
import React, { FunctionComponent } from 'react';

export interface WorkspaceProps {}

export const Workspace: FunctionComponent<WorkspaceProps> = ({ children }) => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        className="header"
        style={{ display: 'flex', height: 44, borderBottom: 'solid 1px #eee' }}
      >
        <div>SHUKUN FLOWS</div>
        <div style={{ flex: 1 }}>Flow Title</div>
        <div>
          <Button type="primary">Deploy</Button>
        </div>
      </div>
    </div>
  );
};
