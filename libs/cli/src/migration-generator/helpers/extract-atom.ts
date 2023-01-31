import { MetadataElectron, MetadataSchema } from '@shukun/schema';

import { buildConstraint } from '../constraint/build-constraint';
import { getFieldInstance } from '../electron-factory';

export function extractAtom(atom: MetadataSchema): string {
  let text = '';

  text += `schema.createTable(helpers.getTableName('${atom.name}'), (table) => {`;

  text += `table.string('_id', 255).unique().notNullable(); table.timestamp('createdAt').nullable(); table.timestamp('updatedAt').nullable();`;

  atom.electrons.forEach((electron) => {
    text += extractElectron(electron);
  });

  text += `table.primary('_id');`;

  text += `});`;

  return text;
}

function extractElectron(electron: MetadataElectron): string {
  let text = '';
  text += 'table';
  const clause = getFieldInstance(electron);
  text += clause.buildSqlSchema();
  text += buildConstraint(electron);
  text += ';';
  return text;
}
