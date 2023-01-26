import { MetadataElectronSelect, MetadataSchema } from '@shukun/schema';
import { toPascalCase } from 'js-convert-case';

export function extractElectronOptions(atom: MetadataSchema): string {
  let text = '';

  const selectElectrons = atom.electrons.filter((electron) =>
    ['SingleSelect', 'MultiSelect'].includes(electron.fieldType),
  ) as MetadataElectronSelect[];

  text += selectElectrons
    .map((electron) => extractElectronOption(atom, electron))
    .join('');

  return text;
}

function extractElectronOption(
  atom: MetadataSchema,
  electron: MetadataElectronSelect,
) {
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
