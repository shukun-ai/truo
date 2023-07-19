export const append = <T>(sets: T[], newValue: T): T[] => {
  const cloned = sets.slice();
  cloned.push(newValue);
  return cloned;
};

export const update = <T>(sets: T[], index: number, newValue: T): T[] => {
  const cloned = sets.slice();
  cloned.splice(index, 1, newValue);
  return cloned;
};

export const remove = <T>(sets: T[], index: number): T[] => {
  const cloned = sets.slice();
  cloned.splice(index, 1);
  return cloned;
};

export const move = <T>(
  sets: T[],
  sourceIndex: number,
  targetIndex: number,
): T[] => {
  if (sourceIndex < targetIndex) {
    const first = sets.slice(0, sourceIndex);
    const second = sets.slice(sourceIndex + 1, targetIndex + 1);
    const third = sets.slice(targetIndex + 1, sets.length);
    const source = sets.slice(sourceIndex, sourceIndex + 1);
    return [...first, ...second, ...source, ...third];
  } else if (sourceIndex > targetIndex) {
    const first = sets.slice(0, targetIndex + 1);
    const second = sets.slice(targetIndex + 1, sourceIndex);
    const third = sets.slice(sourceIndex + 1, sets.length);
    const source = sets.slice(sourceIndex, sourceIndex + 1);
    return [...first, ...source, ...second, ...third];
  } else {
    return sets;
  }
};
