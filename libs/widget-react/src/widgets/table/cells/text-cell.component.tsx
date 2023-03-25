import { CellFactoryProps } from '../cell.interface';

export const TextCell = ({ getValue }: CellFactoryProps) => {
  return <div>{getValue()}</div>;
};
