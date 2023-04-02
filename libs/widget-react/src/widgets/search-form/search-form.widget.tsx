import { Box, Button, Group, SimpleGrid } from '@mantine/core';
import {
  searchFormDefinition,
  SearchFormDefinitionProps,
} from '@shukun/widget';

import { createWidget } from '../../abstracts/create-widget';
import { extractBase } from '../../shares/inheritance';

export const searchFormWidget = createWidget<SearchFormDefinitionProps>(
  searchFormDefinition,
  (props) => {
    return (
      <Box {...extractBase(props)} component="form" display="block">
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
            {props.submitButtonText && (
              <Button type="submit">{props.submitButtonText}</Button>
            )}
            {props.resetButtonText && (
              <Button type="reset" variant="default">
                {props.resetButtonText}
              </Button>
            )}
          </Group>
        </SimpleGrid>
      </Box>
    );
  },
);
