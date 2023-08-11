import { Stack, UnstyledButton } from '@mantine/core';
import { IconArrowDown } from '@tabler/icons-react';
import { IconArrowUp } from '@tabler/icons-react';

export type ArrowHandlerProps = {
  index: number;
  onMove: (sourceIndex: number, targetIndex: number) => void;
};

export const ArrowHandler = ({ index, onMove }: ArrowHandlerProps) => {
  return (
    <Stack spacing={0}>
      <UnstyledButton
        onClick={() => {
          //   onChange(move(value, index, index - 1));
          onMove(index, index - 1);
        }}
      >
        <IconArrowUp size="0.75rem" />
      </UnstyledButton>
      <UnstyledButton
        onClick={() => {
          //   onChange(move(value, index, index + 1));
          onMove(index, index + 1);
        }}
      >
        <IconArrowDown size="0.75rem" />
      </UnstyledButton>
    </Stack>
  );
};
