import {
  MetadataElectronMultiSelect,
  MetadataElectronSingleSelect,
} from './application';

/**
 * @deprecated
 */
export enum MetadataFieldType {
  Text = 'Text',
  NameText = 'NameText',
  LargeText = 'LargeText',
  SingleSelect = 'SingleSelect',
  MultiSelect = 'MultiSelect',
  Boolean = 'Boolean',
  DateTime = 'DateTime',
  Integer = 'Integer',
  Float = 'Float',
  Currency = 'Currency',
  Password = 'Password',
  ManyToMany = 'ManyToMany',
  ManyToOne = 'ManyToOne',
  Owner = 'Owner',
  Attachment = 'Attachment',
  Mixed = 'Mixed',
  Role = 'Role',
}

export type MetadataElectronSelect =
  | MetadataElectronSingleSelect
  | MetadataElectronMultiSelect;
