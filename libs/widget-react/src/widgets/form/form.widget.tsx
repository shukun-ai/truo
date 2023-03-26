import { Button, Group, SimpleGrid } from '@mantine/core';
import { formDefinition, FormDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const FormWidget = createWidget<FormDefinitionProps>(
  formDefinition,
  (props) => {
    return (
      <form>
        <SimpleGrid
          breakpoints={[
            {
              minWidth: 'xs',
              cols: 1,
            },
            {
              minWidth: 'sm',
              cols: 2,
            },
            {
              minWidth: 'md',
              cols: 3,
            },
            {
              minWidth: 'lg',
              cols: 4,
            },
            {
              minWidth: 'xl',
              cols: 6,
            },
          ]}
        >
          {props.children}
          <Group>
            <Button type="submit">{props.submitButtonText}</Button>
            <Button type="reset" variant="default">
              {props.resetButtonText}
            </Button>
          </Group>
        </SimpleGrid>
      </form>
    );
  },
);
