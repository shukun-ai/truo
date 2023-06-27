import { TypeException } from '@shukun/exception';
import { StoreScope } from '@shukun/widget';
import { set as lodashSet } from 'lodash';

export const get = (state: unknown, scope: StoreScope, path: string[]) => {
  const scopePath = getScopePath(scope);
  const fullPath = [...scopePath, ...path];

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

export const set = (
  state: unknown,
  scope: StoreScope,
  path: string[],
  value: unknown,
) => {
  const scopePath = getScopePath(scope);
  const fullPath = [...scopePath, ...path];
  lodashSet(state as any, fullPath.join('.'), value);
};

const getScopePath = (scope: StoreScope): string[] => {
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
