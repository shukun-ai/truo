import { ActionIcon, Box, Group, Menu, ScrollArea, Text } from '@mantine/core';
import {
  IconBuildingWarehouse,
  IconDots,
  IconTrash,
} from '@tabler/icons-react';

import { VariableEntity, useEditorContext } from '../../editor-context';

import { extractTabForeignId } from '../../helpers/extract-tab-foreign-id';

import { useListStyles } from '../common/list-style';

import { VariableCreateButton } from './variable-create-button';

export const VariableList = () => {
  const { classes, cx } = useListStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, variables } = state;

  return (
    <Box className={cx(classes.wrapper)}>
      <Box pl={4} pr={4} mb={8}>
        <VariableCreateButton />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        {Object.values(variables).map((variableEntity) => (
          <Box
            key={variableEntity.id}
            className={cx(
              classes.button,
              extractTabForeignId(selectedTab, 'variable') ===
                variableEntity.id && classes.active,
            )}
            onClick={() => {
              dispatch.tab.previewVariable(variableEntity.id);
            }}
          >
            <Group>
              <IconBuildingWarehouse size="1rem" />
              <Text size="sm">$.{variableEntity.id}</Text>
            </Group>
            <MoreButton variableEntity={variableEntity} />
          </Box>
        ))}
      </ScrollArea>
    </Box>
  );
};

const MoreButton = ({ variableEntity }: { variableEntity: VariableEntity }) => {
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
            dispatch.variable.remove(variableEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
