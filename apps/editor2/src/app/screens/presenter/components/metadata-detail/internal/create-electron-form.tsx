import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

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
          .min(1, { message: '请输入任务名称后新建' })
          .max(20, { message: '字段名称过长' }),
        // TODO 与后台一致的验证
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
        label="任务名称"
        placeholder="Electron Name"
        data-autofocus
        withAsterisk
        description="字段名用于字段识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线。"
        {...form.getInputProps('electronName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
