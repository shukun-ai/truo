import { Box } from '@mantine/core';

import { ConnectorSchema } from '@shukun/schema';

import { Basic } from './basic';
import { Tasks } from './tasks';

export type SchemaProps = {
  value: ConnectorSchema;
  onChange: (value: ConnectorSchema) => void;
};

export const Schema = ({ value, onChange }: SchemaProps) => {
  return (
    <Box>
      <Basic value={value} onChange={onChange} disabled={false} />
      <Tasks
        value={value.tasks}
        onChange={(tasks) =>
          onChange({
            ...value,
            tasks,
          })
        }
        disabled={false}
      />
    </Box>
  );
};
