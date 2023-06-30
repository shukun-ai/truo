import { Alert, Box, Code } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import { useWidgetFormContext } from './widget-context';

import { WidgetInputWrapper } from './widget-input-wrapper';

export type WidgetEventInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetEventInput = ({
  propertyId,
  property,
}: WidgetEventInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(propertyId);

  return (
    // <WidgetInputWrapper propertyId={propertyId} property={property}>
    //   <Box sx={{ width: '100%', overflow: 'hidden' }}>
    //     <Alert>暂不支持 JSON 编辑器，请切换至 JS 模式</Alert>
    //     {formProps.value?.convertor && (
    //       <Code block>{JSON.stringify(formProps.value?.convertor)}</Code>
    //     )}
    //   </Box>
    // </WidgetInputWrapper>
    <Box sx={{ marginBottom: 16 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
        <Box sx={{ marginRight: 6 }}>
          {property.label} ({propertyId})
        </Box>
      </Box>
      <Box>ss</Box>
    </Box>
  );
};
