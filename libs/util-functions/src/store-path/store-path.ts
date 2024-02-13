import set from 'lodash/set';

export const getStorePath = (state: unknown, fullPath: string[]) => {
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

export const setStorePath = <T>(
  previousState: T,
  fullPath: string[],
  value: unknown,
): T => {
  const cloned = structuredClone(previousState);
  set(cloned as any, fullPath.join('.'), value);
  return cloned;
};
