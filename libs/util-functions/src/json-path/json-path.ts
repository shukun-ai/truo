export const arrayPathToString = (path: string[], prefix = ''): string => {
  if (!prefix) {
    return path.join('.');
  }
  if (path.length === 0) {
    return prefix;
  }
  const purePath = path.join('.');
  return `${prefix}.${purePath}`;
};

export const stringPathToArray = (path: string, prefix = ''): string[] => {
  if (!prefix) {
    return path.split('.');
  }
  if (path === prefix) {
    return [];
  }
  const purePath = path.substring(prefix.length + 1, path.length);
  return purePath.split('.');
};

export const multipleArrayPathToMultipleString = (
  multipleArrayPath: string[][],
  prefix = '',
): string[] => {
  return multipleArrayPath.map((item) => arrayPathToString(item, prefix));
};

export const multipleStringPathToMultipleArray = (
  multipleStringPath: string[],
  prefix = '',
): string[][] => {
  return multipleStringPath.map((item) => stringPathToArray(item, prefix));
};
