import { Badge, Box, Button, Group, Text, Title } from '@mantine/core';

import { PresenterEvent } from '@shukun/schema';
import { ReactNode, useCallback, useMemo } from 'react';

import { useEditorContext } from '../../../editor-context';

export type EventInputProps = {
  label: string;
  secondaryLabel?: string;
  containerName: string;
  value: PresenterEvent | undefined;
  onChange: (newValue: PresenterEvent | undefined) => void;
  tipSection?: ReactNode;
};

export const EventInput = ({
  label,
  secondaryLabel,
  containerName,
  value,
  onChange,
  tipSection,
}: EventInputProps) => {
  const { state, dispatch } = useEditorContext();
  const { processes } = state;

  const onCreate = useCallback(() => {
    const processId = dispatch.process.create({
      label: secondaryLabel ?? 'untitle',
      start: 'first',
      tasks: {
        first: {
          type: 'transformer',
          parameters: {},
        },
      },
    });
    onChange({
      process: processId,
      value: '',
    });
  }, [dispatch.process, onChange, secondaryLabel]);

  const onRemove = useCallback(() => {
    onChange(undefined);
    if (value?.process) {
      dispatch.process.remove(value.process);
    }
  }, [dispatch.process, onChange, value]);

  const onView = useCallback(() => {
    if (value?.process) {
      dispatch.tab.previewProcess(value.process);
    }
  }, [dispatch.tab, value]);

  const processLabel = useMemo(() => {
    if (!value) {
      return '';
    }
    const process = processes[value.process];
    if (!process) {
      return '';
    }
    return process.label;
  }, [processes, value]);

  return (
    <Box sx={{ marginBottom: 16 }}>
      <Group mb={12}>
        <Title order={5}>{label}</Title>
        {secondaryLabel && (
          <Text size="xs" c="gray">
            {secondaryLabel}
          </Text>
        )}
      </Group>
      {tipSection}

      <Box>
        <Group spacing={0}>
          {value && (
            <Badge size="lg" color="orange" sx={{ textTransform: 'none' }}>
              {processLabel}
            </Badge>
          )}
          {!value && (
            <Button size="xs" variant="filled" onClick={onCreate}>
              新建事件流程
            </Button>
          )}
          {value && (
            <Button size="xs" variant="subtle" onClick={onView}>
              查看或编辑
            </Button>
          )}
          {value && (
            <Button size="xs" variant="subtle" onClick={onRemove}>
              删除
            </Button>
          )}
        </Group>
      </Box>
    </Box>
  );
};
