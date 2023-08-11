import { RepositoryContext, StoreCallback } from '@shukun/presenter/definition';

export const createState = <State>(
  context: RepositoryContext,
  initialValue: State,
) => {
  context.store.update(getScope(context), [], () => initialValue);
};

export const removeState = (context: RepositoryContext) => {
  context.store.remove(getScope(context), []);
};

export const updateState = <State>(
  context: RepositoryContext,
  path: string[],
  callback: StoreCallback<State>,
) => {
  context.store.update(getScope(context), [], callback);
};

export const getState = <State>(
  context: RepositoryContext,
  path: string[],
): State => {
  return context.store.getValue(getScope(context), path ?? []);
};

export const getScope = (context: RepositoryContext): string => {
  return context.repositoryId;
};
