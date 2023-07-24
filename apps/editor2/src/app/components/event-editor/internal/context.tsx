import { TypeException } from '@shukun/exception';
import { RepositorySchema } from '@shukun/schema';
import { ReactNode, createContext, useContext } from 'react';

import { IRepositoryRepository } from '../../../../repositories/presenter/repository-repository.interface';

export type EventContextProps = {
  containerName: string;
  repositories: { containerName: string; repositoryName: string }[];
  repositoryDefinitions: Record<string, RepositorySchema>;
  repositoryRepository: IRepositoryRepository; // TODO remove the interface
};

const EventContext = createContext<EventContextProps | null>(null);

export const EventProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: EventContextProps;
}) => <EventContext.Provider value={value}>{children}</EventContext.Provider>;

export const useEventContext = (): EventContextProps => {
  const eventContext = useContext(EventContext);
  if (!eventContext) {
    throw new TypeException('The eventContext is not initialize.');
  }
  return eventContext;
};
