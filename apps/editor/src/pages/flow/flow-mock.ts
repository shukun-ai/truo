import { FlowEdge, FlowNode } from './flow-interface';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

export const initialNodes: FlowNode[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'input', width: 172, height: 36 },
    position,
  },
  {
    id: '2',
    data: { label: 'node 2', width: 172, height: 36 },
    position,
  },
  {
    id: '2a',
    data: { label: 'node 2a', width: 172, height: 36 },
    position,
  },
  {
    id: '2b',
    data: { label: 'node 2b', width: 172, height: 36 },
    position,
  },
  {
    id: '2c',
    data: { label: 'node 2c', width: 172, height: 36 },
    position,
  },
  {
    id: '2d',
    data: { label: 'node 2d', width: 172, height: 36 },
    position,
  },
  {
    id: '3',
    data: { label: 'node 3', width: 172, height: 36 },
    position,
  },
];

export const initialEdges: FlowEdge[] = [
  { id: 'e12', source: '1', target: '2', type: edgeType },
  { id: 'e13', source: '1', target: '3', type: edgeType },
  { id: 'e22a', source: '2', target: '2a', type: edgeType },
  { id: 'e22b', source: '2', target: '2b', type: edgeType },
  { id: 'e22c', source: '2', target: '2c', type: edgeType },
  { id: 'e2c2d', source: '2c', target: '2d', type: edgeType },
];
