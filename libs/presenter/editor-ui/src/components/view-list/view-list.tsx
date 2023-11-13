import { ActionIcon, Box, Menu, ScrollArea } from '@mantine/core';
import {
  TreeMenu,
  TreeMenuCollapses,
  TreeMenuSelections,
} from '@shukun/component';
import { closeCollapse, openCollapse } from '@shukun/util-functions';
import { IconDots, IconTrash } from '@tabler/icons-react';

import { useMemo, useState } from 'react';

import { useEditorContext } from '../../editor-context';

import { useListStyles } from '../common/list-style';

import { useViewStructure } from './internal/use-view-structure';
import { ViewCreateButton } from './view-create-button';

export const ViewList = () => {
  const { classes, cx } = useListStyles();

  const { state, dispatch } = useEditorContext();

  const { selectedTab, views } = state;

  const list = useMemo(() => {
    const list = Object.entries(views).reduce((total, [key, value]) => {
      return {
        ...total,
        [value.id]: {
          key: value.id,
          label: value.label,
        },
      };
    }, {});

    return list;
  }, [views]);

  const structure = useViewStructure(views);
  const [collapses, setCollapses] = useState<TreeMenuCollapses>({});
  const selections: TreeMenuSelections = useMemo(() => {
    if (!selectedTab) {
      return {};
    } else {
      return {
        [selectedTab?.foreignId]: true,
      };
    }
  }, [selectedTab]);

  return (
    <Box className={cx(classes.wrapper)}>
      <Box pl={4} pr={4} mb={8}>
        <ViewCreateButton />
      </Box>
      <ScrollArea sx={{ flex: 1, overflow: 'hidden' }}>
        <TreeMenu
          list={list}
          structure={structure}
          collapses={collapses}
          selections={selections}
          rootNodeKey={'root'}
          moreSection={MoreButton}
          // moveToBeside={(sourceKey, targetKey, position) =>
          //   setStructure(
          //     moveToBeside(structure, sourceKey, targetKey, position),
          //   )
          // }
          // moveToInside={(sourceKey, targetKey) =>
          //   setStructure(moveToInside(structure, sourceKey, targetKey))
          // }
          // removeNode={(sourceKey) =>
          //   setStructure(removeNode(structure, sourceKey))
          // }
          openCollapse={(sourceKey) =>
            setCollapses(openCollapse(collapses, sourceKey))
          }
          closeCollapse={(sourceKey) =>
            setCollapses(closeCollapse(collapses, sourceKey))
          }
          clickNode={(node) => {
            dispatch.tab.previewView(node.key);
          }}
        />
      </ScrollArea>
    </Box>
  );
};

const MoreButton = (props: {
  sourceNode: { key: string; label: string };
  rootNodeKey: string;
}) => {
  const { dispatch } = useEditorContext();

  return (
    <Menu shadow="md" width={200} withinPortal>
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
            dispatch.view.remove(props.sourceNode.key);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
