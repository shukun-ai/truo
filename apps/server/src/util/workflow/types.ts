import { LogLevel } from '@nestjs/common';
import { WorkflowTaskState } from '@shukun/schema';

export type InputOrOutput = Record<string, any>;

export type GlobalResult = {
  end?: boolean;
  next?: string;
  output?: InputOrOutput;
};

// @todo rename the wrong name, the first letter should be uppercase
export type executeResource = (
  state: WorkflowTaskState,
  parameters: InputOrOutput,
) => Promise<InputOrOutput>;

export type ExecuteLog = (level: LogLevel, value: any) => void;

export type FunctionAstArg = string | number | boolean | null;

export type FunctionAst = {
  method: string;
  // We don't support undefined type, because it is not supported in other languages.
  args: FunctionAstArg[];
};
