import { WidgetSchema } from '@shukun/schema';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';

import { WidgetInputWrapper } from '../../../../../components/widget-editor/widget-input-wrapper';

import { PropertyInput } from './property-input';

export type PropertyInputsProps = {
  definition: WidgetSchema;
  value: PresenterWidgetEntity['properties'];
  onChange: (newValue: PresenterWidgetEntity['properties']) => void;
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
          <WidgetInputWrapper
            key={widgetPropertyId}
            label={widgetProperty.label}
            secondaryLabel={widgetPropertyId}
            value={value?.[widgetPropertyId]}
            onChange={(newValue) => {
              onChange({
                ...value,
                [widgetPropertyId]: newValue as any,
              });
            }}
            disabled={false}
            disabledSimpleMode={false}
            disabledJsMode={false}
          >
            <PropertyInput
              widgetProperty={widgetProperty}
              value={value?.[widgetPropertyId]}
              onChange={(newValue) => {
                onChange({
                  ...value,
                  [widgetPropertyId]: newValue as any,
                });
              }}
            />
          </WidgetInputWrapper>
        ))}
    </>
  );
};
