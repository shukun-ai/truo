import { useMemo } from 'react';

import { FlowCustomNodeName } from './interface/element';

import { EventNode } from './nodes/event-node';

export function useNodeTypes() {
  const nodeTypes = useMemo(() => {
    const types: Record<FlowCustomNodeName, any> = {
      [FlowCustomNodeName.EventNode]: EventNode,
    };
    return types;
  }, []);
  return nodeTypes;
}
