import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { useAppContext } from '../../../../contexts/app-context';

export type ContainerFormValue = {
  containerName: string;
};

export type ContainerFormProps = {
  onSubmit: (values: ContainerFormValue) => void;
};

export const ContainerForm = ({ onSubmit }: ContainerFormProps) => {
  const app = useAppContext();

  const form = useForm<ContainerFormValue>({
    initialValues: {
      containerName: '',
    },
    validate: zodResolver(
      z.object({
        containerName: z
          .string()
          .min(1, { message: '请输入容器名称后新建' })
          .max(20, { message: '容器名称过长' })
          .refine((containerName) => {
            return app.repositories.presenterRepository.containerRepository.isUniqueName(
              containerName,
            );
          }, '该容器名已存在'),
      }),
    ),
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
        {...form.getInputProps('containerName')}
      />
      <Button type="submit" fullWidth mt="md">
        新建
      </Button>
    </form>
  );
};
