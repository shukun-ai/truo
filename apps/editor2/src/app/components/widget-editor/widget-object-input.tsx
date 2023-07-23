import { Alert, Box, Code } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';

export type WidgetObjectInputProps = {
  value: object | undefined;
  onChange: (newValue: object | undefined) => void;
};

export const WidgetObjectInput = ({
  value,
  onChange,
}: WidgetObjectInputProps) => {
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      <Alert icon={<IconInfoCircle size="0.95rem" />}>
        当前为只读模式，请切换至 JS 模式进行编辑
      </Alert>
      {value && <Code block>{JSON.stringify(value, null, 2)}</Code>}
    </Box>
  );
};
