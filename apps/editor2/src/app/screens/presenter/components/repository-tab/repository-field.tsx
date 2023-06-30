import { Box } from '@mantine/core';

import { PresenterRepositoryEntity } from '../../../../../repositories/presenter/repository-ref';

export type RepositoryFieldProps = {
  parameterName: string;
  parameter: PresenterRepositoryEntity['parameters'][number];
};

export const RepositoryField = ({
  parameterName,
  parameter,
}: RepositoryFieldProps) => {
  return <Box>未配置组件</Box>;
};
