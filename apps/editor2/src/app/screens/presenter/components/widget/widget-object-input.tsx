import { Alert, Box, Code } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import {
  composeFormPropertyName,
  useWidgetFormContext,
} from './widget-context';

import { WidgetInputWrapper } from './widget-input-wrapper';

export type WidgetObjectInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetObjectInput = ({
  propertyId,
  property,
}: WidgetObjectInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(composeFormPropertyName(propertyId));

  return (
    <WidgetInputWrapper propertyId={propertyId} property={property}>
      <Box sx={{ width: '100%', overflow: 'hidden' }}>
        <Alert>暂不支持 JSON 编辑器，请切换至 JS 模式</Alert>
        {formProps.value && (
          <Code block>{JSON.stringify(formProps.value)}</Code>
        )}
      </Box>
    </WidgetInputWrapper>
  );
};
