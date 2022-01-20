import {
  WorkflowCatches,
  WorkflowState,
  WorkflowTaskState,
} from '@shukun/schema';
import { JSONPath } from 'jsonpath-plus';
import { set } from 'lodash';

import { States } from './constants';
import { ParameterPathFailure } from './errors/ParameterPathFailure';
import { ResultPathMatchFailure } from './errors/ResultPathMatchFailure';
import { dispatchFunction } from './functions/dispatcher';
import { GlobalResult, InputOrOutput } from './types';

export const parseTemplateKeyName = (
  keyName: string,
  shouldParsed: boolean,
) => {
  if (!shouldParsed) {
    return keyName;
  }

  const start = keyName.startsWith('_$') ? 1 : 0;
  return keyName.slice(start, keyName.length - 2);
};

export const parseTemplateString = (
  parameter: unknown, // value
  json: Record<string, unknown>,
) => {
  if (typeof parameter !== 'string') {
    throw new ParameterPathFailure();
  }

  if (parameter.startsWith('$.')) {
    const [parsed] = JSONPath({
      path: parameter,
      json: json,
    });
    return parsed;
  }

  if (parameter.startsWith('States.')) {
    return dispatchFunction(parameter, json);
  }

  return parameter;
};

export const parseTemplateFromJson = (
  parameter: unknown,
  json: Record<string, unknown>,
  shouldParsed: boolean,
): any => {
  if (typeof parameter === 'string' && shouldParsed) {
    return parseTemplateString(parameter, json);
  }

  if (Array.isArray(parameter)) {
    return parameter.map((item) => parseTemplateFromJson(item, json, false));
  }

  if (typeof parameter === 'object' && parameter !== null) {
    const container: Record<string, unknown> = {};

    Object.keys(parameter).forEach((keyName) => {
      const value = (parameter as Record<string, unknown>)[keyName];
      const shouldParsed = keyName.endsWith('.$');
      const newKeyName = parseTemplateKeyName(keyName, shouldParsed);
      container[newKeyName] = parseTemplateFromJson(value, json, shouldParsed);
    });

    return container;
  }

  return parameter;
};

export function parseByTemplate(
  input: Record<string, unknown>,
  json: Record<string, unknown>,
): InputOrOutput {
  const output = parseTemplateFromJson(input, json, false);

  if (typeof output !== 'object' || output === null || Array.isArray(output)) {
    throw new ParameterPathFailure();
  }

  return output;
}

export function parseByPath(path: string, input: Record<string, unknown>) {
  const parsed = JSONPath({
    path: path,
    json: input,
  });

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return undefined;
  }

  return parsed[0];
}

export function parseByAllInput(
  input: InputOrOutput,
  inputPath?: string,
  parameters?: InputOrOutput,
): InputOrOutput {
  return parseByParameters(
    parseByInputPath(input, inputPath),
    parameters as any,
  );
}

export function parseByAllOutput(
  input: InputOrOutput,
  result: InputOrOutput,
  resultSelector?: InputOrOutput,
  resultPath?: string,
  outputPath?: string,
): InputOrOutput {
  return parseByOutputPath(
    parseByResultPath(
      input,
      parseByResultSelector(result, resultSelector),
      resultPath,
    ),
    outputPath,
  );
}

export function getStateDefinition(states: WorkflowState, name: string) {
  const definition = states?.[name];

  if (!definition) {
    throw new Error('We did not find specific state name.');
  }

  return definition;
}

export function parseByInputPath(
  input: InputOrOutput,
  inputPath: string | undefined,
): InputOrOutput {
  if (!inputPath) {
    return input;
  }

  const parsed = JSONPath({
    path: inputPath,
    json: input,
  });

  if (!Array.isArray(parsed) || parsed.length === 0) {
    return {};
  }

  const output = parsed[0];
  return output;
}

export function parseByParameters(
  input: InputOrOutput,
  parameters?: Record<string, string | number | null | undefined | boolean>,
): InputOrOutput {
  if (!parameters) {
    return input;
  }

  const output = parseByTemplate(parameters, input);

  return output;
}

export function parseByResultSelector(
  input: InputOrOutput,
  resultSelector?: Record<string, string | number | null | undefined | boolean>,
): InputOrOutput {
  try {
    return parseByParameters(input, resultSelector);
  } catch (error) {
    if (error instanceof ParameterPathFailure) {
      throw new ResultPathMatchFailure();
    } else {
      throw error;
    }
  }
}

export function parseByResultPath(
  origin: InputOrOutput,
  input?: InputOrOutput,
  resultPath?: string | undefined,
): InputOrOutput {
  if (!resultPath || resultPath === '$') {
    return origin;
  }

  const placeholder = set({}, resultPath.slice(2), input);

  return {
    ...origin,
    ...placeholder,
  };
}

export function parseByOutputPath(
  input: InputOrOutput,
  outputPath: string | undefined,
): InputOrOutput {
  try {
    return parseByInputPath(input, outputPath);
  } catch (error) {
    if (error instanceof ParameterPathFailure) {
      throw new ResultPathMatchFailure();
    } else {
      throw error;
    }
  }
}

export async function wrapCatchError(
  state: WorkflowTaskState,
  inputParameters: InputOrOutput,
  resourceInstance: (parameters: InputOrOutput) => Promise<InputOrOutput>,
): Promise<GlobalResult> {
  if (!state.end && !state.next) {
    return {
      end: true,
      output: undefined,
    };
  }

  try {
    const output = await resourceInstance(inputParameters);

    return {
      end: state.end,
      next: state.next,
      output: output,
    };
  } catch (error) {
    const result = state.catch
      ? handleCatch(error as Error, state.catch)
      : undefined;

    if (result) {
      return result;
    }

    throw error;
  }
}

export function handleCatch(error: Error, catchDefinitions: WorkflowCatches) {
  for (let index = 0; index < catchDefinitions.length; index++) {
    const item = catchDefinitions[index];
    if (
      item.errorEquals?.includes(States.ALL) ||
      item.errorEquals?.includes(error.name)
    ) {
      return {
        next: item.next,
        output: undefined,
      };
    }
  }
}
