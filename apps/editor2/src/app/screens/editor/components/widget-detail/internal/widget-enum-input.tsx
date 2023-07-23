import { Group, Radio } from '@mantine/core';
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
  const formProps = form.getInputProps(composeFormPropertyName(propertyId));

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
      <Radio.Group {...formProps}>
        <Group mt="xs">
          {options.map((option) => (
            <Radio value={option.value} label={option.label} />
          ))}
        </Group>
      </Radio.Group>
    </WidgetInputWrapper>
  );
};
