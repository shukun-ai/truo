import { Box } from '@mantine/core';
import { PresenterTreeNodes } from '@shukun/schema';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useAppContext } from '../../../../../contexts/app-context';

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
  const app = useAppContext();

  const closeCollapse = useCallback(() => {
    app.repositories.presenterRepository.treeRepository.closeTreeCollapse(
      sourceNodeId,
    );
  }, [app.repositories.presenterRepository, sourceNodeId]);

  const openCollapse = useCallback(() => {
    app.repositories.presenterRepository.treeRepository.openTreeCollapse(
      sourceNodeId,
    );
  }, [app.repositories.presenterRepository, sourceNodeId]);

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
