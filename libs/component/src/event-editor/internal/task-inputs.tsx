import { ActionIcon, Alert, Box, Group, Text } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';

import { useEffect, useMemo, useState } from 'react';
import { ConnectDragSource } from 'react-dnd';

import { Icon } from '../../domain-icons/domain-icons';

import { ActionInput } from './action-input';
import { useEventContext } from './context';
import { PathInput } from './path-input';
import { TargetInput } from './target-input';
import { ValueInput } from './value-input';

export type TaskInputsProps = {
  drag?: ConnectDragSource;
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
  const { noRepositories, repositories, repositoryDefinitions } =
    useEventContext();

  const [targetCache, setTargetCache] = useState<string | null>(null);

  useEffect(() => {
    if (targetCache === null) {
      return;
    }
    if (targetCache === value.target) {
      return;
    }
    onChange({
      ...value,
      action: '',
      path: undefined,
    });
    setTargetCache(value.target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.target, targetCache]);

  const repositoryDefinition = useMemo(() => {
    const { target } = value;
    if (!target) {
      return null;
    }
    const repository = repositories.find(
      (item) => item.repositoryName === target,
    );
    if (!repository) {
      return null;
    }
    const definition = repositoryDefinitions[repository.type];
    if (!definition) {
      return null;
    }
    return definition;
  }, [repositories, repositoryDefinitions, value]);

  const actionDefinition = useMemo(() => {
    const { action } = value;
    if (!action) {
      return null;
    }
    if (!repositoryDefinition) {
      return null;
    }
    const parameter = repositoryDefinition.actions[action];
    if (!parameter) {
      return null;
    }
    return parameter;
  }, [repositoryDefinition, value]);

  return (
    <Box
      sx={{
        display: 'flex',
        border: 'solid 1px #eee',
        padding: 8,
        alignItems: 'center',
      }}
    >
      {!disabled && drag && (
        <ActionIcon sx={{ cursor: 'move' }} ref={drag}>
          <IconGripVertical size="1rem" />
        </ActionIcon>
      )}
      <Box sx={{ flex: 1 }}>
        {noRepositories && (
          <Alert icon={<Icon type="info" />} color="orange">
            您当前未创建数据仓库，所以无法选择数据仓库
          </Alert>
        )}
        <Group mb={8}>
          <TargetInput
            value={value.target}
            onChange={(newValue) => {
              onChange({
                ...value,
                target: newValue,
              });
            }}
          />
          <ActionInput
            value={value.action}
            onChange={(newValue) => {
              onChange({
                ...value,
                action: newValue,
              });
            }}
            target={value.target}
          />
        </Group>
        {actionDefinition?.enabledPath && (
          <PathInput
            value={value.path}
            onChange={(newValue) => {
              onChange({
                ...value,
                path: newValue,
              });
            }}
            target={value.target}
          />
        )}
        {actionDefinition?.enabledValue && (
          <ValueInput
            value={value.value}
            onChange={(newValue) =>
              onChange({
                ...value,
                value: newValue,
              })
            }
          />
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
