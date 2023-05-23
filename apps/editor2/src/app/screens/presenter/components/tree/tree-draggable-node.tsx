import { Box, createStyles, useMantineTheme } from '@mantine/core';
import { PresenterTreeNodes } from '@shukun/schema';
import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import { CollapseConfig, LEFT_INDENT_WIDTH, TREE_NODE_TYPE } from './store';
import { TreeArrow } from './tree-arrow';
import { TreeDroppableDivider } from './tree-droppable-divider';
import { TreeDroppableLabel } from './tree-droppable-label';
import { TreeDroppableItem } from './tree-droppable-type';

export const TreeDraggableNode = ({
  treeNodes,
  collapseStore,
  currentNodeName,
  level,
  index,
  activeNodeName,
}: {
  treeNodes: PresenterTreeNodes;
  collapseStore: CollapseConfig;
  currentNodeName: string;
  level: number;
  index: number;
  activeNodeName?: string;
}) => {
  const theme = useMantineTheme();

  const [, drag] = useDrag<TreeDroppableItem>(() => ({
    type: TREE_NODE_TYPE,
    item: { sourceNodeId: currentNodeName },
  }));

  const isOpen = useMemo(() => {
    const collapse = collapseStore[currentNodeName];
    return collapse === false ? false : true;
  }, [collapseStore, currentNodeName]);

  return (
    <Box ref={drag}>
      {index === 0 && (
        <TreeDroppableDivider
          targetNodeId={currentNodeName}
          position="before"
          level={level}
        />
      )}
      <Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: theme.colors.blue[8],
          }}
        >
          <Box style={{ width: LEFT_INDENT_WIDTH * level }}></Box>
          <TreeArrow
            isOpen={isOpen}
            sourceNodeId={currentNodeName}
            treeNodes={treeNodes}
          />
          <Box style={{ flex: 1 }}>
            <TreeDroppableLabel
              targetNodeId={currentNodeName}
              title={currentNodeName}
            />
          </Box>
        </Box>
      </Box>
      {isOpen && (
        <List>
          {treeNodes[currentNodeName]?.map((childNode, index) => (
            <TreeDraggableNode
              key={childNode}
              treeNodes={treeNodes}
              collapseStore={collapseStore}
              activeNodeName={activeNodeName}
              currentNodeName={childNode}
              level={level + 1}
              index={index}
            />
          ))}
        </List>
      )}
      <TreeDroppableDivider
        targetNodeId={currentNodeName}
        position="after"
        level={level}
      />
    </Box>
  );
};

const List = ({ children }: { children: JSX.Element[] }) => {
  return <Box>{children}</Box>;
};

const useStyles = createStyles((theme) => ({
  selected: {
    background: theme.colors.blue[8],
    color: theme.white,
  },
}));
