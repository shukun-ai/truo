import { javascript } from '@codemirror/lang-javascript';
import {
  Alert,
  Box,
  Button,
  Group,
  NativeSelect,
  SelectItem,
} from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { IconInfoCircle } from '@tabler/icons-react';
import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { CodeInput } from '../../../../components/code-input/code-input';
import {
  AppContextProps,
  useAppContext,
} from '../../../../contexts/app-context';

export type EventFormProps = {
  containerName: string;
  event: PresenterEvent;
  onChange: (event: PresenterEvent) => void;
  onCancel: () => void;
};

export const EventForm = ({
  containerName,
  event,
  onChange,
  onCancel,
}: EventFormProps) => {
  const value = event;

  const app = useAppContext();

  const repositories = useObservableState(
    app.repositories.presenterRepository.repositoryRepository.all$,
    [],
  );

  const repositoryDefinitions = useObservableState(
    app.repositories.presenterRepository.repositoryDefinitions$,
    {},
  );

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
    if (value.scope === 'app') {
      return appRepositoryOptions;
    } else if (value.scope === 'container') {
      return containerRepositoryOptions;
    } else {
      return [];
    }
  }, [appRepositoryOptions, containerRepositoryOptions, value.scope]);

  const repositoryActions = useMemo<SelectItem[]>(() => {
    const repositoryType = getRepositoryType(app, containerName, value);
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
  }, [app, containerName, value, repositoryDefinitions]);

  const action = useMemo(() => {
    const repositoryType = getRepositoryType(app, containerName, value);
    if (!repositoryType) {
      return null;
    }
    const definition = repositoryDefinitions[repositoryType];
    if (!definition) {
      return null;
    }
    const action = definition.actions[value.action];
    if (!action) {
      return null;
    }
    return action;
  }, [app, containerName, value, repositoryDefinitions]);

  return (
    <Box>
      <NativeSelect
        data={[
          { value: 'app', label: 'App 应用级' },
          { value: 'container', label: 'Container 容器级' },
        ]}
        label="数据仓库类型"
        withAsterisk
        value={value.scope}
        onChange={(event) => {
          value.scope = event.target.value as 'app' | 'container';
          onChange(value);
        }}
      />
      {value.scope === 'container' &&
      containerRepositoryOptions.length === 0 ? (
        <Alert icon={<IconInfoCircle />} color="orange">
          您当前未创建数据仓库，所以无法选择容器级数据仓库
        </Alert>
      ) : (
        <>
          <Group>
            <NativeSelect
              data={repositoryOptions}
              label="选择数据仓库"
              withAsterisk
              value={value.target}
              onChange={(event) => {
                value.target = event.target.value;
                onChange(value);
              }}
            />
            <NativeSelect
              data={repositoryActions}
              label="选择方法"
              withAsterisk
              value={value.action}
              onChange={(event) => {
                value.action = event.target.value;
                onChange(value);
              }}
            />
          </Group>
          {/* TODO should add PathInput, it's a array inputs */}
          {/* {action?.requiredPath && (
            <CodeInput label="路径"
            value={value.path}
            onChange={(event) => {
              value.path = event.target.value;
              onChange(value);
            }}
             />
          )} */}
          {action?.requiredValue}
          {action?.requiredValue && (
            <CodeInput
              label="参数"
              extensions={[javascript()]}
              value={value.value ?? ''}
              onChange={(newValue) => {
                value.value = newValue;
                onChange(value);
              }}
            />
          )}
        </>
      )}

      <Group mb={12}>
        <Button variant="light" onClick={onCancel}>
          折叠
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
