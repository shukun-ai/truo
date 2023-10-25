import { ActionIcon, Box, Group, Text, Title, Tooltip } from '@mantine/core';
import { JsInput, useCompletionState } from '@shukun/component';
import { CodeMode } from '@shukun/schema';
import { IconBrandJavascript, IconLetterCase } from '@tabler/icons-react';
import { ReactNode, useCallback, useMemo } from 'react';

import { InputDescription } from '../input-description/input-description';
import { CommonInputProps } from '../types';

export type InputWrapperProps = {
  value: unknown;
  onChange: (newValue: string | undefined) => void;
  children: ReactNode;
  tipSection?: ReactNode;
} & CommonInputProps;

export const InputWrapper = ({
  label,
  secondaryLabel,
  value,
  onChange,
  disabled,
  children,
  disabledSimpleMode,
  disabledJsMode,
  tipSection,
  description,
  logs,
  widgetId,
}: InputWrapperProps) => {
  const mode = useMemo(() => {
    if (typeof value === 'string' && value.startsWith(CodeMode.JS)) {
      return 'js';
    } else {
      return 'simple';
    }
  }, [value]);

  const switchMode = useCallback(
    (mode: 'simple' | 'js') => {
      if (mode === 'simple') {
        onChange(undefined);
      } else if (mode === 'js') {
        onChange(CodeMode.JS);
      }
    },
    [onChange],
  );

  const { state } = useCompletionState(logs, widgetId);

  return (
    <Box mb="lg">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 6,
        }}
      >
        <Group>
          <Title order={5}>{label}</Title>
          {secondaryLabel && (
            <Text size="xs" c="gray">
              {secondaryLabel}
            </Text>
          )}
        </Group>
        <Box>
          <Group spacing={0}>
            {!disabledSimpleMode && (
              <Tooltip label="使用简单模式输入文本或单选">
                <ActionIcon
                  onClick={() => switchMode('simple')}
                  color="gray.4"
                  variant={mode === 'simple' ? 'filled' : undefined}
                  size="xs"
                  w={30}
                  radius="lg"
                >
                  <IconLetterCase size="0.8rem" />
                </ActionIcon>
              </Tooltip>
            )}
            {!disabledJsMode && (
              <Tooltip label="使用 JS 模式进行简单编码">
                <ActionIcon
                  onClick={() => switchMode('js')}
                  color="gray.4"
                  variant={mode === 'js' ? 'filled' : undefined}
                  size="xs"
                  w={30}
                  radius="lg"
                >
                  <IconBrandJavascript size="0.8rem" />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Box>
      </Box>
      {tipSection && mode !== 'simple' && <Box>{tipSection}</Box>}
      <Box>
        {mode === 'js' && typeof value === 'string' ? (
          <JsInput
            value={value}
            onChange={onChange}
            disabled={disabled}
            completionState={state}
          />
        ) : (
          children
        )}
      </Box>
      <InputDescription description={description} />
    </Box>
  );
};
