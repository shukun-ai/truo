import { ActionIcon, Box, Group, Tooltip } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';
import { IconBrandJavascript, IconLetterCase } from '@tabler/icons-react';
import { useCallback, useMemo } from 'react';

import { useWidgetFormContext } from './widget-context';
import { JS_PREFIX } from './widget-input-prefix';
import { WidgetJsInput } from './widget-js-input';

export type WidgetInputWrapperProps = {
  propertyId: string;
  property: WidgetProperty;
  children: JSX.Element;
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

  const formProps = form.getInputProps(propertyId);

  const mode = useMemo(() => {
    if (
      formProps.value === null ||
      formProps.value === undefined ||
      typeof formProps.value === 'number' ||
      typeof formProps.value === 'boolean' ||
      typeof formProps.value === 'object'
    ) {
      return 'simple';
    } else if (formProps.value.startsWith(JS_PREFIX)) {
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
        formProps.onChange(JS_PREFIX);
      }
    },
    [formProps],
  );

  return (
    <Box sx={{ marginBottom: 16 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <Box sx={{ marginRight: 6 }}>
          {property.label} ({propertyId})
        </Box>
        <Box>
          <Group spacing={0}>
            {!disabledSimpleMode && (
              <Tooltip label="使用简单模式输入文本或单选">
                <ActionIcon
                  onClick={() => switchMode('simple')}
                  color="blue"
                  variant={mode === 'simple' ? 'filled' : undefined}
                  size="sm"
                >
                  <IconLetterCase size="1rem" />
                </ActionIcon>
              </Tooltip>
            )}
            {!disabledJsMode && (
              <Tooltip label="使用 JS 模式进行简单编码">
                <ActionIcon
                  onClick={() => switchMode('js')}
                  color="blue"
                  variant={mode === 'js' ? 'filled' : undefined}
                  size="sm"
                >
                  <IconBrandJavascript size="1rem" />
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
