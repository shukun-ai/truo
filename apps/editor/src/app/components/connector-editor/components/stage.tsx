import { Box } from '@mantine/core';
import { useMemo } from 'react';
import {
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  ReactFlowProvider,
} from 'reactflow';

import { useEditorContext } from '../context/connector-context';
import { toEditorState } from '../helpers/data-transfer';

import { calculateLayout } from '../helpers/layout-algorithm';

import { AutoFitView } from './auto-fit-view';
import { CustomInternal } from './custom-internal';
import { CustomTask } from './custom-task';

export type StageProps = {
  //
};

export const Stage = () => {
  const { value } = useEditorContext();

  const state = useMemo(() => {
    const clonedData = structuredClone(toEditorState(value));
    return calculateLayout(clonedData);
  }, [value]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ReactFlowProvider>
        <ReactFlow
          nodeTypes={{
            start: CustomInternal,
            resource: CustomTask,
            either: CustomTask,
            parallel: CustomTask,
            repeat: CustomTask,
            fail: CustomTask,
            end: CustomInternal,
          }}
          nodes={state.nodes}
          edges={state.edges}
          defaultEdgeOptions={{
            type: 'straight',
            style: { strokeWidth: 1.5 },
            animated: true,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              width: 12,
              height: 12,
            },
          }}
        >
          <Background />
          <Controls />
          <AutoFitView state={JSON.stringify(state)} />
        </ReactFlow>
      </ReactFlowProvider>
    </Box>
  );
};
