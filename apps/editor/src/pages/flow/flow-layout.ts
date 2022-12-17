import dagre from 'dagre';
import { Position } from 'reactflow';

import { FlowEdge, FlowNode } from './flow-interface';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const calculateLayout = (
  nodes: FlowNode[],
  edges: FlowEdge[],
  direction: 'TB' | 'LR' = 'LR',
): { nodes: FlowNode[]; edges: FlowEdge[] } => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.data.width,
      height: node.data.height,
    });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    node.position = {
      x: nodeWithPosition.x - node.data.width / 2,
      y: nodeWithPosition.y - node.data.height / 2,
    };

    return node;
  });

  return { nodes, edges };
};
