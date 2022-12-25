import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import { flowCommand } from '../../services/flow';

import { FlowAction } from './flow-action';

import { FlowCanvas } from './flow-canvas';

export interface FlowProps {}

export const Flow: FunctionComponent<FlowProps> = () => {
  const { flowId } = useParams<{ flowId: string }>();

  useEffect(() => {
    flowCommand.setActive(flowId);
    return () => {
      flowCommand.removeActive(flowId);
    };
  }, [flowId]);

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
