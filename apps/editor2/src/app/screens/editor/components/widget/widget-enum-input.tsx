import { Button } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';
import { useMemo } from 'react';

import {
  composeFormPropertyName,
  useWidgetFormContext,
} from './widget-context';

import { WidgetInputWrapper } from './widget-input-wrapper';

export type WidgetEnumInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetEnumInput = ({
  propertyId,
  property,
}: WidgetEnumInputProps) => {
  const form = useWidgetFormContext();
  const formProps = useMemo(
    () => form.getInputProps(composeFormPropertyName(propertyId)),
    [form, propertyId],
  );

  const options = useMemo(() => {
    const value = (property.schema as any)?.enum;
    const sets: string[] = Array.isArray(value) ? value : [];
    return sets.map((item) => ({
      value: item,
      label: item,
    }));
  }, [property]);

  return (
    <WidgetInputWrapper propertyId={propertyId} property={property}>
      <Button.Group>
        {options.map((option) => (
          <Button
            key={option.value}
            variant={option.value === formProps.value ? 'filled' : 'default'}
            onClick={() => {
              formProps.onChange(option.value);
            }}
          >
            {option.label}
          </Button>
        ))}
      </Button.Group>
    </WidgetInputWrapper>
  );
};
