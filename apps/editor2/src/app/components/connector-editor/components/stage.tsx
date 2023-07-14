import { Box } from '@mantine/core';
import { useMemo } from 'react';
import { Background, Controls, ReactFlow } from 'reactflow';

import { useEditorContext } from '../context/connector-context';
import { toEditorState } from '../helpers/data-transfer';

import { calculateLayout } from '../helpers/layout-algorithm';

import { CustomNodeEither } from './custom-node-either';
import { CustomNodeEnd } from './custom-node-end';
import { CustomNodeResource } from './custom-node-resource';
import { CustomNodeStart } from './custom-node-start';

export type StageProps = {
  //
};

export const Stage = () => {
  const { value } = useEditorContext();

  const state = useMemo(() => {
    return calculateLayout(toEditorState(value));
  }, [value]);

  return (
    <Box sx={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodeTypes={{
          start: CustomNodeStart,
          resource: CustomNodeResource,
          either: CustomNodeEither,
          parallel: CustomNodeResource,
          repeat: CustomNodeResource,
          fail: CustomNodeResource,
          end: CustomNodeEnd,
        }}
        nodes={state.nodes}
        edges={state.edges}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </Box>
  );
};
