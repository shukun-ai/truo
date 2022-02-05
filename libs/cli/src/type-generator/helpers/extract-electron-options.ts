import {
  MetadataElectron,
  MetadataFieldType,
  MetadataSchema,
} from '@shukun/schema';
import { toPascalCase } from 'js-convert-case';

export function extractElectronOptions(atom: MetadataSchema): string {
  let text = '';

  text += atom.electrons
    .filter((electron) =>
      [MetadataFieldType.SingleSelect, MetadataFieldType.MultiSelect].includes(
        electron.fieldType,
      ),
    )
    .map((electron) => extractElectronOption(atom, electron))
    .join('');

  return text;
}

function extractElectronOption(
  atom: MetadataSchema,
  electron: MetadataElectron,
) {
  if (!electron.options) {
    return '';
  }

  let text = '';

  text += `export const ${toPascalCase(atom.name)}${toPascalCase(
    electron.name,
  )}Options = {`;

  text += electron.options
    .map((option) => `${option.key}: "${option.label}", `)
    .join('');

  text += `};`;

  return text;
}
