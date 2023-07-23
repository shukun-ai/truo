import { ActionIcon, Box, Group, Text, Title, Tooltip } from '@mantine/core';
import { CODE_MODE_JS_PREFIX } from '@shukun/presenter/definition';
import { IconBrandJavascript, IconLetterCase } from '@tabler/icons-react';
import { ReactNode, useCallback, useMemo } from 'react';

import { JsInput } from './internal/js-input';

export type WidgetInputWrapperProps = {
  label: string;
  secondaryLabel?: string;
  value: unknown;
  onChange: (newValue: unknown) => void;
  disabled?: boolean;
  children: ReactNode;
  disabledSimpleMode?: boolean;
  disabledJsMode?: boolean;
};

export const WidgetInputWrapper = ({
  label,
  secondaryLabel,
  value,
  onChange,
  disabled,
  children,
  disabledSimpleMode,
  disabledJsMode,
}: WidgetInputWrapperProps) => {
  const mode = useMemo(() => {
    if (typeof value === 'string' && value.startsWith(CODE_MODE_JS_PREFIX)) {
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
        onChange(CODE_MODE_JS_PREFIX);
      }
    },
    [onChange],
  );

  return (
    <Box mb={32}>
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
      <Box>
        {mode === 'js' && typeof value === 'string' ? (
          <JsInput value={value} onChange={onChange} disabled={disabled} />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};
