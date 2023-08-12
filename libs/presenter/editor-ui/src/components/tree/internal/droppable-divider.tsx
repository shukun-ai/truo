import { useMantineTheme } from '@mantine/core';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';

import {
  WidgetEntity,
  useEditorDispatch,
  useEditorState,
} from '../../../editor-context';

import {
  ACTIVE_DROPPABLE_HEIGHT,
  INACTIVE_DROPPABLE_HEIGHT,
  LEFT_INDENT_WIDTH,
  TREE_NODE_TYPE,
  TreeDroppableItem,
} from './constants';

export const TreeDroppableDivider = ({
  targetWidgetEntity,
  position,
  level,
}: {
  targetWidgetEntity: WidgetEntity;
  position: 'before' | 'after';
  level: number;
}) => {
  const { rootNodeId } = useEditorState();

  const { node } = useEditorDispatch();

  const [{ isOver, canDrop }, drop] = useDrop<
    TreeDroppableItem,
    unknown,
    { isOver: boolean; canDrop: boolean }
  >(() => ({
    accept: TREE_NODE_TYPE,
    canDrop: (item) => {
      return (
        item.sourceNodeId !== targetWidgetEntity.id &&
        targetWidgetEntity.id !== rootNodeId
      );
    },
    drop: (item) => {
      const { sourceNodeId } = item;
      node.moveToBeside(sourceNodeId, targetWidgetEntity.id, position);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  const theme = useMantineTheme();

  const style = useMemo(() => {
    if (isOver && canDrop) {
      return {
        flex: 1,
        height: ACTIVE_DROPPABLE_HEIGHT,
        borderRadius: theme.defaultRadius,
        background: theme.colors.blue[8],
      };
    }
    if (canDrop) {
      return { flex: 1, height: INACTIVE_DROPPABLE_HEIGHT };
    }
    return {
      flex: 1,
      height: INACTIVE_DROPPABLE_HEIGHT,
    };
  }, [canDrop, isOver, theme]);

  return (
    <div style={{ display: 'flex' }} ref={drop}>
      <div style={{ width: LEFT_INDENT_WIDTH * level }}></div>
      <div style={style}></div>
    </div>
  );
};
