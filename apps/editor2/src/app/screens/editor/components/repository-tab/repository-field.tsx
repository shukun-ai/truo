import { Box } from '@mantine/core';

import { RepositoryParameter } from '@shukun/schema';

import { RepositoryAtomName } from './repository-atom-name';
import { RepositoryFlowName } from './repository-flow-name';
import { RepositoryJson } from './repository-json';

export type RepositoryFieldProps = {
  parameterName: string;
  parameter: RepositoryParameter;
};

export const RepositoryField = ({
  parameterName,
  parameter,
}: RepositoryFieldProps) => {
  const { editorType } = parameter;

  if (editorType === 'atomName') {
    return (
      <RepositoryAtomName parameterName={parameterName} parameter={parameter} />
    );
  }

  if (editorType === 'flowName') {
    return (
      <RepositoryFlowName parameterName={parameterName} parameter={parameter} />
    );
  }

  if (editorType === 'jsonSchema') {
    return (
      <RepositoryJson parameterName={parameterName} parameter={parameter} />
    );
  }

  return <Box>未配置组件</Box>;
};
