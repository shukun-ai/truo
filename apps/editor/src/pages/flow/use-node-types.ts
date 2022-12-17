import { FlowEvent } from '@shukun/schema';
import { useMemo } from 'react';

import { SourceQueryNode } from './nodes/source-query-node';

export function useNodeTypes() {
  const nodeTypes = useMemo(() => {
    const types: Record<FlowEvent['type'], any> = {
      SourceQuery: SourceQueryNode,
    } as any;
    return types;
  }, []);
  return nodeTypes;
}
