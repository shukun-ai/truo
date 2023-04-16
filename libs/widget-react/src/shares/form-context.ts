import { createFormContext, UseFormReturnType } from '@mantine/form';

const [FormProvider, useFormContext, useForm] = createFormContext();

const extractForm = (
  props: { name?: string; [key: string]: unknown },
  form: UseFormReturnType<unknown>,
) => {
  if (props.name) {
    return form.getInputProps(props.name);
  } else {
    return null;
  }
};

const extractValue = (
  props: { name?: string; [key: string]: unknown },
  form: UseFormReturnType<unknown>,
): unknown | [] => {
  const inputProps = extractForm(props, form);
  return inputProps ? inputProps.value : [];
};

export { FormProvider, useFormContext, useForm, extractForm, extractValue };
