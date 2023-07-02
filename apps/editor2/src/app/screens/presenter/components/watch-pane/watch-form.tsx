import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';

import { useObservableState } from 'observable-hooks';

import { z } from 'zod';

import { useAppContext } from '../../../../contexts/app-context';

export type WatchFormValues = {
  watchName: string;
};

export type WatchFormProps = {
  initialValues?: WatchFormValues;
  onSubmit: (values: WatchFormValues) => void;
};

export const WatchForm = ({ initialValues, onSubmit }: WatchFormProps) => {
  const app = useAppContext();

  const containerName = useObservableState(
    app.repositories.presenterRepository.selectedContainerEntityId$,
    null,
  );

  const form = useForm<WatchFormValues>({
    initialValues,
    validate: zodResolver(
      z.object({
        watchName: z
          .string()
          .min(1, { message: '请输入观察器名称后新建' })
          .max(20, { message: '观察器名称过长' })
          .refine((watchName) => {
            // console.log(containerName, watchName);
            if (!containerName) {
              return true;
            }
            return !app.repositories.presenterRepository.watchRepository.isUniqueWatchName(
              containerName,
              watchName,
            );
          }, '该观察器名已存在'),
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
        label="观察器标识符"
        placeholder="Watch Name"
        data-autofocus
        withAsterisk
        description="观察器标识符用于观察器识别，请使用符合如下格式：字母 a-z、数字 0-9、下划线和中文，推荐使用中文。"
        {...form.getInputProps('watchName')}
      />
      <Button type="submit" fullWidth mt="md">
        保存
      </Button>
    </form>
  );
};
