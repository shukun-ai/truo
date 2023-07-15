import { ConnectorSchema, ConnectorTask } from '@shukun/schema';
import { Edge, Node } from 'reactflow';

export type NodeData = {
  ui: { width: number; height: number };
  taskName: string;
  task: ConnectorTask | null;
};

export type EditorState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
};

export const toEditorState = (connector: ConnectorSchema): EditorState => {
  const state: EditorState = {
    nodes: [...addInternalNode(), ...addNodes(connector)].map((node) => ({
      ...node,
      data: {
        ...node.data,
        label: node?.data?.task?.type ?? 'none',
      },
    })),
    edges: [...addStartEdge(connector), ...addEdges(connector)].map((edge) => ({
      ...edge,
      type: 'smoothstep',
    })),
  };

  return state;
};

const addInternalNode = (): EditorState['nodes'] => {
  return [
    {
      id: '$$__start',
      type: 'start',
      position: { x: 0, y: 0 },
      data: {
        taskName: '开始',
        task: null,
        ui: {
          width: 150,
          height: 50,
        },
      },
    },
    {
      id: '$$__end',
      type: 'end',
      position: { x: 0, y: 0 },
      data: {
        taskName: '结束',
        task: null,
        ui: {
          width: 150,
          height: 50,
        },
      },
    },
  ];
};

const addNodes = (connector: ConnectorSchema): EditorState['nodes'] => {
  return Object.entries(connector.tasks).reduce((total, [taskName, task]) => {
    return [
      ...total,
      {
        id: taskName,
        type: createTaskNode(task),
        position: { x: 0, y: 0 },
        data: {
          taskName,
          task,
          ui: {
            width: 280,
            height: 67,
          },
        },
      },
    ];
  }, [] as EditorState['nodes']);
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
  const label = task.type === 'either' ? '是' : undefined;
  if (task.next) {
    return [
      {
        id: `${taskName}>${task.next}`,
        type: 'next',
        source: taskName,
        target: task.next,
        label,
      },
    ];
  } else {
    return [
      {
        id: `${taskName}>$$__end`,
        type: 'end',
        source: taskName,
        target: '$$__end',
        label,
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
      label: '否',
    },
  ];
};

const createFailEdges = (taskName: string, task: ConnectorTask): Edge[] => {
  return [];
};
