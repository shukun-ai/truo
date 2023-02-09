import {
  MetadataElectron,
  MetadataElectronSelect,
  MetadataSchema,
} from '@shukun/schema';
import { toPascalCase } from 'js-convert-case';

import {
  AttachmentSchema,
  DateTimeIsoString,
  IDString,
} from './extract-shared';

export function extractAtom(atom: MetadataSchema): string {
  let text = '';

  text += `export type ${toPascalCase(atom.name)}Model = {\n`;

  text += `_id: IDString;\n owner?: IDString;\n createdAt?: DateTimeIsoString;\n updatedAt?: DateTimeIsoString;\n`;

  atom.electrons.forEach((electron) => {
    text += extractElectron(electron);
  });

  text += `};\n`;

  return text;
}

function extractElectron(electron: MetadataElectron): string {
  let text = '';

  const equalMark = electron.isRequired ? ':' : '?:';

  text += `${electron.name}${equalMark} ${parseElectronFieldType(electron)};\n`;

  return text;
}

function parseElectronFieldType(electron: MetadataElectron): string {
  let text = '';

  switch (electron.fieldType) {
    case 'Text':
    case 'NameText':
    case 'LargeText':
    case 'Password':
      text = 'string';
      break;
    case 'DateTime':
      text = `${DateTimeIsoString}`;
      break;
    case 'ManyToOne':
    case 'Owner':
      text = `${IDString}`;
      break;
    case 'ManyToMany':
    case 'Role':
      text = `${IDString}[]`;
      break;
    case 'Integer':
    case 'Float':
    case 'Currency':
      text = 'number';
      break;
    case 'Boolean':
      text = 'boolean';
      break;
    case 'Attachment':
      text = `${AttachmentSchema}[]`;
      break;
    case 'SingleSelect':
      text = `${listElectronOptionKey(electron)}`;
      break;
    case 'MultiSelect':
      text = `(${listElectronOptionKey(electron)})[]`;
      break;
    case 'Mixed':
      text = 'unknown';
      break;
    default:
      text = 'unknown';
  }

  return text;
}

export function listElectronOptionKey(
  electron: MetadataElectronSelect,
): string {
  if (!electron.options) {
    return 'undefined';
  }

  return electron.options.map((option) => `"${option.key}"`).join(' | ');
}
