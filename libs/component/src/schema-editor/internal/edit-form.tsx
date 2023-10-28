import { Button, Text, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

export type EditFormValues = {
  fieldName: string;
};

export type EditFormProps = {
  initialValues?: EditFormValues;
  onSubmit: (values: EditFormValues) => void;
  isUniqueName(fieldName: string): boolean;
};

export const EditForm = ({
  initialValues,
  onSubmit,
  isUniqueName,
}: EditFormProps) => {
  const form = useForm<EditFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        fieldName: z
          .string()
          .min(1)
          .max(20)
          .refine((value) => !isUniqueName(value), {
            message: '字段需要保持唯一',
          }),
        type: z.string(),
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
        label="变量标识符"
        placeholder="建议使用熟悉的自然语言命名方便记忆，如中文"
        data-autofocus
        withAsterisk
        description="变量标识符用于获取简单编程，所以请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        icon={<Text c="black">$.</Text>}
        {...form.getInputProps('fieldName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
