import { JsonInput } from '@mantine/core';
import { RepositoryParameter } from '@shukun/schema';

import { useRepositoryFormContext } from './repository-context';

export type RepositoryJsonProps = {
  parameterName: string;
  parameter: RepositoryParameter;
};

export const RepositoryJson = ({
  parameterName,
  parameter,
}: RepositoryJsonProps) => {
  const form = useRepositoryFormContext();

  const inputProps = form.getInputProps(parameterName);

  return (
    <JsonInput
      label={parameterName}
      withAsterisk={parameter.required}
      {...inputProps}
      value={JSON.stringify(inputProps.value)}
      onChange={(json) => {
        try {
          inputProps.onChange(JSON.parse(json));
        } finally {
          console.warn(json);
        }
      }}
    />
  );
};
