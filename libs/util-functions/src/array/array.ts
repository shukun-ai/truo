export const append = <T>(sets: T[], newValue: T): T[] => {
  const cloned = sets.slice(0, sets.length);
  cloned.push(newValue);
  return cloned;
};

export const update = <T>(sets: T[], index: number, newValue: T): T[] => {
  const cloned = sets.slice(0, sets.length);
  cloned.splice(index, 1, newValue);
  return cloned;
};

export const remove = <T>(sets: T[], index: number): T[] => {
  const cloned = sets.slice(0, sets.length);
  cloned.splice(index, 1);
  return cloned;
};

export const move = <T>(
  sets: T[],
  sourceIndex: number,
  targetIndex: number,
): T[] => {
  if (sourceIndex <= targetIndex) {
    const first = sets.slice(0, sourceIndex);
    const second = sets.slice(sourceIndex + 1, targetIndex);
    const third = sets.slice(targetIndex, sets.length);
    const source = sets.slice(sourceIndex, sourceIndex + 1);

    return [...first, ...second, ...source, ...third];
  } else {
    const first = sets.slice(0, targetIndex);
    const second = sets.slice(targetIndex, sourceIndex);
    const third = sets.slice(sourceIndex + 1, sets.length);
    const source = sets.slice(sourceIndex, sourceIndex + 1);
    return [...first, ...source, ...second, ...third];
  }
};
