import { Box } from '@mantine/core';

import { ConnectorTask } from '@shukun/schema';

import { TaskEntity } from '../../../editor-context';
import { EditorInputs } from '../../common/editor-inputs';

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
            {...parameter}
            key={parameterName}
            value={value[parameterName]}
            onChange={(newValue) => {
              onChange({
                ...value,
                [parameterName]: newValue as any,
              });
            }}
            label={parameterName}
            secondaryLabel={''}
            type={parameter.editorType}
          />
        ),
      )}
    </Box>
  );
};
