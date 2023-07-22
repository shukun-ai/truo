import { javascript } from '@codemirror/lang-javascript';
import { Box, Button, Group, NativeSelect, SelectItem } from '@mantine/core';
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
  onCancel: () => void;
};

export const EventForm = ({
  containerName,
  event,
  onChange,
  onCancel,
}: EventFormProps) => {
  const app = useAppContext();

  const repositories = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
    [],
  );

  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

  const form = useForm<PresenterEvent>({
    initialValues: event,
    validate: {},
  });

  const appRepositoryOptions = useMemo<SelectItem[]>(() => {
    return Object.entries(repositoryDefinitions)
      .filter(([, definition]) => {
        return definition.scope === 'app';
      })
      .map(([name]) => ({
        label: name,
        value: name,
      }));
  }, [repositoryDefinitions]);

  const containerRepositoryOptions = useMemo<SelectItem[]>(() => {
    return repositories
      .filter((repository) => repository.containerName === containerName)
      .map((repository) => ({
        label: repository.repositoryName,
        value: repository.repositoryName,
      }));
  }, [containerName, repositories]);

  const repositoryOptions = useMemo<SelectItem[]>(() => {
    if (form.values.scope === 'app') {
      return appRepositoryOptions;
    } else if (form.values.scope === 'container') {
      return containerRepositoryOptions;
    } else {
      return [];
    }
  }, [appRepositoryOptions, containerRepositoryOptions, form.values.scope]);

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

  const action = useMemo(() => {
    const repositoryType = getRepositoryType(app, containerName, form.values);
    if (!repositoryType) {
      return null;
    }
    const definition = repositoryDefinitions[repositoryType];
    if (!definition) {
      return null;
    }
    const action = definition.actions[form.values.action];
    if (!action) {
      return null;
    }
    return action;
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
      {action?.requiredPath && <CodeInput label="路径" {...pathInputProps} />}
      {action?.requiredValue && (
        <CodeInput label="参数" extensions={[javascript()]} {...jsInputProps} />
      )}
      <Group sx={{ marginTop: 12 }}>
        <Button
          variant="filled"
          onClick={() => {
            onChange(form.values);
          }}
        >
          保存
        </Button>
        <Button variant="light" onClick={onCancel}>
          取消
        </Button>
      </Group>
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
