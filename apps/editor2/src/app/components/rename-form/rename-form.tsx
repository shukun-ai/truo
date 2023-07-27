import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

export type RenameFromValue = {
  label: string;
};

export type RenameFormProps = {
  initialValues: RenameFromValue | undefined;
  onSubmit: (newValue: RenameFromValue) => void;
};

export const RenameForm = ({ initialValues, onSubmit }: RenameFormProps) => {
  const form = useForm<RenameFromValue>({
    initialValues: structuredClone(initialValues),
    validate: zodResolver(
      z.object({
        label: z.string().min(1).max(20),
      }),
    ),
  });

  return (
    <form
      noValidate
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label="重命名"
        data-autofocus
        {...form.getInputProps('label')}
      />
      <Button type="submit" fullWidth mt="md">
        确定
      </Button>
    </form>
  );
};
