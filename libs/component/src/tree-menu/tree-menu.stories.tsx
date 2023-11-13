import { ActionIcon, Box, Menu } from '@mantine/core';
import {
  closeCollapse,
  moveToBeside,
  moveToInside,
  openCollapse,
  removeNode,
  selectOnlyOne,
} from '@shukun/util-functions';
import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { DndProvider } from '../dnd/dnd-provider';

import { Icon } from '../domain-icons/domain-icons';

import { TreeMenu } from './tree-menu';
import {
  TreeMenuCollapses,
  TreeMenuList,
  TreeMenuSelections,
  TreeMenuStructure,
} from './tree-menu-type';

type ExampleListItem = {
  key: string;
  label: string;
  example: string;
};

const TreeMenuExample = () => {
  const list: TreeMenuList<ExampleListItem> = {
    root: {
      key: 'root',
      label: 'root',
      example: 'root',
    },
    L1: {
      key: 'L1',
      label: 'L1',
      example: 'L1',
    },
    'L1-1': {
      key: 'L1-1',
      label: 'L1-1',
      example: 'L1-1',
    },
    L2: {
      key: 'L2',
      label: 'L2',
      example: 'L2',
    },
  };
  const [structure, setStructure] = useState<TreeMenuStructure>({
    root: ['L1', 'L2'],
    L1: ['L1-1'],
  });
  const [collapses, setCollapses] = useState<TreeMenuCollapses>({});
  const [selections, setSelections] = useState<TreeMenuSelections>({});

  return (
    <DndProvider>
      <Box sx={{ width: 240 }}>
        <TreeMenu
          list={list}
          structure={structure}
          collapses={collapses}
          selections={selections}
          rootNodeKey={'root'}
          moreSection={() => (
            <Menu shadow="md" width={200} withinPortal>
              <Menu.Target>
                <ActionIcon variant="transparent">
                  <Icon type="more" size="1rem" />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item color="red" icon={<Icon type="trash" size={14} />}>
                  删除
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
          moveToBeside={(sourceKey, targetKey, position) =>
            setStructure(
              moveToBeside(structure, sourceKey, targetKey, position),
            )
          }
          moveToInside={(sourceKey, targetKey) =>
            setStructure(moveToInside(structure, sourceKey, targetKey))
          }
          removeNode={(sourceKey) =>
            setStructure(removeNode(structure, sourceKey))
          }
          openCollapse={(sourceKey) =>
            setCollapses(openCollapse(collapses, sourceKey))
          }
          closeCollapse={(sourceKey) =>
            setCollapses(closeCollapse(collapses, sourceKey))
          }
          clickNode={(node) => {
            setSelections(selectOnlyOne(selections, node.key));
          }}
        />
      </Box>
    </DndProvider>
  );
};

const meta: Meta<typeof TreeMenuExample> = {
  component: TreeMenuExample,
};

export default meta;

type Story = StoryObj<typeof TreeMenuExample>;

export const Primary: Story = {
  render: () => {
    return <TreeMenuExample />;
  },
};
