export function isMaxScale(value: unknown, maxScale: number): boolean {
  if (typeof value === 'number') {
    const numberDivide = value.toString().split('.');
    if (numberDivide.length === 2 && numberDivide[1].length > maxScale) {
      return true;
    }
  }

  return false;
}
