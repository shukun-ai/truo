import { Box } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import { useCodeMirror } from './use-code-mirror';
import { useWidgetFormContext } from './widget-context';
import { JS_PREFIX } from './widget-input-prefix';

export type WidgetJsInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetJsInput = ({ propertyId }: WidgetJsInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(propertyId);
  const { ref } = useCodeMirror({
    ...formProps,
    value: formProps.value.substring(JS_PREFIX.length, formProps.value.length),
    onChange: (value) => formProps.onChange(`${JS_PREFIX}${value}`),
  });

  return <Box ref={ref}></Box>;
};
