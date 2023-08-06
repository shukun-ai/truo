import { Card } from '@mantine/core';
import { PresenterRepository, RepositorySchema } from '@shukun/schema';

import { Parameter } from './parameter';

export type ParametersProps = {
  value: PresenterRepository['parameters'];
  onChange: (newValue: PresenterRepository['parameters']) => void;
  definition: RepositorySchema;
};

export const Parameters = ({
  value,
  onChange,
  definition,
}: ParametersProps) => {
  return (
    <Card withBorder>
      {Object.entries(definition.parameters).map(
        ([parameterName, parameter]) => (
          <Parameter
            key={parameterName}
            value={value[parameterName]}
            onChange={(newValue) => {
              onChange({
                ...value,
                [parameterName]: newValue as any,
              });
            }}
            parameter={parameter}
          />
        ),
      )}
    </Card>
  );
};
