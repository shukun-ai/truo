import { createContext, useContext } from 'react';

import { Injector } from '../../injector';

export type InjectorProviderProps = {
  injector: Injector;
  children: JSX.Element;
};

export const InjectorProvider = ({
  injector,
  children,
}: InjectorProviderProps) => {
  return (
    <InjectorContext.Provider value={injector}>
      {children}
    </InjectorContext.Provider>
  );
};

export const useInjector = () => {
  const injector = useContext(InjectorContext);
  return injector;
};

const InjectorContext = createContext<Injector | null>(null);
