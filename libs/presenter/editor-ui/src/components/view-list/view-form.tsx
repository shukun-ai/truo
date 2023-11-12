import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

export type ViewFormValues = {
  viewName: string;
};

export type ViewFormProps = {
  initialValues?: ViewFormValues;
  onSubmit: (values: ViewFormValues) => void;
  isUnique(viewName: string): boolean;
};

export const ViewForm = ({
  initialValues,
  onSubmit,
  isUnique,
}: ViewFormProps) => {
  const form = useForm<ViewFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        viewName: z
          .string()
          .min(1)
          .max(20)
          .refine((value) => !isUnique(value), {
            message: '视图标识符需要保持唯一，建议更换标识符',
          }),
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
        label="视图标识符"
        placeholder="建议使用熟悉的自然语言命名方便记忆，如中文"
        data-autofocus
        withAsterisk
        description="视图标识符用于获取简单编程，所以请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('viewName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
