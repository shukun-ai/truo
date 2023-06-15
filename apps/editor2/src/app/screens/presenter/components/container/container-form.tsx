import { Button, TextInput } from '@mantine/core';
import { isNotEmpty, useForm } from '@mantine/form';

export type ContainerFormProps = {
  onSubmit: (values: { label: string }) => void;
};

export const ContainerForm = ({ onSubmit }: ContainerFormProps) => {
  const form = useForm({
    initialValues: {
      label: '',
    },
    validate: {
      label: isNotEmpty('请输入容器名称后新建'),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label="容器名称"
        placeholder="Container name"
        data-autofocus
        withAsterisk
        {...form.getInputProps('label')}
      />
      <Button type="submit" fullWidth mt="md">
        新建
      </Button>
    </form>
  );
};
