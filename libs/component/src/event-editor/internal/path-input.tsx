import { Box, Text } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

export type PathInputProps = {
  value: PresenterEvent['path'];
  onChange: (newValue: PresenterEvent['path']) => void;
};

export const PathInput = ({ value, onChange }: PathInputProps) => {
  return (
    <Box>
      <Text>路径</Text>
      <Box>No path</Box>
    </Box>
  );
};
