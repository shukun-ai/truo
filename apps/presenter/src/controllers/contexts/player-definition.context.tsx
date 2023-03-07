import { PlayerSchema } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import { createContext, useContext, useEffect, useState } from 'react';

import { Injector } from '../../injector';
import { ConfigDefinitions } from '../../loaders/config-manager.interface';

export type PlayerDefinitionProviderProps = {
  injector: Injector;
  children: JSX.Element;
};

export const PlayerDefinitionProvider = ({
  injector,
  children,
}: PlayerDefinitionProviderProps) => {
  const router = useObservableState(injector.routerRepository.query());

  const [definitions, setDefinitions] = useState<ConfigDefinitions>();

  useEffect(() => {
    if (router) {
      injector.loader.load(router.orgName, router.app).then((definitions) => {
        setDefinitions(definitions);
      });
    }
  });

  if (!definitions) {
    return null;
  }

  return (
    <PlayerDefinition.Provider value={definitions}>
      {children}
    </PlayerDefinition.Provider>
  );
};

export const usePlayerDefinition = () => {
  const playerDefinition = useContext(PlayerDefinition);
  return playerDefinition;
};

const PlayerDefinition = createContext<ConfigDefinitions | null>(null);
