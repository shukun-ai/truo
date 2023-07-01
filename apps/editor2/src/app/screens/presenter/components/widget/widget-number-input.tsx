import { NumberInput } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';
import { FLOAT_MAX_SCALE } from '@shukun/validator';

import {
  composeFormPropertyName,
  useWidgetFormContext,
} from './widget-context';

import { WidgetInputWrapper } from './widget-input-wrapper';

export type WidgetNumberInputProps = {
  propertyId: string;
  property: WidgetProperty;
  isInteger?: boolean;
};

export const WidgetNumberInput = ({
  propertyId,
  property,
  isInteger,
}: WidgetNumberInputProps) => {
  const form = useWidgetFormContext();
  const formProps = form.getInputProps(composeFormPropertyName(propertyId));

  return (
    <WidgetInputWrapper propertyId={propertyId} property={property}>
      <NumberInput
        precision={isInteger ? undefined : FLOAT_MAX_SCALE}
        {...formProps}
        onChange={(value) => {
          formProps.onChange(value === '' ? undefined : value);
        }}
      />
    </WidgetInputWrapper>
  );
};
