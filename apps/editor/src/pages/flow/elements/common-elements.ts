import { FlowEvent } from '@shukun/schema';

import { flowQuery } from '../../../services/flow';
import { eventSchemas } from '../flow-event-schemas';
import { eventUI } from '../flow-event-ui';
import {
  FlowCustomNodeName,
  FlowEdge,
  FlowElements,
  FlowNode,
} from '../interface/element';

import { END_NODE_NAME, WRONG_NODE_NAME } from './element-constant';
import { createEdgeMarker, getDefaultPosition } from './element-helper';

export function prepareCommonEventElements(
  eventName: string,
  event: FlowEvent,
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
    const flow = flowQuery.getCloneActiveFlow();
    const isExist = flowQuery.existEvent(flow, event.next);

    if (isExist) {
      edge = {
        id: `${eventName}>${event.next}`,
        source: eventName,
        target: event.next,
        markerEnd: createEdgeMarker(),
      };
    } else {
      edge = {
        id: `${eventName}>${WRONG_NODE_NAME}`,
        source: eventName,
        target: WRONG_NODE_NAME,
        markerEnd: createEdgeMarker(),
      };
    }
  } else if (!event.next) {
    // edge = {
    //   id: `${eventName}>${END_NODE_NAME}`,
    //   source: eventName,
    //   target: END_NODE_NAME,
    //   markerEnd: createEdgeMarker(),
    // };
  }

  return {
    nodes: [node],
    edges: edge ? [edge] : [],
  };
}
