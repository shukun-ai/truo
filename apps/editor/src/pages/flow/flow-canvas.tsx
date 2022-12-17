import React, { FunctionComponent, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  ConnectionLineType,
  useReactFlow,
  Controls,
  MiniMap,
} from 'reactflow';

import { calculateLayout } from './flow-layout';
import { useGenerateElement } from './use-generate-elements';
import { useNodeTypes } from './use-node-types';

export interface FlowCanvasProps {}

export const FlowCanvas: FunctionComponent<FlowCanvasProps> = () => {
  const reactFlowInstance = useReactFlow();

  const elements = useGenerateElement();

  const { nodes, edges } = useMemo(() => {
    return calculateLayout(elements.nodes, elements.edges);
  }, [elements.edges, elements.nodes]);

  const nodeTypes = useNodeTypes();

  useEffect(() => {
    reactFlowInstance.setCenter(500, 150);
    reactFlowInstance.zoomTo(1);
  }, [reactFlowInstance]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        connectionLineType={ConnectionLineType.SmoothStep}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};
