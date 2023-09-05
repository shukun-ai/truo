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
      <Text size="sm" mb={4}>
        事件表达式 (请使用 JS 编程)
      </Text>
      <Text size="sm" mb={4} c="gray">
        用于执行数据仓库的操作，$.payload 是数据仓库的回调数据
      </Text>
      <JsInput
        value={value ?? ''}
        onChange={(newValue) => onChange(newValue)}
      />
    </Box>
  );
};
