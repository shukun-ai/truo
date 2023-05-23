import { Box } from '@mantine/core';
import { PresenterTreeNodes } from '@shukun/schema';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useCallback } from 'react';

import { collapseStore$ } from './store';

export type TreeArrowProps = {
  isOpen: boolean;
  sourceNodeId: string;
  treeNodes: PresenterTreeNodes;
};

export const TreeArrow = ({
  isOpen,
  sourceNodeId,
  treeNodes,
}: TreeArrowProps) => {
  const toggleCollapse = useCallback(() => {
    const collapseStore = collapseStore$.getValue();
    const open = collapseStore[sourceNodeId];
    collapseStore$.next({
      ...collapseStore$.getValue(),
      [sourceNodeId]: open === false ? true : false,
    });
  }, [sourceNodeId]);

  if (!treeNodes[sourceNodeId] || treeNodes[sourceNodeId].length === 0) {
    return <Box sx={{ width: 16 }}></Box>;
  }

  return (
    <Box onClick={toggleCollapse} sx={{ width: 16, cursor: 'pointer' }}>
      {isOpen ? (
        <IconChevronDown size="0.9rem" />
      ) : (
        <IconChevronRight size="0.9rem" />
      )}
    </Box>
  );
};
