import { Box } from '@mantine/core';
import { EditorInputs } from '@shukun/component';
import { ConnectorTask } from '@shukun/schema';

import { TaskEntity } from '../../../editor-context';

export type ParametersProps = {
  taskEntity: TaskEntity;
  value: ConnectorTask['parameters'];
  onChange: (value: ConnectorTask['parameters']) => void;
  disabled?: boolean;
};

export const Parameters = ({
  taskEntity,
  value,
  onChange,
  disabled,
}: ParametersProps) => {
  return (
    <Box>
      {Object.entries(taskEntity.parameters).map(
        ([parameterName, parameter]) => (
          <EditorInputs
            editorType={parameter.editorType}
            value={value[parameterName]}
            onChange={(newValue) =>
              onChange({
                ...value,
                [parameterName]: newValue,
              })
            }
            required={parameter.required}
            schema={parameter.schema}
            disabled={disabled}
          />
        ),
      )}
    </Box>
  );
};
