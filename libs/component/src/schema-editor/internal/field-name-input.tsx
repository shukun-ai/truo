import {
  ActionIcon,
  Box,
  Group,
  Text,
  TextInput,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';

import { Icon } from '../../domain-icons/domain-icons';

export type FieldNameInputProps = {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
};

export const FieldNameInput = ({
  value,
  onChange,
  disabled,
}: FieldNameInputProps) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value);
  const theme = useMantineTheme();

  return (
    <Box sx={{ width: 180, height: 30 }}>
      {editing ? (
        <Group spacing={0}>
          <TextInput
            value={input}
            onChange={(event) => setInput(event.target.value)}
            sx={{ flex: 1 }}
          />
          <ActionIcon
            onClick={() => {
              onChange(input);
              setEditing(false);
            }}
            disabled={disabled}
          >
            <Icon type="ok" size="0.75rem" />
          </ActionIcon>
          <ActionIcon onClick={() => setEditing(false)} disabled={disabled}>
            <Icon type="cancel" size="0.75rem" />
          </ActionIcon>
        </Group>
      ) : (
        <Box
          sx={{
            height: '100%',
            border: 'solid 1px rgb(206, 212, 218)',
            borderRadius: theme.defaultRadius,
            display: 'flex',
            padding: '0 12px',
            justifyItems: 'center',
            fontSize: theme.fontSizes.sm,
          }}
        >
          <Group sx={{ width: '100%' }} position="apart">
            <Tooltip label="内置节点无法编辑" disabled={!disabled} withArrow>
              <Text c={disabled ? 'gray.5' : undefined}>{value}</Text>
            </Tooltip>
            {!disabled && (
              <Tooltip label="重命名属性名称" withArrow>
                <ActionIcon onClick={() => setEditing(true)}>
                  <Icon type="edit" size="0.75rem" />
                </ActionIcon>
              </Tooltip>
            )}
          </Group>
        </Box>
      )}
    </Box>
  );
};
