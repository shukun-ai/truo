import { Text } from '@mantine/core';

import { CellFactoryProps } from '../cell.interface';

export const TextCell = ({ getValue }: CellFactoryProps) => {
  return <Text>{getValue()}</Text>;
};
