import { Box, Button } from '@mantine/core';

import { append, update } from '@shukun/util-functions';

export type ArrayInputProps<T> = {
  value: T[];
  onChange: (value: T[]) => void;
  onCreate: () => T;
  renderItem: (itemValue: T, onChange: (itemValue: T) => void) => JSX.Element;
};

export const ArrayInputs = <T,>({
  value,
  onChange,
  onCreate,
  renderItem,
}: ArrayInputProps<T>) => {
  return (
    <Box>
      <Box>
        {value.map((item, index) => {
          return renderItem(item, (newValue) => {
            update(value, index, newValue);
          });
        })}
      </Box>
      <Box>
        <Button
          onClick={() => {
            onChange(append(value, onCreate()));
          }}
        >
          新增
        </Button>
      </Box>
    </Box>
  );
};
