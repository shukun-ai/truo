import { ConnectorSchema, ConnectorTask } from '@shukun/schema';
import { Edge, Node } from 'reactflow';

export type EditorState = {
  nodes: Node[];
  edges: Edge[];
};

export const toEditorState = (connector: ConnectorSchema): EditorState => {
  const state: EditorState = {
    nodes: [...addInternalNode(), ...addNodes(connector)],
    edges: [...addStartEdge(connector), ...addEdges(connector)],
  };

  return state;
};

const addInternalNode = (): Node[] => {
  return [
    {
      id: '$$__start',
      type: 'start',
      position: { x: 0, y: 0 },
      data: {},
    },
    {
      id: '$$__end',
      type: 'end',
      position: { x: 0, y: 0 },
      data: {},
    },
  ];
};

const addNodes = (connector: ConnectorSchema): Node[] => {
  return Object.entries(connector.tasks).reduce((total, [taskName, task]) => {
    return [
      ...total,
      {
        id: taskName,
        type: createTaskNode(task),
        position: { x: 0, y: 0 },
        data: {
          task,
        },
      },
    ];
  }, [] as Node[]);
};

const createTaskNode = (task: ConnectorTask) => {
  switch (task.type) {
    case 'parallel':
    case 'repeat':
    case 'either':
    case 'fail':
      return task.type;
    default:
      return 'resource';
  }
};

const addStartEdge = (connector: ConnectorSchema): Edge[] => {
  return [
    {
      id: `$$__start>${connector.start}`,
      type: 'start',
      source: '$$__start',
      target: connector.start,
    },
  ];
};

const addEdges = (connector: ConnectorSchema): Edge[] => {
  return Object.entries(connector.tasks).reduce((total, [taskName, task]) => {
    return [
      ...total,
      ...createNextEdges(taskName, task),
      ...createEitherEdges(taskName, task),
      ...createFailEdges(taskName, task),
    ];
  }, [] as Edge[]);
};

const createNextEdges = (taskName: string, task: ConnectorTask): Edge[] => {
  if (task.next) {
    return [
      {
        id: `${taskName}>${task.next}`,
        type: 'next',
        source: taskName,
        target: task.next,
      },
    ];
  } else {
    return [
      {
        id: `${taskName}>$$__end`,
        type: 'end',
        source: taskName,
        target: '$$__end',
      },
    ];
  }
};

const createEitherEdges = (taskName: string, task: ConnectorTask): Edge[] => {
  if (task.type !== 'either') {
    return [];
  }
  const right = task.parameters.right;
  if (typeof right !== 'string') {
    return [];
  }
  return [
    {
      id: `${taskName}>${right}`,
      type: 'eitherRight',
      source: taskName,
      target: right,
    },
  ];
};

const createFailEdges = (taskName: string, task: ConnectorTask): Edge[] => {
  return [];
};
