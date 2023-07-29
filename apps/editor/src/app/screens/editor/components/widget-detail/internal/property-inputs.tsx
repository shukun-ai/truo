import { WidgetSchema } from '@shukun/schema';

import { PresenterWidgetEntity } from '../../../../../../repositories/presenter/widget-ref';

import { SchemaTip } from '../../../../../components/schema-tip/schema-tip';
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
              // @remark update mutable values here for data sync
              value[widgetPropertyId] = newValue as any;
              onChange(value);
            }}
            disabled={false}
            disabledSimpleMode={false}
            disabledJsMode={false}
            tipSection={
              <SchemaTip title="期望的格式" schema={widgetProperty.schema} />
            }
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
