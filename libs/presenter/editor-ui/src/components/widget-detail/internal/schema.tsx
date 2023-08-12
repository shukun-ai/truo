import { Box } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';

import { PresenterWidget, WidgetSchema } from '@shukun/schema';

import { EventInputs } from './event-inputs';
import { PropertyInputs } from './property-inputs';

export type SchemaProps = {
  form: UseFormReturnType<
    PresenterWidget,
    (values: PresenterWidget) => PresenterWidget
  >;
  definition: WidgetSchema;
};

export const Schema = ({ form, definition }: SchemaProps) => {
  return (
    <Box>
      <PropertyInputs
        definition={definition}
        value={form.values.properties}
        onChange={(newValue) => form.setFieldValue('properties', newValue)}
      />
      <EventInputs
        containerName=""
        definition={definition}
        value={form.values.events}
        onChange={(newValue) => form.setFieldValue('events', newValue)}
      />
    </Box>
  );
};
