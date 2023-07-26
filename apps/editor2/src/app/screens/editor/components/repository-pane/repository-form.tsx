import { Button, NativeSelect, SelectItem, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { z } from 'zod';

import { PresenterRepositoryEntity } from '../../../../../repositories/presenter/repository-ref';
import { useAppContext } from '../../../../contexts/app-context';

export type RepositoryFormValues = {
  repositoryName: string;
  type: PresenterRepositoryEntity['type'];
};

export type RepositoryFormProps = {
  initialValues?: RepositoryFormValues;
  onSubmit: (values: RepositoryFormValues) => void;
};

export const RepositoryForm = ({
  initialValues,
  onSubmit,
}: RepositoryFormProps) => {
  const app = useAppContext();

  const containerName = useObservableState(
    app.repositories.presenterRepository.selectedContainerEntityId$,
    null,
  );

  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

  const typeOptions = useMemo<SelectItem[]>(() => {
    return Object.entries(repositoryDefinitions)
      .filter(([, definition]) => definition.scope === 'container')
      .map(([key]) => ({
        value: key,
        label: key,
      }));
  }, [repositoryDefinitions]);

  const form = useForm<RepositoryFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        repositoryName: z
          .string()
          .min(1)
          .max(20)
          .refine(
            (value) => {
              if (!containerName) {
                return false;
              }
              if (
                app.repositories.presenterRepository.repositoryRepository.isUniqueRepositoryName(
                  containerName,
                  value,
                )
              ) {
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
        description="数据仓库标识符用于 Repository 识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('repositoryName')}
      />
      <NativeSelect
        label="选择数据仓库类型"
        placeholder="Repository Type"
        data={typeOptions}
        withAsterisk
        {...form.getInputProps('type')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
