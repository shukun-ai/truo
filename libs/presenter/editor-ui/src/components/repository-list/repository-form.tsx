import { Button, Select, SelectItem, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { RepositorySchema } from '@shukun/schema';
import { useMemo } from 'react';

import { z } from 'zod';

import { RepositoryEntity } from '../../editor-context';

import { TypeItem } from './internal/type-item';

export type RepositoryFormValues = {
  repositoryId: string;
  type: RepositoryEntity['type'];
};

export type RepositoryFormProps = {
  initialValues?: RepositoryFormValues;
  onSubmit: (values: RepositoryFormValues) => void;
  repositoryDefinitions: Record<string, RepositorySchema>;
  isUniqueId(repositoryId: string): boolean;
};

export const RepositoryForm = ({
  initialValues,
  onSubmit,
  repositoryDefinitions,
  isUniqueId,
}: RepositoryFormProps) => {
  const typeOptions = useMemo<SelectItem[]>(() => {
    return Object.entries(repositoryDefinitions)
      .filter(([, definition]) => definition.scope === 'container')
      .map(([key, definition]) => ({
        value: key,
        label: key,
        description: definition.description,
      }));
  }, [repositoryDefinitions]);

  const form = useForm<RepositoryFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        repositoryId: z
          .string()
          .min(1)
          .max(20)
          .refine(
            (value) => {
              if (isUniqueId(value)) {
                return false;
              }
              return true;
            },
            { message: '数据仓库标识符重复，无法创建，请更换名称' },
          ),
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
        label="数据仓库标识符"
        placeholder="建议使用中文命名方便记忆"
        data-autofocus
        withAsterisk
        description="数据仓库标识符用于编写程序，所以请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('repositoryId')}
      />
      <Select
        label="选择数据仓库类型"
        placeholder="Repository Type"
        data={typeOptions}
        itemComponent={TypeItem}
        searchable
        withAsterisk
        withinPortal
        {...form.getInputProps('type')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
