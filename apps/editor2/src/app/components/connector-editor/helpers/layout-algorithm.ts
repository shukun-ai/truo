import dagre from 'dagre';
import { Position } from 'reactflow';

import { EditorState } from './data-transfer';

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

export const calculateLayout = (
  { nodes, edges }: EditorState,
  direction: 'TB' | 'LR' = 'TB',
): EditorState => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction, ranker: 'longest-path' });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: node.data.ui.width,
      height: node.data.ui.height,
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
      x: nodeWithPosition.x - node.data.ui.width / 2,
      y: nodeWithPosition.y - node.data.ui.height / 2,
    };

    return node;
  });

  return { nodes, edges };
};
