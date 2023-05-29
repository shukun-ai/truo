import { Box } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

export type WidgetInputWrapperProps = {
  propertyId: string;
  property: WidgetProperty;
  children: JSX.Element;
};

export const WidgetInputWrapper = ({
  property,
  children,
}: WidgetInputWrapperProps) => {
  return (
    <Box>
      <Box>{property.label}</Box>
      <Box>{children}</Box>
    </Box>
  );
};
