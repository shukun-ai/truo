import { Badge, Box, Group, Stack, Text, Title } from '@mantine/core';

import { PresenterRepository, RepositorySchema } from '@shukun/schema';

import { useEditorContext } from '../../../editor-context';

import { Actions } from './actions';
import { Parameters } from './parameters';
import { State } from './state';

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
      <Stack spacing={0} mb={16}>
        <Group align="center" mb={8} spacing={4}>
          <Title order={2}>$.{repositoryId}</Title>
          {/* TODO enable copy button */}
          {/* <ActionIcon>
            <Icon type="copy" size="0.8rem" />
          </ActionIcon> */}
          <Badge size="md" sx={{ textTransform: 'none' }}>
            {value.type}
          </Badge>
        </Group>
        <Text size="sm" c="gray">
          {repositoryDefinitions[value.type].description}
        </Text>
      </Stack>
      <Parameters
        value={value.parameters}
        onChange={(newValue) => onChange({ ...value, parameters: newValue })}
        definition={definition}
      />
      <Actions definition={definition} />
      <State />
    </Box>
  );
};
