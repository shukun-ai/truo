import React, { FunctionComponent, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactFlowProvider } from 'reactflow';

import { flowCommand } from '../../services/flow';

import { FlowAction } from './flow-action';

import { FlowCanvas } from './flow-canvas';
import { EventFormList } from './form/event-form-list';

export interface FlowProps {}

export const Flow: FunctionComponent<FlowProps> = () => {
  const { flowName } = useParams<{ flowName: string }>();

  useEffect(() => {
    if (!flowName) {
      return;
    }
    flowCommand.setActive(flowName);
    return () => {
      flowCommand.removeActive(flowName);
    };
  }, [flowName]);

  return (
    <div
      id="flow-stage"
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        position: 'relative',
      }}
    >
      <div style={{ flex: 1, height: '100%' }}>
        <ReactFlowProvider>
          <FlowCanvas />
        </ReactFlowProvider>
      </div>
      <div style={{ width: 480, height: '100%', backgroundColor: '#3D4454' }}>
        <EventFormList />
      </div>
      <FlowAction />
    </div>
  );
};
