import { getElectronInstance } from '@shukun/electron';
import { MetadataElectron, MetadataSchema } from '@shukun/schema';

export function extractAtom(atom: MetadataSchema): string {
  let text = '';

  text += `schema.createTable(helpers.getTableName('${atom.name}'), (table: any) => {`;

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
  const clause = getElectronInstance(electron.fieldType);
  text += clause.buildSqlSchema(electron);
  return text;
}
