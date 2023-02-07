import {
  MetadataElectron,
  MetadataElectronSelect,
  MetadataFieldType,
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

  text += `export type ${toPascalCase(atom.name)}Model = {`;

  text += `_id: IDString; owner?: IDString; createdAt?: DateTimeIsoString; updatedAt?: DateTimeIsoString; `;

  atom.electrons.forEach((electron) => {
    text += extractElectron(electron);
  });

  text += `};`;

  return text;
}

function extractElectron(electron: MetadataElectron): string {
  let text = '';

  const equalMark = electron.isRequired ? ':' : '?:';

  text += `${electron.name}${equalMark} ${parseElectronFieldType(electron)}; `;

  return text;
}

function parseElectronFieldType(electron: MetadataElectron): string {
  let text = '';

  switch (electron.fieldType) {
    case MetadataFieldType.Text:
    case MetadataFieldType.NameText:
    case MetadataFieldType.LargeText:
    case MetadataFieldType.Password:
      text = 'string';
      break;
    case MetadataFieldType.DateTime:
      text = `${DateTimeIsoString}`;
      break;
    case MetadataFieldType.ManyToOne:
    case MetadataFieldType.Owner:
      text = `${IDString}`;
      break;
    case MetadataFieldType.ManyToMany:
    case MetadataFieldType.Role:
      text = `${IDString}[]`;
      break;
    case MetadataFieldType.Integer:
    case MetadataFieldType.Float:
    case MetadataFieldType.Currency:
      text = 'number';
      break;
    case MetadataFieldType.Boolean:
      text = 'boolean';
      break;
    case MetadataFieldType.Attachment:
      text = `${AttachmentSchema}[]`;
      break;
    case MetadataFieldType.SingleSelect:
      text = `${listElectronOptionKey(electron)}`;
      break;
    case MetadataFieldType.MultiSelect:
      text = `(${listElectronOptionKey(electron)})[]`;
      break;
    case MetadataFieldType.Mixed:
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

  return electron.options.map((option) => `"${option.key}"`).join('|');
}
