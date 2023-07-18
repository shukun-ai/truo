export const append = <T>(sets: T[], newValue: T): T[] => {
  const cloned = sets.slice(0, -1);
  cloned.push(newValue);
  return cloned;
};

export const update = <T>(sets: T[], index: number, newValue: T): T[] => {
  const cloned = sets.slice(0, -1);
  cloned.splice(index, 1, newValue);
  return cloned;
};

export const remove = <T>(sets: T[], index: number): T[] => {
  const cloned = sets.slice(0, -1);
  cloned.splice(index, 1);
  return cloned;
};

export const move = <T>(
  sets: T[],
  sourceIndex: number,
  targetIndex: number,
): T[] => {
  const cloned = sets.slice(0, -1);
  const moved = cloned[sourceIndex];
  if (!moved) {
    throw new Error('Did not find moved in sets.');
  }
  sets.splice(sourceIndex, 1);
  sets.splice(targetIndex, 0, moved);
  return sets;
};
