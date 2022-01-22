import { ViewV2FieldType } from '@shukun/schema';
import React, { FunctionComponent } from 'react';

import { BooleanFilter } from './boolean/BooleanFilter';
import { IntegerFilter } from './integer/IntegerFilter';
import { FilterFieldProps } from './interfaces';
import { SingleSelectFilter } from './single-select/SingleSelectFilter';
import { TextFilter } from './text/TextFilter';

export const FilterFieldFactory: FunctionComponent<FilterFieldProps> = (
  props,
) => {
  if (
    props.type === ViewV2FieldType.Text ||
    props.type === ViewV2FieldType.LinkText ||
    props.type === ViewV2FieldType.LargeText ||
    props.type === ViewV2FieldType.NameText
  ) {
    return <TextFilter {...props} />;
  }

  if (props.type === ViewV2FieldType.Boolean) {
    return <BooleanFilter {...props} />;
  }

  if (
    props.type === ViewV2FieldType.Integer ||
    props.type === ViewV2FieldType.Float ||
    props.type === ViewV2FieldType.Currency
  ) {
    return <IntegerFilter {...props} />;
  }

  if (
    props.type === ViewV2FieldType.SingleSelect ||
    props.type === ViewV2FieldType.MultiSelect
  ) {
    return <SingleSelectFilter {...props} />;
  }

  // if (props.type === ViewV2FieldType.DateTime) {
  //   return <DateTimeField {...props} />;
  // }

  // if (props.type === ViewV2FieldType.Attachment) {
  //   return <AttachmentField {...props} />;
  // }

  // if (props.type === ViewV2FieldType.Owner) {
  //   return <OwnerField {...props} />;
  // }

  // if (props.type === ViewV2FieldType.ManyToOne) {
  //   return <ManyToOneField {...props} />;
  // }

  // if (props.type === ViewV2FieldType.ManyToMany) {
  //   return <ManyToManyField {...props} />;
  // }

  // if (props.type === ViewV2FieldType.Role) {
  //   return <RoleField {...props} />;
  // }

  // if (props.type === ViewV2FieldType.LinkText) {
  //   return <LinkTextField {...props} />;
  // }

  return <div></div>;
};
