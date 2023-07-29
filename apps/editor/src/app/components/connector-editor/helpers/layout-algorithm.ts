import dagre from 'dagre';

import { EditorState } from './data-transfer';

export const calculateLayout = (
  { nodes, edges }: EditorState,
  direction: 'TB' | 'LR' = 'TB',
): EditorState => {
  const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

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

    const newX = nodeWithPosition.x - node.data.ui.width / 2;
    const newY = nodeWithPosition.y - node.data.ui.height / 2;

    node.position = {
      x: newX,
      y: newY,
    };

    return node;
  });

  return { nodes, edges };
};
