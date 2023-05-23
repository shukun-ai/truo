import {
  ActionIcon,
  Button,
  Menu,
  NativeSelect,
  Select,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconDots, IconPlus, IconTrash } from '@tabler/icons-react';

import { useCallback } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

export type TreeMoreButtonProps = {
  sourceNodeId: string;
};

export const TreeMoreButton = ({ sourceNodeId }: TreeMoreButtonProps) => {
  const app = useAppContext();

  const onSubmit = useCallback<NodeCreateFormProps['onSubmit']>(
    (values) => {
      console.log('values', values);
      app.repositories.presenterRepository.addWidgetIntoSiblingNode(
        values.widgetTag,
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
  onSubmit: (values: { widgetTag: string }) => void;
};

const NodeCreateForm = ({ onSubmit }: NodeCreateFormProps) => {
  const form = useForm({
    initialValues: {
      widgetTag: '',
    },
    validate: {
      widgetTag: (value) => {
        if (!value) {
          return '请选择新建组件的类型';
        } else {
          return null;
        }
      },
    },
  });

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
        data={[
          { value: 'react', label: 'React' },
          { value: 'ng', label: 'Angular' },
          { value: 'svelte', label: 'Svelte' },
          { value: 'vue', label: 'Vue' },
        ]}
        withAsterisk
        {...form.getInputProps('widgetTag')}
      />
      <Button type="submit" fullWidth mt="md">
        新建
      </Button>
    </form>
  );
};
