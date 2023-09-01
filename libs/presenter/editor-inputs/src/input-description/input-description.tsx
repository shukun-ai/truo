import { Group, Text } from '@mantine/core';
import { Icon } from '@shukun/component';

export type InputDescriptionProps = {
  description?: string;
};

export const InputDescription = ({ description }: InputDescriptionProps) => {
  if (!description) {
    return null;
  }

  return (
    <Group spacing={4} pt={8} pb={8} c="gray">
      <Icon type="info" size="1rem" />
      <Text size="sm" c="gray">
        {description}
      </Text>
    </Group>
  );
};
