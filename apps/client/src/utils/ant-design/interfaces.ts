import { DataNode, EventDataNode } from 'antd/lib/tree';

export type TreeOnSelect = (
  selectedKeys: (string | number)[],
  info: {
    event: 'select';
    selected: boolean;
    node: EventDataNode;
    selectedNodes: DataNode[];
    nativeEvent: MouseEvent;
  },
) => void;
