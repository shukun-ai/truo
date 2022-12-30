import {
  FlowCustomNodeName,
  FlowEdge,
  FlowElements,
  FlowNode,
} from '../interface/element';

import { END_NODE_NAME, START_NODE_NAME } from './element-constant';
import { createEdgeMarker, getDefaultPosition } from './element-helper';

export function prepareFunctionalElements(startName: string): FlowElements {
  const startNode: FlowNode = {
    id: START_NODE_NAME,
    position: getDefaultPosition(),
    data: {
      label: 'Start',
      eventUI: {
        width: 30,
        height: 30,
        backgroundColor: '#4361ee',
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
        backgroundColor: '#e7515a',
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
    nodes: [startNode, endNode],
    edges: startEdge ? [startEdge] : [],
  };
}
