import React, { FunctionComponent } from 'react';

import { FlowCanvas } from './flow-canvas';

export interface FlowProps {}

export const Flow: FunctionComponent<FlowProps> = () => {
  return (
    <div id="flow-stage" style={{ width: '100%', height: '100%' }}>
      <FlowCanvas />
    </div>
  );
};
