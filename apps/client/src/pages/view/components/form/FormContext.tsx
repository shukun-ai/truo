import { FormInstance } from 'antd';
import { createContext } from 'react';

import { UnknownMetadataModel } from '../../../../models/metadata';
import { DetailMode } from '../../../../services/detail';

export interface FormContextProps {
  form: FormInstance<UnknownMetadataModel> | null;
  row: UnknownMetadataModel | null;
  mode: DetailMode;
}

export const FormContext = createContext<FormContextProps>({
  form: null,
  row: null,
  mode: DetailMode.Show,
});
