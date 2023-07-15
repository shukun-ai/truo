import { Box, Flex, useMantineTheme } from '@mantine/core';

import { ReactNode } from 'react';
import { NodeProps } from 'reactflow';

import { useConnectorEditorContext } from '../connector-editor-context';
import { NodeData } from '../helpers/data-transfer';

export type CardProps = NodeProps<NodeData> & {
  label: ReactNode;
  more?: ReactNode;
};

export const Card = ({ data, more, label }: CardProps) => {
  const theme = useMantineTheme();
  const { selectedTaskName, setSelectedTaskName } = useConnectorEditorContext();

  return (
    <Box
      sx={{
        width: data.ui.width,
        height: data.ui.height,
        border: '0.0625rem solid #dee2e6',
        borderColor:
          selectedTaskName === data.taskName && selectedTaskName !== null
            ? theme.colors.blue[5]
            : undefined,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fff',
        cursor: data.taskName !== null ? 'pointer' : 'default',
      }}
      onClick={() => {
        data.taskName && setSelectedTaskName(data.taskName);
      }}
    >
      <Flex justify="space-between">
        {label}
        {more}
      </Flex>
    </Box>
  );
};
