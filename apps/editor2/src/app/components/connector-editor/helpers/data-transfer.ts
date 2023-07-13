import { ConnectorSchema } from '@shukun/schema';
import { Edge, Node } from 'reactflow';

export type EditorState = {
  nodes: Node[];
  edges: Edge[];
};

export const toEditorState = (connector: ConnectorSchema): EditorState => {
  const state: EditorState = {
    nodes: [],
    edges: [],
  };

  Object.entries(connector.tasks).forEach(([taskName, task]) => {
    const node: Node = {
      id: taskName,
      position: { x: 0, y: 0 },
      data: {
        task,
      },
    };
    state.nodes.push(node);
  });
};
