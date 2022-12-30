import { FlowEventRepeat } from '@shukun/schema';

import { FlowEdge, FlowElements } from '../interface/element';

import { createEdgeMarker } from './element-helper';

export function prepareSpecialRepeatEventElements(
  eventName: string,
  event: FlowEventRepeat,
): FlowElements {
  let edge: FlowEdge | null = null;

  if (event.startEventName) {
    edge = {
      id: `${eventName}>${event.startEventName}`,
      label: 'Repeat content',
      source: eventName,
      target: event.startEventName,
      markerEnd: createEdgeMarker(),
    };
  }

  return {
    nodes: [],
    edges: edge ? [edge] : [],
  };
}
