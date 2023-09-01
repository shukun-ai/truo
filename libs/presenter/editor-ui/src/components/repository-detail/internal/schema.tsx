import { Badge, Box, Group, Stack, Text, Title } from '@mantine/core';

import { PresenterRepository, RepositorySchema } from '@shukun/schema';

import { useEditorContext } from '../../../editor-context';

import { Parameters } from './parameters';

export type SchemaProps = {
  repositoryId: string;
  value: PresenterRepository;
  onChange: (newValue: PresenterRepository) => void;
  definition: RepositorySchema;
};

export const Schema = ({
  repositoryId,
  value,
  onChange,
  definition,
}: SchemaProps) => {
  const { state } = useEditorContext();
  const { repositoryDefinitions } = state;

  return (
    <Box>
      <Stack spacing={0} mb={8}>
        <Group align="center">
          <Title order={2}>{value.type}</Title>
          <Badge size="xs">{definition.scope}</Badge>
        </Group>
        <Text size="sm" c="gray">
          {repositoryDefinitions[value.type].description}
        </Text>
      </Stack>
      <Group spacing={2} mb={8}>
        <Text>编程中获取：</Text>
        <Badge size="lg" sx={{ textTransform: 'none' }}>
          $.{repositoryId}
        </Badge>
        {/* TODO enable copy button */}
        {/* <ActionIcon>
          <Icon type="copy" size="0.8rem" />
        </ActionIcon> */}
      </Group>
      <Parameters
        value={value.parameters}
        onChange={(newValue) => onChange({ ...value, parameters: newValue })}
        definition={definition}
      />
    </Box>
  );
};
