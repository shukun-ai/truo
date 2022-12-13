import { FlowEvent } from '@shukun/schema';

export interface BaseCompiler {
  compile(event: FlowEvent): Promise<string>;
}
