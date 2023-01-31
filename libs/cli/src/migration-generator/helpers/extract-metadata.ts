import { ApplicationSchema } from '@shukun/schema';

import { extractAtom } from './extract-atom';

export function extractMetadataToTypes(
  application: ApplicationSchema,
  extractAtomFunction: typeof extractAtom,
): string {
  let text = '';

  text += 'const createSchemas = (knex, helpers) => {';

  text += 'const schema = knex.schema;';

  application.metadata?.forEach((atom) => {
    text += extractAtomFunction(atom);
  });

  text += 'return schema;';

  text += '};';

  return text;
}
