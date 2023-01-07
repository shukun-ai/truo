import { ApplicationSchema } from '@shukun/schema';

import { extractAtom } from './extract-atom';

export function extractMetadataToTypes(
  application: ApplicationSchema,
  extractAtomFunction: typeof extractAtom,
): string {
  let text = '';

  text += 'export const createSchemas = (knex: any, helpers: any) => {';

  text += 'const schema = knex.schema;';

  application.metadata?.forEach((atom) => {
    text += extractAtomFunction(atom);
  });

  text += 'return schema;';

  text += '};';

  return text;
}
