import { FlowEvent } from '@shukun/schema';
import { Edge, Node } from 'reactflow';

import { EventSchema } from './event-schema';
import { EventUI } from './event-ui';

export type FlowNode = Node<{
  label: string;
  eventName?: string;
  event?: FlowEvent;
  eventSchema?: EventSchema;
  eventUI: EventUI;
}>;

export type FlowEdge = Edge<undefined>;

export interface FlowElements {
  nodes: FlowNode[];
  edges: FlowEdge[];
}

export enum FlowCustomNodeName {
  'EventNode' = 'EventNode',
  'FunctionalNode' = 'FunctionalNode',
}
