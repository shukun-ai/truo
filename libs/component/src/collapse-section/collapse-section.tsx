import { Box, Collapse, Group, Text } from '@mantine/core';

import { CollapseArrow } from '../collapse-arrow/collapse-arrow';

export type CollapseSectionProps = {
  name: string;
  label: string;
  children: string | JSX.Element | JSX.Element[];
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
  const isSelected = selected === name;

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
          borderBottom: isSelected ? 'solid 1px #eee' : undefined,
          borderColor: '#ccc',
        }}
        px={8}
        py={4}
        onClick={() => onSelect && onSelect(isSelected ? undefined : name)}
      >
        <Group>
          <CollapseArrow open={isSelected} size="0.8rem" />
          <Text fw="bold">{label}</Text>
        </Group>
      </Box>
      <Collapse in={isSelected} sx={{ padding: 8 }}>
        {children}
      </Collapse>
    </Box>
  );
};
