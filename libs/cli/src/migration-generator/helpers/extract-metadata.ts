import { ApplicationSchema } from '@shukun/schema';

import { extractAtom } from './extract-atom';

export function extractMetadataToTypes(
  application: ApplicationSchema,
  extractAtomFunction: typeof extractAtom,
): string {
  let text = '';

  text += 'export const runMigration = (knex) => {';

  application.metadata?.forEach((atom) => {
    text += extractAtomFunction(atom);
  });

  text += '};';

  return text;
}
