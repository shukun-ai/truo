import { useObservableState } from 'observable-hooks';
import { createContext, useContext } from 'react';

import { Injector } from '../../injector';

import { RouterField } from '../../repositories/router-repository';

export type RouterProviderProps = {
  injector: Injector;
  children: JSX.Element;
};

export const RouterProvider = ({ injector, children }: RouterProviderProps) => {
  const router = useObservableState(injector.routerRepository.query());

  if (!router) {
    return null;
  }

  return (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  );
};

export const useRouter = () => {
  return useContext(RouterContext);
};

const RouterContext = createContext<RouterField | null>(null);
