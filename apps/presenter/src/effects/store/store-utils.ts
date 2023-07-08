import { TypeException } from '@shukun/exception';
import { StoreScope } from '@shukun/presenter/definition';
import { set as lodashSet } from 'lodash';

export const getByScope = (
  state: unknown,
  scope: StoreScope,
  path: string[],
) => {
  const scopePath = getScopePath(scope);
  const fullPath = [...scopePath, ...path];
  return get(state, fullPath);
};

export const get = (state: unknown, fullPath: string[]) => {
  let newState: any = state;

  for (let index = 0; index < fullPath.length; index++) {
    const key = fullPath[index];
    const child = newState?.[key];
    if (
      child === undefined ||
      child === null ||
      typeof child === 'string' ||
      typeof child === 'number' ||
      typeof child === 'boolean'
    ) {
      newState = child === null ? undefined : child;
      break;
    }
    newState = child;
  }

  return newState;
};

export const setByScope = (
  state: unknown,
  scope: StoreScope,
  path: string[],
  value: unknown,
) => {
  const scopePath = getScopePath(scope);
  const fullPath = [...scopePath, ...path];
  return set(state, fullPath, value);
};

export const set = (state: unknown, fullPath: string[], value: unknown) => {
  lodashSet(state as any, fullPath.join('.'), value);
};

export const getScopePath = (scope: StoreScope): string[] => {
  const { type, containerId, repositoryId } = scope;
  switch (type) {
    case 'app':
      return ['app', repositoryId];
    case 'container':
      if (containerId) {
        return ['container', containerId, repositoryId];
      } else {
        throw new TypeException('Did not find containerId in container type.');
      }
  }
};
