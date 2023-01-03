import { MetadataElectron, MetadataSchema } from '@shukun/schema';

import { getFieldInstance } from '../electron-factory';

export function extractAtom(atom: MetadataSchema): string {
  let text = '';

  text += `knex.schema.createTable('${atom.name}', (table) => {`;

  text += `table.string('_id', 255); table.timestamp('createdAt'); table.timestamp('updatedAt');`;

  atom.electrons.forEach((electron) => {
    text += extractElectron(electron);
  });

  text += `table.primary('_id');`;

  text += `});`;

  return text;
}

function extractElectron(electron: MetadataElectron): string {
  let text = '';
  const clause = getFieldInstance(electron.fieldType);
  text += clause.sqlSchemaBuilder(electron);
  return text;
}
