import {
  MetadataAttachmentOptions,
  MetadataCurrencyOptions,
  MetadataOptions,
  ViewV2Column,
  ViewV2ColumnFilterOptions,
  ViewV2ColumnFilterType,
  ViewV2FieldType,
} from '@shukun/schema';

import { UnknownSourceModel } from '../../../../models/source';
import { IDString } from '../../../../utils/model-helpers';

export interface BaseReferenceItem {
  value: IDString;
  label: string;
}

export interface ColumnFieldProps {
  type: ViewV2FieldType;
  name: string;
  label: string;
  electronName: string;
  electronOptions: MetadataOptions | undefined;
  electronForeignName: string | undefined;
  electronReferenceTo: string | undefined;
  referenceViewName: string | undefined;
  currencyOptions: MetadataCurrencyOptions | undefined;
  attachmentOptions: MetadataAttachmentOptions | undefined;
  viewLink: NonNullable<ViewV2Column['link']> | undefined;
  tip: string | undefined;
  row: UnknownSourceModel | undefined;
}

export interface InputFieldProps {
  type: ViewV2FieldType;
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
}

export interface FilterFieldProps {
  type: ViewV2FieldType;
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
  filterOptions: ViewV2ColumnFilterOptions | undefined;
  filterType: ViewV2ColumnFilterType | undefined;
}
