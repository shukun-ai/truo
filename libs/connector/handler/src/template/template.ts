import { TypeException } from '@shukun/exception';

import { CodeMode } from '@shukun/schema';

import { HandlerContext, HandlerInjector } from '../connector-types';

export const parseParameters = (
  parameters: unknown,
  context: HandlerContext,
  injector: HandlerInjector,
): unknown => {
  if (typeof parameters === 'string') {
    return parseStringOrCode(parameters, context, injector);
  } else if (typeof parameters === 'number') {
    return parameters;
  } else if (typeof parameters === 'boolean') {
    return parameters;
  } else if (typeof parameters === 'undefined') {
    return parameters;
  } else if (parameters === null) {
    return parameters;
  } else if (Array.isArray(parameters)) {
    return parameters.map((parameter) =>
      parseParameters(parameter, context, injector),
    );
  } else if (typeof parameters === 'object') {
    return Object.entries(parameters).reduce((set, [nextKey, nextValue]) => {
      return {
        ...set,
        [nextKey]: parseParameters(nextValue, context, injector),
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
  injector: HandlerInjector,
): unknown => {
  if (!template.startsWith(CodeMode.JS)) {
    return template;
  }

  const code = template.slice(CodeMode.JS.length, template.length);

  if (!injector.executeSandbox) {
    throw new TypeException('Did not defined executeSandbox');
  }

  return injector.executeSandbox(code, context);
};
