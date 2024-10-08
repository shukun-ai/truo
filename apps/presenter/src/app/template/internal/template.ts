import { TypeException } from '@shukun/exception';

import { CodeMode } from '@shukun/schema';

import { runJson } from './json';
import { runSandbox } from './sandbox';
import { TemplateHelpers } from './types';

export const parseParameters = (
  parameters: unknown,
  context: HandlerContext,
): unknown => {
  if (typeof parameters === 'string') {
    return parseStringOrCode(parameters, context);
  } else if (typeof parameters === 'number') {
    return parameters;
  } else if (typeof parameters === 'boolean') {
    return parameters;
  } else if (typeof parameters === 'undefined') {
    return parameters;
  } else if (parameters === null) {
    return parameters;
  } else if (Array.isArray(parameters)) {
    return parameters.map((parameter) => parseParameters(parameter, context));
  } else if (typeof parameters === 'object') {
    return Object.entries(parameters).reduce((set, [nextKey, nextValue]) => {
      return {
        ...set,
        [nextKey]: parseParameters(nextValue, context),
      };
    }, {} as Record<string, unknown>);
  } else {
    throw new TypeException(
      'The type of parameters is not supported: {{type}}',
      { type: typeof parameters },
    );
  }
};

const parseStringOrCode = (
  template: string,
  context: HandlerContext,
): unknown => {
  if (template.startsWith(CodeMode.JS)) {
    const code = template.slice(CodeMode.JS.length, template.length);
    return runSandbox(code, context.state, context.helpers);
  }

  if (template.startsWith(CodeMode.JSON)) {
    const code = template.slice(CodeMode.JSON.length, template.length);
    return runJson(code);
  }

  return template;
};

type HandlerContext = {
  state: unknown;
  helpers: TemplateHelpers;
};
