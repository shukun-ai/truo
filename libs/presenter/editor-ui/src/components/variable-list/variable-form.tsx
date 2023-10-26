import { Button, Text, TextInput, Tooltip } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { z } from 'zod';

export type VariableFormValues = {
  variableId: string;
};

export type VariableFormProps = {
  initialValues?: VariableFormValues;
  onSubmit: (values: VariableFormValues) => void;
  isUniqueId(variableId: string): boolean;
};

export const VariableForm = ({
  initialValues,
  onSubmit,
  isUniqueId,
}: VariableFormProps) => {
  const form = useForm<VariableFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        variableId: z
          .string()
          .min(1)
          .max(20)
          .refine((value) => !isUniqueId(value), {
            message: '变量标识符需要保持唯一，建议更换标识符',
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
      <Tooltip label="$. 表示">
        <TextInput
          label="变量标识符"
          placeholder="建议使用熟悉的自然语言命名方便记忆，如中文"
          data-autofocus
          withAsterisk
          description="变量标识符用于获取简单编程，所以请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
          icon={<Text c="black">$.</Text>}
          {...form.getInputProps('variableId')}
        />
      </Tooltip>
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
