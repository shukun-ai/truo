import { Box } from '@mantine/core';
import { IconCaretDownFilled, IconCaretRightFilled } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';

import { useTreeMenuContext } from '../tree-menu-context';
import { TreeMenuKey, TreeMenuStructure } from '../tree-menu-type';

export type TreeArrowProps = {
  isOpen: boolean;
  sourceKey: TreeMenuKey;
  structure: TreeMenuStructure;
};

export const TreeArrow = ({ isOpen, sourceKey, structure }: TreeArrowProps) => {
  const { closeCollapse, openCollapse } = useTreeMenuContext();

  const closeTreeCollapse = useCallback(() => {
    closeCollapse && closeCollapse(sourceKey);
  }, [closeCollapse, sourceKey]);

  const openTreeCollapse = useCallback(() => {
    openCollapse && openCollapse(sourceKey);
  }, [openCollapse, sourceKey]);

  const hasNoChildren = useMemo(() => {
    return !structure[sourceKey] || structure[sourceKey].length === 0;
  }, [sourceKey, structure]);

  if (hasNoChildren) {
    return <Box sx={{ width: 16 }}></Box>;
  }

  return (
    <Box
      onClick={() => {
        isOpen ? closeTreeCollapse() : openTreeCollapse();
      }}
      sx={{ width: 16, cursor: 'pointer', marginTop: -2 }}
    >
      {isOpen ? (
        <IconCaretDownFilled size="0.7rem" />
      ) : (
        <IconCaretRightFilled size="0.7rem" />
      )}
    </Box>
  );
};
