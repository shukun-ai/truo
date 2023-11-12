import { ActionIcon, Box, Group, Menu, ScrollArea, Text } from '@mantine/core';
import { Icon } from '@shukun/component';
import { IconDots, IconTrash } from '@tabler/icons-react';

import { ViewEntity, useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { useListStyles } from '../common/list-style';

import { ViewCreateButton } from './view-create-button';

export const ViewList = () => {
  const { classes, cx } = useListStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, views } = state;

  return (
    <Box className={cx(classes.wrapper)}>
      <Box pl={4} pr={4} mb={8}>
        <ViewCreateButton />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.values(views).map((viewEntity) => (
          <Box
            key={viewEntity.id}
            className={cx(
              classes.button,
              extractTabForeignId(selectedTab, 'view') === viewEntity.id &&
                classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewView(viewEntity.id);
            }}
          >
            <Group>
              <Icon type="activityBarViews" size="1rem" />
              <Text size="sm">{viewEntity.label}</Text>
            </Group>
            <MoreButton viewEntity={viewEntity} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({ viewEntity }: { viewEntity: ViewEntity }) => {
  const { dispatch } = useEditorContext();

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => {
            dispatch.view.remove(viewEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
