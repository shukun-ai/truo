import {
  FlowCustomNodeName,
  FlowEdge,
  FlowElements,
  FlowNode,
} from '../interface/element';

import {
  END_NODE_NAME,
  START_NODE_NAME,
  WRONG_NODE_NAME,
} from './element-constant';
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
