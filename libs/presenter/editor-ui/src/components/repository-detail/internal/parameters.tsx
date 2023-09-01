import { Alert, Card, Divider, Title } from '@mantine/core';
import { Icon } from '@shukun/component';
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
    <Card withBorder mb={8}>
      <Title order={4}>配置</Title>
      <Divider mt={8} mb={8} />

      {parameters.length === 0 && (
        <Alert
          icon={<Icon type="info" />}
          title="您无须为当前数据仓库进行配置，您可以直接在编码模式里使用"
          mb={8}
          children={null}
        />
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
