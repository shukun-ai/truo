import { LegacyFunctionComponent } from '@shukun/component';
import Color from 'color';
import React, { FunctionComponent, useEffect, useMemo } from 'react';

import {
  ReactFlow,
  ConnectionLineType,
  useReactFlow,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
} from 'reactflow';

import { CANVAS_COLOR } from '../../color';

import { calculateLayout } from './flow-layout';
import { useGenerateElement } from './use-generate-elements';
import { useNodeTypes } from './use-node-types';

export interface FlowCanvasProps {}

export const FlowCanvas: LegacyFunctionComponent<FlowCanvasProps> = () => {
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
        <Controls position="bottom-left" />
        <MiniMap
          position="top-right"
          nodeColor={Color(CANVAS_COLOR).lighten(1).hex()}
          maskColor={Color(CANVAS_COLOR).darken(0.2).hex()}
          style={{
            backgroundColor: CANVAS_COLOR,
            border: '1px solid',
            borderColor: Color(CANVAS_COLOR).darken(0.5).hex(),
          }}
        />
        <Background
          color={Color('#212834').lighten(0.2).hex()}
          variant={BackgroundVariant.Lines}
          gap={40}
        />
      </ReactFlow>
    </div>
  );
};
