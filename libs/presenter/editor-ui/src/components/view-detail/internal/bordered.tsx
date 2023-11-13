import { Box } from '@mantine/core';

export type BorderedProps = {
  children: JSX.Element | JSX.Element[];
};

export const Bordered = ({ children }: BorderedProps) => {
  return <Box sx={{}}>{children}</Box>;
};
