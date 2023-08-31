import { PresenterWidget, WidgetSchema } from '@shukun/schema';

import { PropertyInput } from './property-input';

export type PropertyInputsProps = {
  definition: WidgetSchema;
  value: PresenterWidget['properties'];
  onChange: (newValue: PresenterWidget['properties']) => void;
};

export const PropertyInputs = ({
  definition,
  value,
  onChange,
}: PropertyInputsProps) => {
  return (
    <>
      {Object.entries(definition.properties)
        .filter(([, widgetProperty]) => !widgetProperty.isEvent)
        .map(([widgetPropertyId, widgetProperty]) => (
          <PropertyInput
            key={widgetPropertyId}
            widgetPropertyId={widgetPropertyId}
            widgetProperty={widgetProperty}
            value={value?.[widgetPropertyId]}
            onChange={(newValue) => {
              onChange({
                ...value,
                [widgetPropertyId]: newValue as any,
              });
            }}
          />
        ))}
    </>
  );
};
