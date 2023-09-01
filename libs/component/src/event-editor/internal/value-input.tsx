import { Box, Text } from '@mantine/core';
import { PresenterEvent } from '@shukun/schema';

import { JsInput } from '../../js-input/js-input';

export type ValueInputProps = {
  value: PresenterEvent['value'];
  onChange: (newValue: PresenterEvent['value']) => void;
};

export const ValueInput = ({ value, onChange }: ValueInputProps) => {
  return (
    <Box>
      <Text>值</Text>
      <JsInput
        value={value ?? ''}
        onChange={(newValue) => onChange(newValue)}
      />
    </Box>
  );
};
