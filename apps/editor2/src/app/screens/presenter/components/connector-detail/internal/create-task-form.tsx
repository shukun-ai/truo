import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

export type CreateTaskFormValues = {
  taskName: string;
};

export type CreateTaskFormProps = {
  initialValues?: CreateTaskFormValues;
  onSubmit: (formValue: CreateTaskFormValues) => void;
};

export const CreateTaskForm = ({
  initialValues,
  onSubmit,
}: CreateTaskFormProps) => {
  const form = useForm<CreateTaskFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        taskName: z
          .string()
          .min(1, { message: '请输入任务名称后新建' })
          .max(20, { message: '任务名称过长' }),
        // TODO 不允许空格和特殊符号，建议使用最熟悉的语言
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
        placeholder="Task Name"
        data-autofocus
        withAsterisk
        description="任务名称用于任务识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('taskName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
