import { TypeException } from '@shukun/exception';
import { get } from 'lodash';

export const templateFunction = (template: string, states: unknown) => {
  const parse = new Function(
    'stringify',
    '$',
    `return stringify\`${template}\`;`,
  );

  try {
    return parse(stringify, states);
  } catch (error) {
    throw new TypeException('The template expression is wrong.');
  }
};

const stringify = (texts: string[], ...expression: unknown[]) => {
  return texts
    .map((value, index) =>
      index === 0 ? value : formatExpression(expression, index - 1) + value,
    )
    .join('');
};

const formatExpression = (target: unknown, path: string | number) => {
  const value = get(target, path);

  if (value === undefined || value === null) {
    return '';
  } else {
    return value;
  }
};
