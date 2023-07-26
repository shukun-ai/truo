import { createFormContext } from '@mantine/form';

import { PresenterRepositoryEntity } from '../../../../../../repositories/presenter/repository-ref';

const [FormProvider, useFormContext, useForm] =
  createFormContext<PresenterRepositoryEntity['parameters']>();

export const RepositoryFormProvider = FormProvider;
export const useRepositoryFormContext = useFormContext;
export const useRepositoryForm = useForm;
