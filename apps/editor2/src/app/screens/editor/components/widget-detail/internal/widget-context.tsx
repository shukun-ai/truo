import { createFormContext } from '@mantine/form';
import { PresenterWidget } from '@shukun/schema';

export type WidgetFormValue = {
  properties: PresenterWidget['properties'];
  events: PresenterWidget['events'];
};

const [FormProvider, useFormContext, useForm] =
  createFormContext<WidgetFormValue>();

export const WidgetFormProvider = FormProvider;
export const useWidgetFormContext = useFormContext;
export const useWidgetForm = useForm;

export const composeFormPropertyName = (definitionPropertyName: string) => {
  return `properties.${definitionPropertyName}`;
};

export const composeFormEventName = (definitionEventName: string) => {
  return `events.${definitionEventName}`;
};
