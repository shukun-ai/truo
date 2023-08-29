import { parseParameters } from './internal/template';

export const runTemplate = (template: unknown, state: unknown): unknown => {
  return parseParameters(template, { state, helpers: {} });
};
