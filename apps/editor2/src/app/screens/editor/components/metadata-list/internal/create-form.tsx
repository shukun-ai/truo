import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

export type CreateFormValues = {
  metadataName: string;
};

export type CreateFormProps = {
  initialValues?: CreateFormValues;
  onSubmit: (values: CreateFormValues) => void;
};

export const CreateForm = ({ initialValues, onSubmit }: CreateFormProps) => {
  const form = useForm<CreateFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        metadataName: z
          .string()
          .min(1, { message: '请输入元数据标识符后新建' })
          .max(20, { message: '元数据标识符过长' }),
        // TODO 不允许空格、特殊符号并且符合 engineName 和其他多个校验
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
        label="元数据标识符"
        placeholder="Metadata Name"
        data-autofocus
        withAsterisk
        description="元数据标识符用于元数据识别，仅支持小写字母、数字、下划线，不可以数字或下划线开头，或连续下划线。"
        {...form.getInputProps('metadataName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
