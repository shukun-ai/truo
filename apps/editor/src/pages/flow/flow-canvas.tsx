import React, { FunctionComponent, useMemo } from 'react';
import { ReactFlow, ConnectionLineType } from 'reactflow';

import { calculateLayout } from './flow-layout';
import { useGenerateElement } from './use-generate-elements';
import { useNodeTypes } from './use-node-types';

export interface FlowCanvasProps {}

export const FlowCanvas: FunctionComponent<FlowCanvasProps> = () => {
  const elements = useGenerateElement();

  const { nodes, edges } = useMemo(() => {
    return calculateLayout(elements.nodes, elements.edges);
  }, [elements.edges, elements.nodes]);

  const nodeTypes = useNodeTypes();

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      />
    </div>
  );
};
