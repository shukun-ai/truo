import { ActionIcon, Alert, Box, Group } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';

import { useEffect } from 'react';
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
  const { noRepositories } = useEventContext();

  useEffect(() => {
    if (!value.target) {
      onChange({
        ...value,
        action: '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.target]);

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
            您当前未创建数据仓库，所以无法选择容器级数据仓库
          </Alert>
        )}
        <Group>
          <TargetInput
            value={value.target}
            onChange={(newValue) => {
              onChange({
                ...value,
                target: newValue,
              });
            }}
            scope={value.scope}
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
        <PathInput
          value={value.path}
          onChange={(newValue) => {
            onChange({
              ...value,
              path: newValue,
            });
          }}
        />
        <ValueInput
          value={value.value}
          onChange={(newValue) =>
            onChange({
              ...value,
              value: newValue,
            })
          }
        />
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
