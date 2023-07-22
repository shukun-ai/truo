import { TextInput } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import {
  composeFormPropertyName,
  useWidgetFormContext,
} from './widget-context';

import { WidgetInputWrapper } from './widget-input-wrapper';

export type WidgetStringInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetStringInput = ({
  propertyId,
  property,
}: WidgetStringInputProps) => {
  const form = useWidgetFormContext();

  return (
    <WidgetInputWrapper propertyId={propertyId} property={property}>
      <TextInput {...form.getInputProps(composeFormPropertyName(propertyId))} />
    </WidgetInputWrapper>
  );
};
