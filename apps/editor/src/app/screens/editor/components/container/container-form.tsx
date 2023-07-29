import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

import { useAppContext } from '../../../../contexts/app-context';

export type ContainerFormValue = {
  label: string;
};

export type ContainerFormProps = {
  onSubmit: (values: ContainerFormValue) => void;
};

export const ContainerForm = ({ onSubmit }: ContainerFormProps) => {
  const app = useAppContext();

  const form = useForm<ContainerFormValue>({
    initialValues: {
      label: '',
    },
    validate: zodResolver(
      z.object({
        label: z
          .string()
          .min(1)
          .max(20)
          .refine((label) => {
            return app.repositories.presenterRepository.containerRepository.isUniqueLabel(
              label,
            );
          }, '该名称已存在'),
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
        placeholder="建议使用中文便于记忆"
        data-autofocus
        withAsterisk
        {...form.getInputProps('label')}
      />
      <Button type="submit" fullWidth mt="md">
        新建容器
      </Button>
    </form>
  );
};
