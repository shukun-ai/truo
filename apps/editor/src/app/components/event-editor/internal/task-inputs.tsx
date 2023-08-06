import { javascript } from '@codemirror/lang-javascript';
import {
  ActionIcon,
  Alert,
  Box,
  Group,
  NativeSelect,
  SelectItem,
} from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import {
  IconGripVertical,
  IconInfoCircle,
  IconTrash,
} from '@tabler/icons-react';
import { useMemo } from 'react';

import { ConnectDragSource } from 'react-dnd';

import { IRepositoryRepository } from '../../../../repositories/presenter/repository-repository.interface';
import { CodeInput } from '../../../components/code-input/code-input';

import { useEventContext } from './context';

export type TaskInputsProps = {
  drag: ConnectDragSource;
  value: PresenterEvent;
  onChange: (newValue: PresenterEvent) => void;
  onRemove: () => void;
  disabled?: boolean;
};

export const TaskInputs = ({
  drag,
  value,
  onChange,
  onRemove,
  disabled,
}: TaskInputsProps) => {
  const {
    containerName,
    repositories,
    repositoryDefinitions,
    repositoryRepository,
  } = useEventContext();

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
    const repositoryType = getRepositoryType(
      repositoryRepository,
      containerName,
      value,
    );
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
  }, [repositoryRepository, containerName, value, repositoryDefinitions]);

  const action = useMemo(() => {
    const repositoryType = getRepositoryType(
      repositoryRepository,
      containerName,
      value,
    );
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
  }, [repositoryRepository, containerName, value, repositoryDefinitions]);

  return (
    <Box
      sx={{
        display: 'flex',
        border: 'solid 1px #eee',
        padding: 8,
        alignItems: 'center',
      }}
    >
      {!disabled && (
        <ActionIcon sx={{ cursor: 'move' }} ref={drag}>
          <IconGripVertical size="1rem" />
        </ActionIcon>
      )}
      <Box sx={{ flex: 1 }}>
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
            {action?.enabledValue}
            {action?.enabledValue && (
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
      </Box>
      <ActionIcon
        onClick={() => {
          onRemove();
        }}
        disabled={disabled}
      >
        <IconTrash size="1rem" />
      </ActionIcon>
    </Box>
  );
};

const getRepositoryType = (
  // TODO remove it
  repositoryRepository: IRepositoryRepository,
  containerName: string,
  values: PresenterEvent,
): string | null => {
  if (values.scope === 'app') {
    return values.target;
  }

  const repositoryName = values.target;
  const repository = repositoryRepository.getByRepositoryName(
    containerName,
    repositoryName,
  );
  const repositoryType = repository?.type;
  return repositoryType ?? null;
};
