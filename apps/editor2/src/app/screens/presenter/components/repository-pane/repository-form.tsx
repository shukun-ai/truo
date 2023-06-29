import { Button, Select, SelectItem, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { PresenterRepositoryEntity } from '../../../../../repositories/presenter/repository-ref';
import { useAppContext } from '../../../../contexts/app-context';

export type RepositoryFormValues = {
  repositoryId: string;
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

  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

  const typeOptions = useMemo<SelectItem[]>(() => {
    return Object.entries(repositoryDefinitions).map(([key, definition]) => ({
      value: key,
      label: key,
    }));
  }, [repositoryDefinitions]);

  const form = useForm<RepositoryFormValues>({
    initialValues,
    validate: {
      repositoryId: (value) => {
        return null;
      },
      type: (value) => {
        return null;
      },
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onSubmit(values);
      })}
    >
      <TextInput
        label="数据仓库标识符"
        placeholder="Repository Id"
        data-autofocus
        withAsterisk
        description="数据仓库标识符用于 Repository 识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('repositoryId')}
      />
      <Select
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
