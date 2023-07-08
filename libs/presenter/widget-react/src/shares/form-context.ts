import { createFormContext, UseFormReturnType } from '@mantine/form';

const [FormProvider, useFormContext, useForm] =
  createFormContext<Record<string, unknown>>();

const extractForm = (
  props: { name?: string; [key: string]: unknown },
  form: UseFormReturnType<Record<string, unknown>>,
) => {
  if (props.name) {
    return form.getInputProps(props.name);
  } else {
    return null;
  }
};

const extractValue = (
  props: { name?: string; [key: string]: unknown },
  form: UseFormReturnType<Record<string, unknown>>,
): unknown | [] => {
  const inputProps = extractForm(props, form);
  return inputProps ? inputProps.value : [];
};

export { FormProvider, useFormContext, useForm, extractForm, extractValue };
