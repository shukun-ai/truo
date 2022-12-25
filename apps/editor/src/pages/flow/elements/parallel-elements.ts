import { FlowEventParallel } from '@shukun/schema';

import { FlowEdge, FlowElements } from '../interface/element';

import { createEdgeMarker } from './element-helper';

export function prepareSpecialParallelEventElements(
  eventName: string,
  event: FlowEventParallel,
): FlowElements {
  const edges: FlowEdge[] = event.branches.map((branch, index) => {
    const edge: FlowEdge = {
      id: `${eventName}>${branch.startEventName}`,
      label: `Branch ${index + 1}`,
      source: eventName,
      target: branch.startEventName,
      markerEnd: createEdgeMarker(),
    };
    return edge;
  });

  return {
    nodes: [],
    edges: edges,
  };
}
