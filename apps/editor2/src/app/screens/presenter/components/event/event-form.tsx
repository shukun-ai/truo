import { javascript } from '@codemirror/lang-javascript';
import { Box, NativeSelect, SelectItem } from '@mantine/core';
import { useForm } from '@mantine/form';
import { PresenterEvent } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { CodeInput } from '../../../../components/code-input/code-input';
import {
  AppContextProps,
  useAppContext,
} from '../../../../contexts/app-context';

import { useJsInputProps } from './use-js-input-props';
import { usePathInputProps } from './use-path-input-props';

export type EventFormProps = {
  containerName: string;
  event: PresenterEvent | undefined;
  onChange: (event: PresenterEvent) => void;
};

export const EventForm = ({ containerName, event }: EventFormProps) => {
  const app = useAppContext();

  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

  const form = useForm<PresenterEvent>({
    initialValues: event,
    validate: {},
  });

  const repositoryOptions = useMemo<SelectItem[]>(() => {
    return Object.entries(repositoryDefinitions)
      .filter(([, definition]) => {
        return definition.scope === form.values.scope;
      })
      .map(([name]) => ({
        label: name,
        value: name,
      }));
  }, [form.values.scope, repositoryDefinitions]);

  const repositoryActions = useMemo<SelectItem[]>(() => {
    const repositoryType = getRepositoryType(app, containerName, form.values);
    if (!repositoryType) {
      return [];
    }
    const definition = repositoryDefinitions[repositoryType];
    if (!definition) {
      return [];
    }
    return Object.entries(definition.actions).map(([actionName]) => {
      return {
        label: actionName,
        value: actionName,
      };
    });
  }, [app, containerName, form.values, repositoryDefinitions]);

  const pathInputProps = usePathInputProps(form.getInputProps('path'));

  const jsInputProps = useJsInputProps(form.getInputProps('value'));

  return (
    <Box>
      <NativeSelect
        data={[
          { value: 'app', label: 'App 应用级' },
          { value: 'container', label: 'Container 容器级' },
        ]}
        label="数据仓库类型"
        {...form.getInputProps('scope')}
        withAsterisk
      />
      <NativeSelect
        data={repositoryOptions}
        label="选择数据仓库"
        {...form.getInputProps('target')}
        withAsterisk
      />
      <NativeSelect
        data={repositoryActions}
        label="选择方法"
        {...form.getInputProps('action')}
        withAsterisk
      />
      <CodeInput label="路径" {...pathInputProps} />
      <CodeInput label="参数" extensions={[javascript()]} {...jsInputProps} />
    </Box>
  );
};

const getRepositoryType = (
  app: AppContextProps,
  containerName: string,
  values: PresenterEvent,
): string | null => {
  if (values.scope === 'app') {
    return values.target;
  }

  const repositoryName = values.target;
  const repository =
    app.repositories.presenterRepository.repositoryRepository.getByRepositoryName(
      containerName,
      repositoryName,
    );
  const repositoryType = repository?.type;
  return repositoryType ?? null;
};
