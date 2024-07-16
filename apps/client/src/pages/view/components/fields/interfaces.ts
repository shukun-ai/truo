import {
  MetadataAttachmentOptions,
  MetadataCurrencyOptions,
  MetadataOptions,
  ViewTableField,
  ViewTableFilterOptions,
  ViewTableFilterType,
  ViewDetailFilterOptions,
  ViewFieldType,
  UnknownSourceModel,
} from '@shukun/schema';

import { IDString } from '../../../../utils/model-helpers';

export interface BaseReferenceItem {
  value: IDString;
  label: string;
}

export interface ColumnFieldProps {
  type: ViewFieldType;
  name: string;
  label: string;
  electronName: string;
  electronOptions: MetadataOptions | undefined;
  electronForeignName: string | undefined;
  electronReferenceTo: string | undefined;
  referenceViewName: string | undefined;
  currencyOptions: MetadataCurrencyOptions | undefined;
  attachmentOptions: MetadataAttachmentOptions | undefined;
  viewLink: NonNullable<ViewTableField['link']> | undefined;
  tip: string | undefined;
  row: UnknownSourceModel | undefined;
  // TODO temporary solution, the final solution is to remove LinkText type
  disabledLinkText?: boolean;
}

export interface InputFieldProps {
  type: ViewFieldType;
  name: string;
  label: string;
  electronName: string;
  electronOptions: MetadataOptions | undefined;
  electronForeignName: string | undefined;
  electronReferenceTo: string | undefined;
  referenceViewName: string | undefined;
  currencyOptions: MetadataCurrencyOptions | undefined;
  attachmentOptions: MetadataAttachmentOptions | undefined;
  required: boolean;
  disabled: boolean;
  tip: string | undefined;
  filterOptions: ViewDetailFilterOptions | undefined;
}

export interface FilterFieldProps {
  type: ViewFieldType;
  name: string;
  label: string;
  electronName: string;
  electronOptions: MetadataOptions | undefined;
  electronForeignName: string | undefined;
  electronReferenceTo: string | undefined;
  referenceViewName: string | undefined;
  currencyOptions: MetadataCurrencyOptions | undefined;
  attachmentOptions: MetadataAttachmentOptions | undefined;
  tip: string | undefined;
  filterOptions: ViewTableFilterOptions | undefined;
  filterType: ViewTableFilterType | undefined;
}
