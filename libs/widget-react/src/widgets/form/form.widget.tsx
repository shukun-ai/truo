import { Box, Button, Container, Group, SimpleGrid } from '@mantine/core';
import { formDefinition, FormDefinitionProps } from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { numberToRem } from '../../shares/rem';

export const FormWidget = createWidget<FormDefinitionProps>(
  formDefinition,
  (props) => {
    return (
      <form>
        <Box>{props.children}</Box>
        <Box h={numberToRem(1)} />
        <Group>
          {props.submitButtonText && (
            <Button type="submit">{props.submitButtonText}</Button>
          )}
          {props.resetButtonText && (
            <Button type="reset" variant="default">
              {props.resetButtonText}
            </Button>
          )}
        </Group>
      </form>
    );
  },
);
