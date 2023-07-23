import { Box, Code, Group, Text, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { WidgetProperty } from '@shukun/schema';

import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';

export type SchemaTipProps = {
  title: string;
  widgetProperty: WidgetProperty;
};

export const SchemaTip = ({ title, widgetProperty }: SchemaTipProps) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Box>
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
          background: 'rgba(248, 249, 250, 1)',
          padding: 8,
          borderRadius: 0,
        }}
        onClick={toggle}
      >
        <Group position="apart">
          <Group>
            <Text size="sm" fw="400">
              {title}
            </Text>
            <Text size="xs" c="gray.5">
              JSON Schema
            </Text>
          </Group>
          {opened ? (
            <IconChevronUp size="0.9rem" />
          ) : (
            <IconChevronDown size="0.9rem" />
          )}
        </Group>
      </UnstyledButton>
      {opened && (
        <Box>
          <Code block>{JSON.stringify(widgetProperty.schema, null, 2)}</Code>
        </Box>
      )}
    </Box>
  );
};
