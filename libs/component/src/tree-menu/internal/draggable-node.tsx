import { Box, createStyles } from '@mantine/core';

import { useMemo } from 'react';
import { useDrag } from 'react-dnd';

import { useTreeMenuContext } from '../tree-menu-context';
import {
  TreeMenuCollapses,
  TreeMenuKey,
  TreeMenuList,
  TreeMenuListBase,
  TreeMenuSelections,
  TreeMenuStructure,
} from '../tree-menu-type';

import { TreeArrow } from './arrow';
import {
  LEFT_INDENT_WIDTH,
  TREE_NODE_TYPE,
  TreeDroppableItem,
} from './constants';
import { TreeDroppableDivider } from './droppable-divider';
import { TreeDroppableLabel } from './droppable-label';

export const DraggableNode = <T extends TreeMenuListBase>({
  list,
  structure,
  collapses,
  selections,
  sourceKey,
  level,
  index,
}: {
  list: TreeMenuList<T>;
  structure: TreeMenuStructure;
  collapses: TreeMenuCollapses;
  selections: TreeMenuSelections;
  sourceKey: TreeMenuKey;
  level: number;
  index: number;
}) => {
  const { clickNode, rootNodeKey, moreSection } = useTreeMenuContext();

  const [, drag] = useDrag<TreeDroppableItem>(() => ({
    type: TREE_NODE_TYPE,
    item: { sourceKey },
  }));

  const isOpen = useMemo(() => {
    const collapse = collapses[sourceKey];
    return !collapse;
  }, [collapses, sourceKey]);

  const { classes, cx } = useStyles();

  const sourceNode = useMemo<T | null>(() => {
    const sourceNode = list[sourceKey];
    return sourceNode ? sourceNode : null;
  }, [list, sourceKey]);

  return (
    <Box ref={drag} className={classes.draggableItem}>
      {index === 0 && sourceNode && (
        <TreeDroppableDivider
          targetNode={sourceNode}
          position="before"
          level={level}
        />
      )}
      {sourceNode && (
        <Box
          className={cx(
            classes.nodeItem,
            selections[sourceKey] ? classes.nodeItemActive : null,
          )}
          onClick={() => {
            clickNode && clickNode(sourceNode);
          }}
        >
          <Box style={{ width: LEFT_INDENT_WIDTH * level }}></Box>
          <TreeArrow
            isOpen={isOpen}
            sourceKey={sourceKey}
            structure={structure}
          />
          <Box style={{ flex: 1 }}>
            <TreeDroppableLabel targetNode={sourceNode} />
          </Box>
          <Box sx={{ paddingRight: 0 }}>
            {moreSection && moreSection({ sourceNode, rootNodeKey })}
          </Box>
        </Box>
      )}
      {isOpen && (
        <List>
          {structure[sourceKey]?.map((childNode, index) => (
            <DraggableNode
              key={childNode}
              list={list}
              structure={structure}
              collapses={collapses}
              selections={selections}
              sourceKey={childNode}
              level={level + 1}
              index={index}
            />
          ))}
        </List>
      )}
      {sourceNode && (
        <TreeDroppableDivider
          targetNode={sourceNode}
          position="after"
          level={level}
        />
      )}
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
  draggableItem: {
    cursor: 'pointer',
  },
  nodeItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.colors.blue[9],
    borderRadius: 0,
    flexWrap: 'nowrap',

    '&:hover': {
      background: theme.colors.gray[1],
    },
  },
  nodeItemActive: {
    background: theme.fn.rgba(theme.colors.blue[2], 0.5),

    '&:hover': {
      background: theme.fn.rgba(theme.colors.blue[2], 0.5),
    },
  },
}));
