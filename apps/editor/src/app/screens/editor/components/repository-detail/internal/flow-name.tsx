import { TextInput } from '@mantine/core';
import { RepositoryParameter } from '@shukun/schema';

import { useRepositoryFormContext } from './context';

export type RepositoryFlowNameProps = {
  parameterName: string;
  parameter: RepositoryParameter;
};

export const RepositoryFlowName = ({
  parameterName,
  parameter,
}: RepositoryFlowNameProps) => {
  const form = useRepositoryFormContext();

  return (
    <TextInput
      label={parameterName}
      withAsterisk={parameter.required}
      {...form.getInputProps(parameterName)}
    />
  );
};
