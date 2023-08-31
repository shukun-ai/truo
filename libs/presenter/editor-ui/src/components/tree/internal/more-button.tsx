import { ActionIcon, Menu } from '@mantine/core';
import { modals } from '@mantine/modals';
import { Icon, WidgetGallery } from '@shukun/component';
import { WidgetSchema } from '@shukun/schema';
import { IconRectangularPrismPlus } from '@tabler/icons-react';

import { useCallback, useMemo } from 'react';

import { EditorContextProps, WidgetEntity } from '../../../editor-context';

import {
  WidgetCreation,
  WidgetCreationProps,
} from '../../widget-creation/widget-creation';

import { WIDGET_CREATION_MODAL_SIZE } from './constants';
import { RenameMenuItem } from './rename-menu-item';

export type TreeMoreButtonProps = {
  sourceWidgetEntity: WidgetEntity;
  widgetDefinitions: Record<string, WidgetSchema>;
  widgetGallery: WidgetGallery;
  rootNodeId: string;
  node: EditorContextProps['dispatch']['node'];
};

export const TreeMoreButton = ({
  sourceWidgetEntity,
  widgetDefinitions,
  widgetGallery,
  rootNodeId,
  node,
}: TreeMoreButtonProps) => {
  const onSiblingSubmit = useCallback<WidgetCreationProps['onSubmit']>(
    (values) => {
      node.addWidget(
        'sibling',
        values.widgetTag,
        values.widgetTitle,
        sourceWidgetEntity.id,
      );
    },
    [node, sourceWidgetEntity.id],
  );

  const handleSiblingCreate = useCallback(() => {
    modals.open({
      title: '新建同级组件',
      size: WIDGET_CREATION_MODAL_SIZE,
      children: (
        <WidgetCreation
          parentWidgetDefinition={null}
          widgetGallery={widgetGallery}
          widgetDefinitions={widgetDefinitions}
          onSubmit={onSiblingSubmit}
        />
      ),
    });
  }, [onSiblingSubmit, widgetDefinitions, widgetGallery]);

  const onChildSubmit = useCallback<WidgetCreationProps['onSubmit']>(
    (values) => {
      node.addWidget(
        'insert',
        values.widgetTag,
        values.widgetTitle,
        sourceWidgetEntity.id,
      );
    },
    [node, sourceWidgetEntity.id],
  );

  const handleChildCreate = useCallback(() => {
    modals.open({
      title: '新建子级组件',
      size: WIDGET_CREATION_MODAL_SIZE,
      children: (
        <WidgetCreation
          parentWidgetDefinition={widgetDefinitions[sourceWidgetEntity.tag]}
          widgetGallery={widgetGallery}
          widgetDefinitions={widgetDefinitions}
          onSubmit={onChildSubmit}
        />
      ),
    });
  }, [onChildSubmit, sourceWidgetEntity.tag, widgetDefinitions, widgetGallery]);

  const widgetDefinition = useMemo(() => {
    return widgetDefinitions[sourceWidgetEntity.tag];
  }, [sourceWidgetEntity.tag, widgetDefinitions]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <Icon type="more" size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {sourceWidgetEntity.id !== rootNodeId && (
          <RenameMenuItem widgetEntity={sourceWidgetEntity} />
        )}
        {sourceWidgetEntity.id !== rootNodeId && (
          <Menu.Item
            icon={<Icon type="copy" size={14} />}
            onClick={() => {
              node.copyWidget(sourceWidgetEntity, sourceWidgetEntity.id);
            }}
          >
            复制组件和属性
          </Menu.Item>
        )}
        {sourceWidgetEntity.id !== rootNodeId && (
          <Menu.Item
            icon={<Icon type="plus" size={14} />}
            onClick={handleSiblingCreate}
          >
            新建同级组件
          </Menu.Item>
        )}
        {widgetDefinition.allowedChildTags &&
          widgetDefinition.allowedChildTags.length > 0 && (
            <Menu.Item
              icon={<IconRectangularPrismPlus size={14} />}
              onClick={handleChildCreate}
            >
              新建子级组件
            </Menu.Item>
          )}

        <Menu.Item
          color="red"
          icon={<Icon type="trash" size={14} />}
          onClick={() => {
            node.removeTreeNode(sourceWidgetEntity.id);
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
