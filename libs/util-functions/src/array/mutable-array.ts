export const mutableAppend = <T>(sets: T[], newValue: T): T[] => {
  sets.push(newValue);
  return sets;
};

export const mutableUpdate = <T>(
  sets: T[],
  index: number,
  newValue: T,
): T[] => {
  sets.splice(index, 1, newValue);
  return sets;
};

export const mutableRemove = <T>(sets: T[], index: number): T[] => {
  sets.splice(index, 1);
  return sets;
};

export const mutableMove = <T>(
  sets: T[],
  sourceIndex: number,
  targetIndex: number,
): T[] => {
  const source = sets[sourceIndex];
  if (!source) {
    throw new Error('Did not find source in sets.');
  }

  if (sourceIndex > targetIndex) {
    sets.splice(sourceIndex, 1);
    sets.splice(targetIndex + 1, 0, source);
  } else if (sourceIndex < targetIndex) {
    sets.splice(sourceIndex, 1);
    sets.splice(targetIndex, 0, source);
  }

  return sets;
};
