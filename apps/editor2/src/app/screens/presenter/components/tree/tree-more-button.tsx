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

import { useCallback, useMemo } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

export type TreeMoreButtonProps = {
  sourceNodeId: string;
};

export const TreeMoreButton = ({ sourceNodeId }: TreeMoreButtonProps) => {
  const app = useAppContext();

  const onSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
    (values) => {
      app.repositories.presenterRepository.addWidgetIntoSiblingNode(
        values.widgetTag,
        values.widgetTitle,
        sourceNodeId,
      );
    },
    [app.repositories.presenterRepository, sourceNodeId],
  );

  const handleCreate = useCallback(() => {
    modals.open({
      title: '新建组件',
      children: <NodeCreateForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon variant="transparent">
          <IconDots size="1rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconPlus size={14} />} onClick={handleCreate}>
          新建同级组件
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

export type NodeCreateFormProps = {
  onSubmit: (values: { widgetTag: string; widgetTitle: string }) => void;
};

const NodeCreateForm = ({ onSubmit }: NodeCreateFormProps) => {
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

  const options = useMemo(() => {
    const options = Object.entries(app.widgetDefinitions).map(([id]) => ({
      value: id,
      label: id,
    }));
    return [{ value: '', label: '请选择组件' }, ...options];
  }, [app.widgetDefinitions]);

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
        新建
      </Button>
    </form>
  );
};
