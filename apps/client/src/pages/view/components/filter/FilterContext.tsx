import { FormInstance } from 'antd';
import { createContext } from 'react';

import { FilterRawValues } from '../../../../services/table/model';

export interface FilterContextProps {
  form: FormInstance<FilterRawValues> | null;
}

export const FilterContext = createContext<FilterContextProps>({
  form: null,
});
