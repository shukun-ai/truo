import { Button, Group, SimpleGrid } from '@mantine/core';
import { formDefinition, FormDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';

export const FormWidget = createWidget<FormDefinitionProps>(
  formDefinition,
  (props) => {
    return (
      <form>
        <SimpleGrid
          cols={props.columns}
          spacing={props.horizontalSpacing}
          verticalSpacing={props.verticalSpacing}
        >
          {props.children}
          <Group>
            <Button type="submit">{props.submitButtonText}</Button>
            <Button type="reset">{props.resetButtonText}</Button>
          </Group>
        </SimpleGrid>
      </form>
    );
  },
);
