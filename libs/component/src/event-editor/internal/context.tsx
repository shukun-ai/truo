import { TypeException } from '@shukun/exception';
import { RepositorySchema } from '@shukun/schema';
import { ReactNode, createContext, useContext, useMemo } from 'react';

export type EventContextProps = {
  containerName: string;
  repositories: {
    repositoryName: string;
    type: string;
  }[];
  repositoryDefinitions: Record<string, RepositorySchema>;
};

export type EventContextInternalProps = {
  noRepositories: boolean;
  targetOptions: {
    label: string;
    value: string;
  }[];
  actionOptions: {
    label: string;
    value: string;
    target: string;
  }[];
};

const EventContext = createContext<EventContextInternalProps | null>(null);

export const EventProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: EventContextProps;
}) => {
  const targetOptions = useMemo<
    EventContextInternalProps['targetOptions']
  >(() => {
    return value.repositories.map((repository) => ({
      label: repository.repositoryName,
      value: repository.repositoryName,
    }));
  }, [value.repositories]);

  const actionOptions = useMemo<
    EventContextInternalProps['actionOptions']
  >(() => {
    const actionOptions: EventContextInternalProps['actionOptions'] = [];

    value.repositories.forEach((repository) => {
      const { actions } = value.repositoryDefinitions[repository.type];
      Object.entries(actions).forEach(([actionName, action]) => {
        actionOptions.push({
          label: actionName,
          value: actionName,
          target: repository.repositoryName,
        });
      });
    });

    return actionOptions;
  }, [value.repositories, value.repositoryDefinitions]);

  return (
    <EventContext.Provider
      value={{
        noRepositories: targetOptions.length === 0,
        targetOptions,
        actionOptions,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventContext = (): EventContextInternalProps => {
  const eventContext = useContext(EventContext);
  if (!eventContext) {
    throw new TypeException('The eventContext is not initialize.');
  }
  return eventContext;
};
