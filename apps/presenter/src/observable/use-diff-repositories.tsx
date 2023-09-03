import { Injector } from '@shukun/presenter/definition';
import { PresenterEvent, PresenterSchema } from '@shukun/schema';
import { useEffect, useState } from 'react';

import { AppProps } from '../interfaces/app';

export const useDiffRepositories = (
  injector: Injector,
  nextPresenter: PresenterSchema | undefined,
  repositories: AppProps['repositories'] | undefined,
) => {
  const [previousPresenter, setPreviousPresenter] =
    useState<PresenterSchema | null>(null);

  useEffect(() => {
    if (!nextPresenter || !repositories) {
      return;
    }

    const nextRepositoryNames = Object.keys(nextPresenter.repositories);
    const previousRepositoryNames = previousPresenter
      ? Object.keys(previousPresenter.repositories)
      : [];

    if (equalNames(nextRepositoryNames, previousRepositoryNames)) {
      return;
    }

    const added = getAdded(nextRepositoryNames, previousRepositoryNames);
    const removed = getRemoved(nextRepositoryNames, previousRepositoryNames);

    if (added.length > 0) {
      for (const name of added) {
        const repository = nextPresenter.repositories[name];
        const repositoryDefinition = repositories[repository.type];
        if (repositoryDefinition && repositoryDefinition.register) {
          const payload = undefined;
          const event: PresenterEvent = {
            target: name,
            action: 'register',
          };
          repositoryDefinition.register(payload, event, injector, repository);
        }
      }
    }

    if (removed.length > 0) {
      for (const name of removed) {
        const repository = nextPresenter.repositories[name];
        const repositoryDefinition = repositories[repository.type];
        if (repositoryDefinition && repositoryDefinition.unregister) {
          const payload = undefined;
          const event: PresenterEvent = {
            target: name,
            action: 'unregister',
          };
          repositoryDefinition.unregister(payload, event, injector, repository);
        }
      }
    }

    setPreviousPresenter(nextPresenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPresenter, previousPresenter, repositories]);
};

const getAdded = (next: string[], previous: string[]): string[] => {
  return next.filter((name) => !previous.includes(name));
};

const getRemoved = (next: string[], previous: string[]): string[] => {
  return previous.filter((name) => !next.includes(name));
};

const equalNames = (next: string[], previous: string[]): boolean => {
  return (
    next.length === previous.length &&
    next.every((name) => previous.includes(name))
  );
};
