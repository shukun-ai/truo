import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

export type CreateFormValues = {
  connectorName: string;
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
        connectorName: z
          .string()
          .min(1, { message: '请输入连接器标识符后新建' })
          .max(20, { message: '连接器标识符过长' }),
        // TODO 不允许空格和特殊符号
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
        label="连接器标识符"
        placeholder="Connector Name"
        data-autofocus
        withAsterisk
        description="连接器标识符用于连接器识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('connectorName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
