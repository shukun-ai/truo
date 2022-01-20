import { BadRequestException } from '@nestjs/common';
import {
  WorkflowChoiceState,
  WorkflowConfigurations,
  WorkflowFailState,
  WorkflowPassState,
  WorkflowState,
  WorkflowTaskState,
} from '@shukun/schema';

import { compareVariables } from './choices/comparisons';
import { IntrinsicFailure } from './errors/IntrinsicFailure';
import { NoChoiceMatched } from './errors/NoChoiceMatched';
import {
  getStateDefinition,
  parseByAllInput,
  parseByAllOutput,
  parseByInputPath,
  parseByOutputPath,
  wrapCatchError,
} from './parser';
import {
  executeResource,
  InputOrOutput,
  GlobalResult,
  ExecuteLog,
} from './types';

export async function executeWorkflow(
  workflowSchema: WorkflowConfigurations,
  input: InputOrOutput,
  executeResource: executeResource,
  options?: {
    executeLog?: ExecuteLog;
  },
) {
  const { states, startAt } = workflowSchema;

  let result: GlobalResult = {
    end: false,
    next: startAt,
    output: input,
  };

  while (!result.end) {
    const { output: nextInput, next } = result;

    if (!next) {
      throw new IntrinsicFailure();
    }

    const state = getStateDefinition(states, next);
    result = await executeState(
      state as WorkflowState,
      nextInput || {},
      executeResource,
    );
    options?.executeLog?.('debug', { result });
  }

  return result.output;
}

export function executeState(
  state: WorkflowState,
  input: InputOrOutput,
  executeResource: executeResource,
): Promise<GlobalResult> {
  switch (state.type as unknown) {
    case 'Pass':
      return executePassState(state as WorkflowPassState, input);
    case 'Task':
      return executeTaskState(
        state as WorkflowTaskState,
        input,
        executeResource,
      );
    case 'Choice':
      return executeChoiceState(state as WorkflowChoiceState, input);
    case 'Fail':
      return executeFailState(state as WorkflowFailState);
    default:
      throw new Error('We did not find the specific state type.');
  }
}

export async function executePassState(
  state: WorkflowPassState,
  input: InputOrOutput,
): Promise<GlobalResult> {
  const { result } = state;
  const parsedResult = !result ? {} : parseByAllInput(input, '$', result);

  const output = parseByAllOutput(
    input,
    parsedResult,
    state.resultSelector,
    state.resultPath,
    state.outputPath,
  );
  return {
    end: state.end,
    next: state.next,
    output,
  };
}

export async function executeTaskState(
  state: WorkflowTaskState,
  input: InputOrOutput,
  executeResource: executeResource,
): Promise<GlobalResult> {
  const parameters = parseByAllInput(input, state.inputPath, state.parameters);

  const result = await wrapCatchError(state, parameters, (parameters) =>
    executeResource(state, parameters),
  );

  const output = parseByAllOutput(
    input,
    result.output || {},
    state.resultSelector,
    state.resultPath,
    state.outputPath,
  );
  return {
    end: result.end,
    next: result.next,
    output,
  };
}

export async function executeChoiceState(
  state: WorkflowChoiceState,
  input: InputOrOutput,
): Promise<GlobalResult> {
  const { choices } = state;

  const parsedInput = parseByInputPath(input, state.inputPath);

  for (const choice of choices) {
    const result = compareVariables(choice, parsedInput);

    if (result) {
      const parsedOutput = parseByOutputPath(input, state.outputPath);
      return {
        next: choice.next,
        output: parsedOutput,
      };
    }
  }

  if (!state.default) {
    throw new NoChoiceMatched('Do not set default when no choices matched.');
  }

  const parsedOutput = parseByOutputPath(input, state.outputPath);

  return {
    next: state.default,
    output: parsedOutput,
  };
}

export async function executeFailState(
  state: WorkflowFailState,
): Promise<GlobalResult> {
  const { cause } = state;
  const error = new BadRequestException(cause);
  throw error;
}
