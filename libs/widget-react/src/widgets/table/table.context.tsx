import { createContext, useContext } from 'react';

import { WidgetAppProps } from '../../abstracts/create-widget.interface';

export type TableContextProps = { app?: WidgetAppProps };

export const TableContext = createContext<TableContextProps>({});

export const TableContextProvider = TableContext.Provider;

export const useTableContext = (): TableContextProps => {
  return useContext(TableContext);
};
