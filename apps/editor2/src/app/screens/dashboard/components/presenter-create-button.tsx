import { Box, Button, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { useCallback } from 'react';

export type PresenterCreateButtonProps = {
  onSubmit: (values: { text: string }) => void;
};

export const PresenterCreateButton = ({
  onSubmit,
}: PresenterCreateButtonProps) => {
  const open = useCallback(() => {
    modals.open({
      title: '新建应用的名称',
      children: <ContainerCreateForm onSubmit={onSubmit} />,
    });
  }, [onSubmit]);

  return (
    <Group position="apart">
      <Box></Box>
      <Button leftIcon={<IconPlus size="0.9rem" />} size="sm" onClick={open}>
        新建应用
      </Button>
    </Group>
  );
};

const ContainerCreateForm = ({ onSubmit }: PresenterCreateButtonProps) => {
  const form = useForm({
    initialValues: {
      text: '',
    },
    validate: {
      text: (value) => {
        if (!value) {
          return '请输入应用名称后新建';
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
        label="应用标识符"
        placeholder="Presenter name"
        data-autofocus
        {...form.getInputProps('text')}
      />
      <Button type="submit" fullWidth mt="md">
        新建应用
      </Button>
    </form>
  );
};
