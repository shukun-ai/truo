import { DataNode } from 'antd/lib/tree';
import {
  arrayToTree as baseArrayToTree,
  Item,
  Config,
} from 'performant-array-to-tree';

const defaultConfig = {
  id: 'key',
  parentId: 'parent',
  childrenField: 'children',
  dataField: null,
};

export function arrayToTree<TreeData = DataNode[]>(
  items: TreeData,
  config?: Partial<Config>,
) {
  const output = baseArrayToTree(items as unknown as Item[], {
    ...defaultConfig,
    ...config,
  });
  return output as unknown as TreeData;
}
