import { createContext, useContext } from 'react';

import { AppProps } from '../../abstracts/app.interface';

export type TableContextProps = { app?: AppProps };

export const TableContext = createContext<TableContextProps>({});

export const TableContextProvider = TableContext.Provider;

export const useTableContext = (): TableContextProps => {
  return useContext(TableContext);
};
