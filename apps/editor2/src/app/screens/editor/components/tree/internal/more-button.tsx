import {
  ActionIcon,
  Button,
  Menu,
  NativeSelect,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconDots, IconPlus, IconTrash } from '@tabler/icons-react';

import { useObservableState } from 'observable-hooks';
import { useCallback, useEffect, useMemo } from 'react';

import { ROOT_NODE_ID } from '../../../../../../repositories/presenter/presenter-store';
import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';
import { useAppContext } from '../../../../../contexts/app-context';

import { RenameMenuItem } from './rename-menu-item';

export type TreeMoreButtonProps = {
  sourceWidgetEntity: PresenterWidgetEntity;
};

export const TreeMoreButton = ({ sourceWidgetEntity }: TreeMoreButtonProps) => {
  const app = useAppContext();

  const onSiblingSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
    (values) => {
      app.repositories.presenterRepository.treeRepository.addWidget(
        'sibling',
        values.widgetTag,
        values.widgetTitle,
        sourceWidgetEntity.id,
      );
    },
    [
      app.repositories.presenterRepository.treeRepository,
      sourceWidgetEntity.id,
    ],
  );

  const handleSiblingCreate = useCallback(() => {
    modals.open({
      title: '新建同级组件',
      children: <NodeCreateForm onSubmit={onSiblingSubmit} />,
    });
  }, [onSiblingSubmit]);

  const onChildSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
    (values) => {
      app.repositories.presenterRepository.treeRepository.addWidget(
        'insert',
        values.widgetTag,
        values.widgetTitle,
        sourceWidgetEntity.id,
      );
    },
    [
      app.repositories.presenterRepository.treeRepository,
      sourceWidgetEntity.id,
    ],
  );

  const handleChildCreate = useCallback(() => {
    modals.open({
      title: '新建子级组件',
      children: <NodeCreateForm onSubmit={onChildSubmit} />,
    });
  }, [onChildSubmit]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {sourceWidgetEntity.widgetName !== ROOT_NODE_ID && (
          <RenameMenuItem widgetEntity={sourceWidgetEntity} />
        )}
        {sourceWidgetEntity.widgetName !== ROOT_NODE_ID && (
          <Menu.Item
            icon={<IconPlus size={14} />}
            onClick={handleSiblingCreate}
          >
            复制组件和属性
          </Menu.Item>
        )}
        {sourceWidgetEntity.widgetName !== ROOT_NODE_ID && (
          <Menu.Item
            icon={<IconPlus size={14} />}
            onClick={handleSiblingCreate}
          >
            新建同级组件
          </Menu.Item>
        )}
        <Menu.Item icon={<IconPlus size={14} />} onClick={handleChildCreate}>
          新建子级组件
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconTrash size={14} />}
          onClick={() => {
            app.repositories.presenterRepository.treeRepository.removeTreeNode(
              sourceWidgetEntity.id,
            );
          }}
        >
          删除
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export type NodeCreateFormProps = {
  onSubmit: (values: { widgetTag: string; widgetTitle: string }) => void;
};

export const NodeCreateForm = ({ onSubmit }: NodeCreateFormProps) => {
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

  const app = useAppContext();

  const widgetDefinitions = useObservableState(
    app.repositories.presenterRepository.widgetDefinitions$,
    {},
  );

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
