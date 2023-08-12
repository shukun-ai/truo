import {
  ActionIcon,
  Button,
  Menu,
  NativeSelect,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { Icon } from '@shukun/component';
import { WidgetSchema } from '@shukun/schema';
import { IconRectangularPrismPlus } from '@tabler/icons-react';

import { useCallback, useEffect, useMemo } from 'react';

import { EditorContextProps, WidgetEntity } from '../../../editor-context';

import { RenameMenuItem } from './rename-menu-item';

export type TreeMoreButtonProps = {
  sourceWidgetEntity: WidgetEntity;
  widgetDefinitions: Record<string, WidgetSchema>;
  rootNodeId: string;
  node: EditorContextProps['dispatch']['node'];
};

export const TreeMoreButton = ({
  sourceWidgetEntity,
  widgetDefinitions,
  rootNodeId,
  node,
}: TreeMoreButtonProps) => {
  const onSiblingSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
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
      children: (
        <NodeCreateForm
          widgetDefinitions={widgetDefinitions}
          onSubmit={onSiblingSubmit}
        />
      ),
    });
  }, [onSiblingSubmit, widgetDefinitions]);

  const onChildSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
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
      children: (
        <NodeCreateForm
          widgetDefinitions={widgetDefinitions}
          onSubmit={onChildSubmit}
        />
      ),
    });
  }, [onChildSubmit, widgetDefinitions]);

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

export type NodeCreateFormProps = {
  widgetDefinitions: Record<string, WidgetSchema>;
  onSubmit: (values: { widgetTag: string; widgetTitle: string }) => void;
};

export const NodeCreateForm = ({
  widgetDefinitions,
  onSubmit,
}: NodeCreateFormProps) => {
  const form = useForm({
    initialValues: {
      widgetTag: '',
      widgetTitle: '',
    },
    validate: {
      widgetTag: (value) => {
        if (!value) {
          return '请选择新建组件的类型';
        } else {
          return null;
        }
      },
      widgetTitle: (value) => (value ? null : '请输入组件显示名'),
    },
  });

  const options = useMemo(() => {
    const options = Object.entries(widgetDefinitions).map(([id]) => ({
      value: id,
      label: id,
    }));
    return [{ value: '', label: '请选择组件' }, ...options];
  }, [widgetDefinitions]);

  useEffect(() => {
    if (!form.values.widgetTitle) {
      form.setFieldValue('widgetTitle', form.values.widgetTag);
    }
    // @remark The form.values.widgetTag is changed, we just give this field a recommend name.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.values.widgetTag]);

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
        modals.closeAll();
      })}
    >
      <NativeSelect
        label="选择组件"
        placeholder="选择组件"
        data={options}
        withAsterisk
        {...form.getInputProps('widgetTag')}
      />
      <TextInput
        label="组件显示名"
        placeholder="Widget title"
        withAsterisk
        {...form.getInputProps('widgetTitle')}
      />
      <Button type="submit" fullWidth mt="md">
        新建组件
      </Button>
    </form>
  );
};
