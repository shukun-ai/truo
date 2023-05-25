import { Box, Button, NumberInput, TextInput } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

export type WidgetFieldProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetField = ({ propertyId, property }: WidgetFieldProps) => {
  const schema = property.schema;

  if (typeof schema !== 'object') {
    return <Box>组件定义文件格式不正确</Box>;
  }

  if (schema.type === 'string') {
    return <TextInput label={`${property.label} (${propertyId})`} />;
  }

  if (schema.type === 'integer') {
    return <NumberInput label={`${property.label} (${propertyId})`} />;
  }

  if (schema.type === 'number') {
    return <NumberInput label={`${property.label} (${propertyId})`} />;
  }

  if (schema.type === 'boolean') {
    return <Box>Boolean</Box>;
  }

  if (schema.type === 'array') {
    return <Box>JSON</Box>;
  }

  if (schema.type === 'object') {
    return <Box>JSON</Box>;
  }

  if (schema.type === 'null') {
    return <Box>null</Box>;
  }

  if (schema.enum) {
    return (
      <Button.Group>
        <Button variant="default">First</Button>
        <Button variant="default">Second</Button>
        <Button variant="default">Third</Button>
      </Button.Group>
    );
  }

  return <Box>未配置组件</Box>;
};
