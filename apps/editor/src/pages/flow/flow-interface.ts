import { FlowEvent } from '@shukun/schema';
import { Edge, Node } from 'reactflow';

export type FlowNode = Node<{
  label: string;
  width: number;
  height: number;
  eventName: string;
  event: FlowEvent;
}>;

export type FlowEdge = Edge<undefined>;

export interface FlowElements {
  nodes: FlowNode[];
  edges: FlowEdge[];
}
