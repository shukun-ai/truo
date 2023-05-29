import { Input } from '@mantine/core';
import { WidgetProperty } from '@shukun/schema';
import { useMemo } from 'react';

import { useWidgetFormContext } from './widget-context';

import { JS_PREFIX } from './widget-input-prefix';
import { WidgetInputWrapper } from './widget-input-wrapper';
import { WidgetJsInput } from './widget-js-input';

export type WidgetStringInputProps = {
  propertyId: string;
  property: WidgetProperty;
};

export const WidgetStringInput = ({
  propertyId,
  property,
}: WidgetStringInputProps) => {
  const form = useWidgetFormContext();
  const formProps = useMemo(
    () => form.getInputProps(propertyId),
    [form, propertyId],
  );
  const isCodeMode = useMemo(() => {
    const { value } = formProps;
    return typeof value === 'string' && value.startsWith(JS_PREFIX);
  }, [formProps]);

  return (
    <WidgetInputWrapper propertyId={propertyId} property={property}>
      {isCodeMode ? (
        <WidgetJsInput propertyId={propertyId} property={property} />
      ) : (
        <Input {...formProps} />
      )}
    </WidgetInputWrapper>
  );
};
