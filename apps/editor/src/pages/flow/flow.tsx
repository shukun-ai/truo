import React, { FunctionComponent } from 'react';
import { ReactFlowProvider } from 'reactflow';

import { FlowAction } from './flow-action';

import { FlowCanvas } from './flow-canvas';
import { FlowEditingModal } from './flow-editing-modal';

export interface FlowProps {}

export const Flow: FunctionComponent<FlowProps> = () => {
  return (
    <div
      id="flow-stage"
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
      <FlowAction />
    </div>
  );
};
