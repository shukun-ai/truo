import { Injector } from '@shukun/presenter/definition';
import { PresenterSchema, PresenterVariable } from '@shukun/schema';
import { useEffect, useState } from 'react';

import { runTemplate } from '../app/template/template';

export const useDiffVariables = (
  injector: Injector,
  nextPresenter: PresenterSchema | undefined,
) => {
  const [previousPresenter, setPreviousPresenter] =
    useState<PresenterSchema | null>(null);

  useEffect(() => {
    if (!nextPresenter) {
      return;
    }

    const nextVariables = nextPresenter.variables ?? {};
    const nextVariableNames = Object.keys(nextVariables);
    const previousVariableNames = previousPresenter
      ? Object.keys(previousPresenter.variables ?? {})
      : [];

    if (equalNames(nextVariableNames, previousVariableNames)) {
      return;
    }

    const added = getAdded(nextVariableNames, previousVariableNames);
    const removed = getRemoved(nextVariableNames, previousVariableNames);

    if (added.length > 0) {
      for (const name of added) {
        const variable = nextVariables[name];
        variable && registerVariable(name, variable, injector);
      }
    }

    if (removed.length > 0) {
      for (const name of removed) {
        const variable = nextVariables[name];
        variable && unregisterVariable(name, injector);
      }
    }

    setPreviousPresenter(nextPresenter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextPresenter, previousPresenter]);
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

const registerVariable = (
  variableName: string,
  variable: PresenterVariable,
  injector: Injector,
): void => {
  const { defaultValue } = variable;

  if (defaultValue) {
    // @remark set state as empty, because does not support dynamic changes
    const state = {};
    const value = runTemplate(defaultValue, state);
    const fullPath = [variableName];
    injector.store.update<unknown>(fullPath, () => value);
  }
};

const unregisterVariable = (variableName: string, injector: Injector): void => {
  const fullPath = [variableName];
  injector.store.remove(fullPath);
};
