import {
  MetadataAttachmentOptions,
  MetadataCurrencyOptions,
  MetadataOptions,
  ViewColumn,
  ViewColumnFilterOptions,
  ViewColumnFilterType,
  ViewFieldFilterOptions,
  ViewFieldType,
} from '@shukun/schema';

import { UnknownSourceModel } from '../../../../models/source';
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
  viewLink: NonNullable<ViewColumn['link']> | undefined;
  tip: string | undefined;
  row: UnknownSourceModel | undefined;
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
  filterOptions: ViewFieldFilterOptions | undefined;
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
  filterOptions: ViewColumnFilterOptions | undefined;
  filterType: ViewColumnFilterType | undefined;
}
