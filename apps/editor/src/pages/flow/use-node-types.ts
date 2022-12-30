import { useMemo } from 'react';

import { FlowCustomNodeName } from './interface/element';

import { EventNode } from './nodes/event-node';
import { FunctionalNode } from './nodes/functional-node';

export function useNodeTypes() {
  const nodeTypes = useMemo(() => {
    const types: Record<FlowCustomNodeName, any> = {
      [FlowCustomNodeName.EventNode]: EventNode,
      [FlowCustomNodeName.FunctionalNode]: FunctionalNode,
    };
    return types;
  }, []);
  return nodeTypes;
}
