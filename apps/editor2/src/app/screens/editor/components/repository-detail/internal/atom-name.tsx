import { TextInput } from '@mantine/core';
import { RepositoryParameter } from '@shukun/schema';

import { useRepositoryFormContext } from './context';

export type RepositoryAtomNameProps = {
  parameterName: string;
  parameter: RepositoryParameter;
};

export const RepositoryAtomName = ({
  parameterName,
  parameter,
}: RepositoryAtomNameProps) => {
  const form = useRepositoryFormContext();

  return (
    <TextInput
      label={parameterName}
      withAsterisk={parameter.required}
      {...form.getInputProps(parameterName)}
    />
  );
};
