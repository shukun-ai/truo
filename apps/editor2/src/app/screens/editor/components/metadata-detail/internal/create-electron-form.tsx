import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { isElectronName } from '@shukun/validator';

import { z } from 'zod';

export type CreateElectronFormValues = {
  electronName: string;
};

export type CreateElectronFormProps = {
  initialValues?: CreateElectronFormValues;
  onSubmit: (formValue: CreateElectronFormValues) => void;
};

export const CreateElectronForm = ({
  initialValues,
  onSubmit,
}: CreateElectronFormProps) => {
  const form = useForm<CreateElectronFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        electronName: z
          .string()
          .min(1)
          .max(20)
          .refine(isElectronName, {
            message: '请使用如下格式：大小写字母、数字，小写开头',
          })
          .refine(
            (value) => !['owner', 'createdAt', 'updatedAt'].includes(value),
            { message: 'owner, createdAt, updatedAt 为保留字段' },
          ),
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
        label="字段名称"
        placeholder="大小写字母、数字，小写开头"
        data-autofocus
        withAsterisk
        description="字段名用于字段识别，请使用如下格式：大小写字母、数字，小写开头"
        {...form.getInputProps('electronName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
