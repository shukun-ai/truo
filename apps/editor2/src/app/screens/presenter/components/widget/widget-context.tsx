import { createFormContext } from '@mantine/form';
import { PresenterWidget } from '@shukun/schema';

const [FormProvider, useFormContext, useForm] =
  createFormContext<PresenterWidget['properties']>();

export const WidgetFormProvider = FormProvider;
export const useWidgetFormContext = useFormContext;
export const useWidgetForm = useForm;
