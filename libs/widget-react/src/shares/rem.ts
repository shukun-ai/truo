export const numberToRem = (
  value: number | undefined | null,
): string | undefined => {
  if (typeof value === undefined || value === null) {
    return undefined;
  }
  return `${value}rem`;
};
