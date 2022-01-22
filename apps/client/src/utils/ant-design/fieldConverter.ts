import reduceRight from 'lodash/reduceRight';

export function convertFieldName<T>(
  name: string | string[],
  value: unknown,
): Partial<T> {
  const names = typeof name === 'string' ? [name] : name;

  const parsedObj = reduceRight(
    names,
    (memo, arrayValue) => {
      const obj: any = {};
      obj[arrayValue] = memo;
      return obj;
    },
    value,
  );

  return parsedObj as Partial<T>;
}
