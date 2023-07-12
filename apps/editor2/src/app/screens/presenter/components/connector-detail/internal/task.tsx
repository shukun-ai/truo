import { Box, NativeSelect } from '@mantine/core';
import { ConnectorTask } from '@shukun/schema';

export type TaskProps = {
  value: ConnectorTask;
  onChange: (value: ConnectorTask) => void;
};

export const Task = ({ value, onChange }: TaskProps) => {
  return (
    <Box>
      <NativeSelect
        label="类型"
        data={['transformer', 'parallel']}
        value={value.type}
        onChange={(event) => onChange({ ...value, type: event.target.value })}
        withAsterisk
      />
    </Box>
  );
};
