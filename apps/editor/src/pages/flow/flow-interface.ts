import { Edge, Node } from 'reactflow';

export type FlowNode = Node<{
  label: string;
  width: number;
  height: number;
}>;

export type FlowEdge = Edge<undefined>;
