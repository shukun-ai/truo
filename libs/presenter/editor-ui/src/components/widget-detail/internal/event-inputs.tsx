import { Box } from '@mantine/core';
import { PresenterWidget, WidgetSchema } from '@shukun/schema';

import { EventInput } from './event-input';

export type EventInputsProps = {
  containerName: string;
  definition: WidgetSchema;
  value: PresenterWidget['events'];
  onChange: (newValue: PresenterWidget['events']) => void;
};

export const EventInputs = ({
  containerName,
  definition,
  value,
  onChange,
}: EventInputsProps) => {
  return (
    <>
      {Object.entries(definition.properties)
        .filter(([, widgetProperty]) => widgetProperty.isEvent)
        .map(([widgetPropertyId, widgetProperty]) => (
          <EventInput
            key={widgetPropertyId}
            label={widgetProperty.label}
            secondaryLabel={widgetPropertyId}
            containerName={containerName}
            value={value?.[widgetPropertyId] ?? []}
            onChange={(newValue) => {
              // @remark update mutable values here for data sync
              value[widgetPropertyId] = newValue as any;
              onChange(value);
            }}
            tipSection={<Box>暂无提示</Box>}
          />
        ))}
    </>
  );
};
