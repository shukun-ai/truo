import { Switch } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';

import {
  composeFormPropertyName,
  useWidgetFormContext,
} from './widget-context';

import { WidgetInputWrapper } from './widget-input-wrapper';

export type WidgetBooleanInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetBooleanInput = ({
  propertyId,
  property,
}: WidgetBooleanInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(composeFormPropertyName(propertyId), {
    type: 'checkbox',
  });

  return (
    <WidgetInputWrapper propertyId={propertyId} property={property}>
      <Switch {...formProps} />
    </WidgetInputWrapper>
  );
};
