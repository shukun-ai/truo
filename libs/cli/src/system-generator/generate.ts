import {
  FlowSchema,
  MetadataSchema,
  RoleSchema,
  ScheduleSchema,
  ViewSchema,
  WorkflowSchema,
} from '@shukun/schema';

import { compileTs } from './helpers/compile-ts';
import { readApplication } from './helpers/read-application';
import { readSection } from './helpers/read-section';
import { replaceCode } from './helpers/replace-code';
import { stringify } from './helpers/stringify';
import { validate } from './helpers/validate';

export interface GenerateOptions {
  inputPath: string;
  disabledValidation?: boolean;
}

export async function generate(options: GenerateOptions) {
  const { inputPath, disabledValidation } = options;

  const application = await readApplication(inputPath);
  const metadata = await readSection<MetadataSchema>(inputPath, 'metadata');
  const views = await readSection<ViewSchema>(inputPath, 'views');
  const workflows = await readSection<WorkflowSchema>(inputPath, 'workflows');
  const roles = await readSection<RoleSchema>(inputPath, 'roles');
  const flows = await readSection<FlowSchema>(inputPath, 'flows');
  const schedules = await readSection<ScheduleSchema>(inputPath, 'schedules');
  application.metadata = metadata;
  application.views = views;
  application.workflows = workflows;
  application.roles = roles;
  application.flows = flows;
  application.schedules = schedules;

  const validated = disabledValidation
    ? application
    : await validate(application);
  const text = await stringify(validated);
  const replacedText = await replaceCode(text, inputPath, compileTs);

  return replacedText;
}
