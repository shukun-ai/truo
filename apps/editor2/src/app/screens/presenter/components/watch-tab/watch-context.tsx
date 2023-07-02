import { createFormContext } from '@mantine/form';

import { PresenterWatchEntity } from '../../../../../repositories/presenter/watch-ref';

const [FormProvider, useFormContext, useForm] =
  createFormContext<PresenterWatchEntity>();

export const WatchFormProvider = FormProvider;
export const useWatchFormContext = useFormContext;
export const useWatchForm = useForm;
