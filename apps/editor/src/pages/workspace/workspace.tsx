import { LegacyFunctionComponent } from '@shukun/component';
import { Button } from 'antd';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent } from 'react';

import { CANVAS_COLOR, HEADER_BORDER_COLOR, HEADER_COLOR } from '../../color';

import { Brand } from '../../components/brand';
import { fileCommand } from '../../services/file';
import { PADDING } from '../flow/flow-constant';
import { ChooseDirectory } from '../welcome/choose-directory';

import { WorkspaceSidebar } from './workspace-sidebar';
import { WorkspaceTabs } from './workspace-tabs';

export interface WorkspaceProps {}

export const Workspace: LegacyFunctionComponent<WorkspaceProps> = ({
  children,
}) => {
  const existEntryHandle = useObservableState(fileCommand.exist$(), false);

  if (!existEntryHandle) {
    return <ChooseDirectory />;
  }

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
          borderColor: HEADER_BORDER_COLOR,
          color: '#fff',
          backgroundColor: HEADER_COLOR,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: HEADER_COLOR,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: PADDING,
            paddingRight: PADDING,
          }}
        >
          <Brand theme="dark" />
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
            borderColor: HEADER_BORDER_COLOR,
            color: '#fff',
            backgroundColor: HEADER_COLOR,
          }}
        >
          <WorkspaceSidebar />
        </div>
        <div style={{ flex: 1, backgroundColor: CANVAS_COLOR }}>{children}</div>
      </div>
    </div>
  );
};

export const SIDEBAR_WIDTH = 50;
