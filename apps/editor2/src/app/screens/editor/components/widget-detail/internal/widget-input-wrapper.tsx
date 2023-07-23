import { ActionIcon, Box, Group, Text, Title, Tooltip } from '@mantine/core';
import { CODE_MODE_JS_PREFIX } from '@shukun/presenter/definition';
import { WidgetProperty } from '@shukun/schema';
import { IconBrandJavascript, IconLetterCase } from '@tabler/icons-react';
import { ReactNode, useCallback, useMemo } from 'react';

import {
  composeFormPropertyName,
  useWidgetFormContext,
} from './widget-context';
import { WidgetJsInput } from './widget-js-input';

export type WidgetInputWrapperProps = {
  propertyId: string;
  property: WidgetProperty;
  children: ReactNode;
  disabledSimpleMode?: boolean;
  disabledJsMode?: boolean;
};

export const WidgetInputWrapper = ({
  propertyId,
  property,
  children,
  disabledSimpleMode,
  disabledJsMode,
}: WidgetInputWrapperProps) => {
  const form = useWidgetFormContext();

  const formProps = form.getInputProps(composeFormPropertyName(propertyId));

  const mode = useMemo(() => {
    if (
      formProps.value === null ||
      formProps.value === undefined ||
      typeof formProps.value === 'number' ||
      typeof formProps.value === 'boolean' ||
      typeof formProps.value === 'object'
    ) {
      return 'simple';
    } else if (formProps.value.startsWith(CODE_MODE_JS_PREFIX)) {
      return 'js';
    } else {
      return 'simple';
    }
  }, [formProps.value]);

  const switchMode = useCallback(
    (mode: 'simple' | 'js') => {
      if (mode === 'simple') {
        formProps.onChange(undefined);
      } else if (mode === 'js') {
        formProps.onChange(CODE_MODE_JS_PREFIX);
      }
    },
    [formProps],
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
          <Title order={5}>{property.label}</Title>
          <Text size="xs" c="gray">
            {propertyId}
          </Text>
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
        {mode === 'js' ? (
          <WidgetJsInput propertyId={propertyId} property={property} />
        ) : (
          children
        )}
      </Box>
    </Box>
  );
};
