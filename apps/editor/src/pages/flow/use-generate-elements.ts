import { FlowEvent } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import { EdgeMarker, MarkerType } from 'reactflow';

import { flowQuery } from '../../services/flow';

import { eventSchemas } from './flow-event-schemas';
import { eventUI } from './flow-event-ui';

import {
  FlowCustomNodeName,
  FlowEdge,
  FlowElements,
  FlowNode,
} from './interface/element';

export const START_NODE_NAME = '$$start$$';
export const END_NODE_NAME = '$$end$$';
export const WRONG_NODE_NAME = '$$wrong$$';

export function useGenerateElement(): FlowElements {
  const flow = useObservableState(flowQuery.activeFlow$);

  const elements: FlowElements = {
    nodes: [],
    edges: [],
  };

  if (!flow) {
    return elements;
  }

  const { startEventName, events } = flow;

  for (const [eventName, event] of Object.entries(events)) {
    const { nodes, edges } = prepareEventElements(eventName, event);

    elements.nodes = [...elements.nodes, ...nodes];
    elements.edges = [...elements.edges, ...edges];
  }

  {
    const { nodes, edges } = prepareFunctionalElements(startEventName);

    elements.nodes = [...elements.nodes, ...nodes];
    elements.edges = [...elements.edges, ...edges];
  }

  // prepareEndElement()
  // prepareWrongElement()

  return elements;
}

function prepareEventElements(
  eventName: string,
  event: FlowEvent,
): FlowElements {
  switch (event.type) {
    case 'Repeat':
    case 'Choice':
    case 'Parallel':
      return { nodes: [], edges: [] };
    default:
      return prepareCommonEventElements(eventName, event);
  }
}

function prepareCommonEventElements(
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
    edge = {
      id: `${eventName}>${END_NODE_NAME}`,
      source: eventName,
      target: END_NODE_NAME,
      markerEnd: createEdgeMarker(),
    };
  }

  return {
    nodes: [node],
    edges: edge ? [edge] : [],
  };
}

function prepareFunctionalElements(startName: string): FlowElements {
  const startNode: FlowNode = {
    id: START_NODE_NAME,
    position: getDefaultPosition(),
    data: {
      label: 'Start',
      eventUI: {
        width: 30,
        height: 30,
        backgroundColor: '#000',
        fontColor: '#fff',
      },
    },
    type: FlowCustomNodeName.FunctionalNode,
  };

  const endNode: FlowNode = {
    id: END_NODE_NAME,
    position: getDefaultPosition(),
    data: {
      label: 'End',
      eventUI: {
        width: 30,
        height: 30,
        backgroundColor: 'green',
        fontColor: '#fff',
      },
    },
    type: FlowCustomNodeName.FunctionalNode,
  };

  const wrongNode: FlowNode = {
    id: WRONG_NODE_NAME,
    position: getDefaultPosition(),
    data: {
      label: 'End',
      eventUI: {
        width: 30,
        height: 30,
        backgroundColor: 'red',
        fontColor: '#fff',
      },
    },
    type: FlowCustomNodeName.FunctionalNode,
  };

  let startEdge: FlowEdge | null = null;

  if (startName) {
    startEdge = {
      id: `${START_NODE_NAME}>${startName}`,
      source: START_NODE_NAME,
      target: startName,
      markerEnd: createEdgeMarker(),
    };
  }

  return {
    nodes: [startNode, endNode, wrongNode],
    edges: startEdge ? [startEdge] : [],
  };
}

function getDefaultPosition() {
  return { x: 0, y: 0 };
}

function createEdgeMarker() {
  const edgeMarker: EdgeMarker = {
    type: MarkerType.ArrowClosed,
    width: 18,
    height: 18,
  };
  return edgeMarker;
}
