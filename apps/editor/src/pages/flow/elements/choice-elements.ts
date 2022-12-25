import { FlowEventChoice } from '@shukun/schema';

import { FlowEdge, FlowElements } from '../interface/element';

import { createEdgeMarker } from './element-helper';

export function prepareSpecialChoiceEventElements(
  eventName: string,
  event: FlowEventChoice,
): FlowElements {
  const edges: FlowEdge[] = event.conditions.map((condition) => {
    const edge: FlowEdge = {
      id: `${eventName}>${condition.next}`,
      source: eventName,
      target: condition.next,
      markerEnd: createEdgeMarker(),
    };
    return edge;
  });

  return {
    nodes: [],
    edges: edges,
  };
}
