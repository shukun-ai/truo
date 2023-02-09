import { UnknownSourceModel } from '@shukun/schema';
import { FormInstance } from 'antd';
import { createContext } from 'react';

import { DetailMode } from '../../../../services/detail';

export interface FormContextProps {
  form: FormInstance<UnknownSourceModel> | null;
  row: UnknownSourceModel | null;
  mode: DetailMode;
}

export const FormContext = createContext<FormContextProps>({
  form: null,
  row: null,
  mode: DetailMode.Show,
});
