import { FlowEvent } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';

import { flowQuery } from '../../services/flow';

import { FlowEdge, FlowElements, FlowNode } from './flow-interface';

export function useGenerateElement(): FlowElements {
  const flow = useObservableState(flowQuery.activeFlow$);

  const elements: FlowElements = {
    nodes: [],
    edges: [],
  };

  if (!flow) {
    return elements;
  }

  const { events } = flow;

  for (const [eventName, event] of Object.entries(events)) {
    const { nodes, edges } = prepareEventElements(eventName, event);

    elements.nodes = [...elements.nodes, ...nodes];
    elements.edges = [...elements.edges, ...edges];
  }

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
    data: { label: eventName, ...getDefaultSize(), eventName, event },
    type: event.type,
  };

  let edge: FlowEdge | null = null;

  if (typeof event.next === 'string' && event.next) {
    edge = {
      id: `${eventName}>${event.next}`,
      source: eventName,
      target: event.next,
    };
  }

  return {
    nodes: [node],
    edges: edge ? [edge] : [],
  };
}

function getDefaultPosition() {
  return { x: 0, y: 0 };
}

function getDefaultSize() {
  return {
    width: 380,
    height: 240,
  };
}
