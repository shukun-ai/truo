import { LegacyFunctionComponent } from '@shukun/component';
import { ViewFieldType } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

import { AttachmentField } from './attachment/AttachmentField';
import { BooleanField } from './boolean/BooleanField';
import { CurrencyField } from './currency/CurrencyField';
import { DateTimeField } from './date-time/DateTimeField';
import { FloatField } from './float/FloatField';
import { IntegerField } from './integer/IntegerField';
import { ColumnFieldProps } from './interfaces';
import { LargeTextField } from './large-text/LargeTextField';
import { LinkTextField } from './link-text/LinkTextField';
import { ManyToManyField } from './many-to-many/ManyToManyField';
import { ManyToOneField } from './many-to-one/ManyToOneField';
import { MixedField } from './mixed/MixedField';
import { MultiSelectField } from './multi-select/MultiSelectField';
import { NameTextField } from './name-text/NameTextField';
import { OwnerField } from './owner/OwnerField';
import { PasswordField } from './password/PasswordField';
import { RoleField } from './role/RoleField';
import { SingleSelectField } from './single-select/SingleSelectField';
import { TextField } from './text/TextField';

export const ColumnFieldFactory: LegacyFunctionComponent<ColumnFieldProps> = (
  props,
) => {
  if (props.type === ViewFieldType.Text) {
    return <TextField {...props} />;
  }

  if (props.type === ViewFieldType.NameText) {
    return <NameTextField {...props} />;
  }

  if (props.type === ViewFieldType.LargeText) {
    return <LargeTextField {...props} />;
  }

  if (props.type === ViewFieldType.Mixed) {
    return <MixedField {...props} />;
  }

  if (props.type === ViewFieldType.Boolean) {
    return <BooleanField {...props} />;
  }

  if (props.type === ViewFieldType.Integer) {
    return <IntegerField {...props} />;
  }

  if (props.type === ViewFieldType.Float) {
    return <FloatField {...props} />;
  }

  if (props.type === ViewFieldType.Currency) {
    return <CurrencyField {...props} />;
  }

  if (props.type === ViewFieldType.Password) {
    return <PasswordField {...props} />;
  }

  if (props.type === ViewFieldType.SingleSelect) {
    return <SingleSelectField {...props} />;
  }

  if (props.type === ViewFieldType.MultiSelect) {
    return <MultiSelectField {...props} />;
  }

  if (props.type === ViewFieldType.DateTime) {
    return <DateTimeField {...props} />;
  }

  if (props.type === ViewFieldType.Attachment) {
    return <AttachmentField {...props} />;
  }

  if (props.type === ViewFieldType.Owner) {
    return <OwnerField {...props} />;
  }

  if (props.type === ViewFieldType.ManyToOne) {
    return <ManyToOneField {...props} />;
  }

  if (props.type === ViewFieldType.ManyToMany) {
    return <ManyToManyField {...props} />;
  }

  if (props.type === ViewFieldType.Role) {
    return <RoleField {...props} />;
  }

  if (props.type === ViewFieldType.LinkText) {
    return <LinkTextField {...props} />;
  }

  return <div>未内置该格式</div>;
};
