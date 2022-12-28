import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import { flowCommand } from '../../services/flow';

import { FlowAction } from './flow-action';

import { FlowCanvas } from './flow-canvas';

export interface FlowProps {}

export const Flow: FunctionComponent<FlowProps> = () => {
  const { flowName } = useParams<{ flowName: string }>();

  useEffect(() => {
    flowCommand.setActive(flowName);
    return () => {
      flowCommand.removeActive(flowName);
    };
  }, [flowName]);

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
