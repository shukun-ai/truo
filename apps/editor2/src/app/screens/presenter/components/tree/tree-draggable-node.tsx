import { Box, Text, createStyles, useMantineTheme } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';
import { useDrag } from 'react-dnd';

import {
  CollapseConfig,
  LEFT_INDENT_WIDTH,
  TreeConfig,
  collapseStore$,
} from './store';
import { TreeDroppableDivider } from './tree-droppable-divider';

export const TreeDraggableNode = ({
  treeConfig,
  collapseStore,
  currentNodeName,
  level,
  index,
  activeNodeName,
}: {
  treeConfig: TreeConfig;
  collapseStore: CollapseConfig;
  currentNodeName: string;
  level: number;
  index: number;
  activeNodeName?: string;
}) => {
  const theme = useMantineTheme();

  const [collected, drag, dragPreview] = useDrag(() => ({
    type: 'ITEM',
    item: { currentNodeName, treeConfig, level },
  }));

  const isOpen = useMemo(() => {
    const collapse = collapseStore[currentNodeName];
    return collapse === false ? false : true;
  }, [collapseStore, currentNodeName]);

  const toggleCollapse = useCallback(() => {
    const collapseStore = collapseStore$.getValue();
    const open = collapseStore[currentNodeName];
    collapseStore$.next({
      ...collapseStore$.getValue(),
      [currentNodeName]: open === false ? true : false,
    });
  }, [currentNodeName]);

  return (
    <Box ref={drag}>
      {index === 0 && (
        <TreeDroppableDivider
          widgetId={currentNodeName}
          position="top"
          level={level}
        />
      )}
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            color: theme.colors.blue[8],
          }}
        >
          <div style={{ width: LEFT_INDENT_WIDTH * level }}></div>
          <div onClick={toggleCollapse}>
            {isOpen ? (
              <IconChevronDown size="0.9rem" />
            ) : (
              <IconChevronRight size="0.9rem" />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <Text size="sm">{currentNodeName}</Text>
          </div>
        </div>
      </div>
      {isOpen && (
        <List>
          {treeConfig[currentNodeName]?.map((childNode, index) => (
            <TreeDraggableNode
              treeConfig={treeConfig}
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
        widgetId={currentNodeName}
        position="bottom"
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
