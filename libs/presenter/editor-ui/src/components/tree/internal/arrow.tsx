import { Box } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useCallback } from 'react';

import { NodeEntity, useEditorDispatch } from '../../../editor-context';

export type TreeArrowProps = {
  isOpen: boolean;
  sourceNodeId: string;
  treeNodes: Record<string, NodeEntity>;
};

export const TreeArrow = ({
  isOpen,
  sourceNodeId,
  treeNodes,
}: TreeArrowProps) => {
  const { node } = useEditorDispatch();

  const closeCollapse = useCallback(() => {
    node.closeTreeCollapse(sourceNodeId);
  }, [node, sourceNodeId]);

  const openCollapse = useCallback(() => {
    node.openTreeCollapse(sourceNodeId);
  }, [node, sourceNodeId]);

  if (!treeNodes[sourceNodeId] || treeNodes[sourceNodeId].length === 0) {
    return <Box sx={{ width: 16 }}></Box>;
  }

  return (
    <Box
      onClick={() => {
        isOpen ? closeCollapse() : openCollapse();
      }}
      sx={{ width: 16, cursor: 'pointer' }}
    >
      {isOpen ? (
        <IconChevronDown size="0.9rem" />
      ) : (
        <IconChevronRight size="0.9rem" />
      )}
    </Box>
  );
};
