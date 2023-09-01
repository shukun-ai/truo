import { Alert, Card } from '@mantine/core';
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
  const parameters = Object.entries(definition.parameters);

  return (
    <Card withBorder>
      {parameters.length === 0 && (
        <Alert title="当前数据仓库暂无配置项">
          您无须为当前数据仓库进行配置，您可以直接在编码模式里使用
        </Alert>
      )}

      {parameters.map(([parameterName, parameter]) => (
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
      ))}
    </Card>
  );
};
