import { FlowEvent } from '@shukun/schema';

import { eventSchemas } from '../flow-event-schemas';
import { eventUI } from '../flow-event-ui';
import {
  FlowCustomNodeName,
  FlowEdge,
  FlowElements,
  FlowNode,
} from '../interface/element';

import { END_NODE_NAME } from './element-constant';
import { createEdgeMarker, getDefaultPosition } from './element-helper';

export function prepareCommonEventElements(
  eventName: string,
  event: FlowEvent,
  subEventNames: string[],
): FlowElements {
  const node: FlowNode = {
    id: eventName,
    position: getDefaultPosition(),
    data: {
      label: eventName,
      eventName,
      event,
      eventSchema: eventSchemas[event.type],
      eventUI: eventUI[event.type],
    },
    type: FlowCustomNodeName.EventNode,
  };

  let edge: FlowEdge | null = null;

  if (typeof event.next === 'string' && event.next) {
    edge = {
      id: `${eventName}>${event.next}`,
      label: createNextLabel(event),
      source: eventName,
      target: event.next,
      markerEnd: createEdgeMarker(),
    };
  } else if (!event.next) {
    if (!subEventNames.includes(eventName)) {
      edge = {
        id: `${eventName}>${END_NODE_NAME}`,
        label: 'End',
        source: eventName,
        target: END_NODE_NAME,
        markerEnd: createEdgeMarker(),
      };
    }
  }

  return {
    nodes: [node],
    edges: edge ? [edge] : [],
  };
}

function createNextLabel(event: FlowEvent): string {
  switch (event.type) {
    case 'Choice':
      return 'Default Next';
    case 'Repeat':
      return 'After Repeat';
    case 'Parallel':
      return 'After All Branches';
    default:
      return 'Next';
  }
}
