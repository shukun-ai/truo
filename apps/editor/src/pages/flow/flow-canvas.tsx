import React, { FunctionComponent, useMemo } from 'react';
import { ReactFlow, ConnectionLineType } from 'reactflow';

import { calculateLayout } from './flow-layout';
import { initialEdges, initialNodes } from './flow-mock';

export interface FlowCanvasProps {}

export const FlowCanvas: FunctionComponent<FlowCanvasProps> = () => {
  const { nodes, edges } = useMemo(() => {
    return calculateLayout(initialNodes, initialEdges);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
    </div>
  );
};
