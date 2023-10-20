import { PresenterWidget, WidgetSchema } from '@shukun/schema';

import { EditorInputs } from '../../common/editor-inputs';

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
          <EditorInputs
            {...widgetProperty}
            key={widgetPropertyId}
            value={value?.[widgetPropertyId]}
            onChange={(newValue) => {
              onChange({
                ...value,
                [widgetPropertyId]: newValue as any,
              });
            }}
            secondaryLabel={widgetPropertyId}
          />
        ))}
    </>
  );
};
