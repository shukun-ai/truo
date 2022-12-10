import { FormInstance } from 'antd';
import { createContext } from 'react';

import { SearchFilter } from '../../../../services/search';

export interface FilterContextProps {
  form: FormInstance<SearchFilter> | null;
}

export const FilterContext = createContext<FilterContextProps>({
  form: null,
});
