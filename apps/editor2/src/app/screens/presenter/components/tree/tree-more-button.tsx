import { ActionIcon, Menu } from '@mantine/core';
import {
  IconDots,
  IconPlus,
  IconSitemap,
  IconTrash,
} from '@tabler/icons-react';

import { useAppContext } from '../../../../contexts/app-context';

export type TreeMoreButtonProps = {
  sourceNodeId: string;
};

export const TreeMoreButton = ({ sourceNodeId }: TreeMoreButtonProps) => {
  const app = useAppContext();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconPlus size={14} />}
          onClick={() => {
            //
          }}
        >
          新建同级组件
        </Menu.Item>
        <Menu.Item
          icon={<IconSitemap size={14} />}
          onClick={() => {
            //
          }}
        >
          新建子组件
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => {
            app.repositories.presenterRepository.removeTreeNode(sourceNodeId);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
