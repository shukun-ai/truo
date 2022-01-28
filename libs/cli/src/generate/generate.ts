import {
  MetadataSchema,
  RoleSchema,
  ViewSchema,
  WorkflowSchema,
} from '@shukun/schema';

import { readApplication } from './helpers/read-application';
import { readSection } from './helpers/read-section';
import { validate } from './helpers/validate';
import { replaceCode } from './helpers/replace-code';
import { compileTs } from './helpers/compile-ts';
import { writeFile } from './helpers/write-file';
import { stringify } from './helpers/stringify';

export interface GenerateOptions {
  inputPath: string;
  outputPath: string;
}

export async function generate(options: GenerateOptions) {
  const { inputPath, outputPath } = options;

  const application = await readApplication(inputPath);
  const metadata = await readSection<MetadataSchema>(inputPath, 'metadata');
  const views = await readSection<ViewSchema>(inputPath, 'views');
  const workflows = await readSection<WorkflowSchema>(inputPath, 'workflows');
  const roles = await readSection<RoleSchema>(inputPath, 'roles');
  application.metadata = metadata;
  application.views = views;
  application.workflows = workflows;
  application.roles = roles;

  const validated = await validate(application);
  const text = await stringify(validated);
  const replacedText = await replaceCode(text, inputPath, compileTs);

  await writeFile(replacedText, outputPath);

  return { success: true };
}
