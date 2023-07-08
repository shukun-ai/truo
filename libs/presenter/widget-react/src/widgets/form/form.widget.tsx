import { Box, Button, Group } from '@mantine/core';
import {
  formDefinition,
  FormDefinitionProps,
} from '@shukun/presenter/definition';

import { createWidget } from '../../abstracts/create-widget';
import { FormProvider, useForm } from '../../shares/form-context';
import { extractBase } from '../../shares/inheritance';
import { numberToRem } from '../../shares/rem';

export const FormWidget = createWidget<FormDefinitionProps>(
  formDefinition,
  (props) => {
    const form = useForm({
      initialValues: structuredClone(props.value),
    });

    return (
      <FormProvider form={form}>
        <Box
          {...extractBase(props)}
          component="form"
          sx={{ display: 'block' }}
          onSubmit={form.onSubmit((value) => {
            props.submit && props.submit(structuredClone(value));
          })}
        >
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
            {props.cancelButtonText && (
              <Button variant="default">{props.cancelButtonText}</Button>
            )}
          </Group>
        </Box>
      </FormProvider>
    );
  },
);
