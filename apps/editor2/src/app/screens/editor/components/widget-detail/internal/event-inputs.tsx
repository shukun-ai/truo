import { WidgetSchema } from '@shukun/schema';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';

import { EventInput } from './event-input';
import { SchemaTip } from './schema-tip';

export type EventInputsProps = {
  containerName: string;
  definition: WidgetSchema;
  value: PresenterWidgetEntity['events'];
  onChange: (newValue: PresenterWidgetEntity['events']) => void;
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
            tipSection={
              <SchemaTip
                title="回调数据的格式"
                widgetProperty={widgetProperty}
              />
            }
          />
        ))}
    </>
  );
};
