import { Box, Collapse, Group, Text } from '@mantine/core';
import { Icon } from '@shukun/component';

export type CollapseSectionProps = {
  name: string;
  label: string;
  children: JSX.Element | JSX.Element[];
  selected?: string;
  onSelect?: (name?: string) => void;
  mb?: number;
};

export const CollapseSection = ({
  name,
  label,
  children,
  selected,
  onSelect,
  mb,
}: CollapseSectionProps) => {
  return (
    <Box
      sx={{
        border: 'solid 1px #eee',
        borderColor: '#ccc',
        borderRadius: 4,
        cursor: 'pointer',
      }}
      mb={mb}
    >
      <Box
        sx={{
          borderBottom: selected === name ? 'solid 1px #eee' : undefined,
          borderColor: '#ccc',
        }}
        px={8}
        py={4}
        onClick={() =>
          onSelect && onSelect(selected === name ? undefined : name)
        }
      >
        <Group>
          <Icon type="activityBarViews" size="0.8rem" />
          <Text fw="bold">{label}</Text>
        </Group>
      </Box>
      <Collapse in={selected === name} sx={{ padding: 8 }}>
        {children}
      </Collapse>
    </Box>
  );
};
