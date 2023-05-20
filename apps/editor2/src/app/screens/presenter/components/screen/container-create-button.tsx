import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

import { useAppContext } from '../../../../contexts/app-context';

export type ContainerCreateButtonProps = {
  onSubmit: (values: { text: string }) => void;
};

export const ContainerCreateButton = ({
  onSubmit,
}: ContainerCreateButtonProps) => {
  const open = useCallback(() => {
    modals.open({
      title: '新建容器的名称',
      children: <ContainerCreateForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  return (
    <Button
      leftIcon={<IconPlus size="0.9rem" />}
      variant="subtle"
      size="sm"
      onClick={open}
      fullWidth
    >
      新建
    </Button>
  );
};

const ContainerCreateForm = ({ onSubmit }: ContainerCreateButtonProps) => {
  const app = useAppContext();

  const form = useForm({
    initialValues: {
      text: '',
    },
    validate: {
      text: (value) => {
        if (!value) {
          return '请输入容器名称后新建';
        } else if (
          !app.repositories.presenterRepository.isUniqueContainerName(value)
        ) {
          return '您输入的容器名称已经存在';
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
      <TextInput
        label="容器名称"
        placeholder="Container name"
        data-autofocus
        {...form.getInputProps('text')}
      />
      <Button type="submit" fullWidth mt="md">
        新建
      </Button>
    </form>
  );
};
