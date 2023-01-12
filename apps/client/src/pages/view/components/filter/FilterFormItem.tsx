import { MetadataSchema, ViewTableField } from '@shukun/schema';
import React, { FunctionComponent, useMemo } from 'react';

import { FilterFieldFactory } from '../fields/FilterFieldFactory';

export interface FilterFormItemProps {
  metadata: MetadataSchema;
  viewTableField: ViewTableField;
}

export const FilterFormItem: FunctionComponent<FilterFormItemProps> = ({
  metadata,
  viewTableField,
}) => {
  const electron = useMemo(() => {
    const electron = metadata.electrons.find(
      (electron) => electron.name === viewTableField.electronName,
    );
    return electron;
  }, [metadata, viewTableField.electronName]);

  if (['createdAt', 'updatedAt'].includes(viewTableField.electronName)) {
    return <InternalFilterFormItem viewTableField={viewTableField} />;
  }

  if (!electron) {
    console.error(`Did not find the electron in filter: ${electron}`);
    return null;
  }

  return (
    <FilterFieldFactory
      key={viewTableField.name}
      type={viewTableField.type}
      name={viewTableField.name}
      label={viewTableField.label}
      tip={undefined}
      electronName={electron.name}
      electronForeignName={electron.foreignName}
      electronReferenceTo={electron.referenceTo}
      electronOptions={electron.options}
      referenceViewName={viewTableField.referenceViewName}
      currencyOptions={electron.currencyOptions}
      attachmentOptions={electron.attachmentOptions}
      filterOptions={viewTableField.filterOptions}
      filterType={viewTableField.filterType}
    />
  );
};

export interface InternalFilterFormItem {
  viewTableField: ViewTableField;
}

export const InternalFilterFormItem: FunctionComponent<
  InternalFilterFormItem
> = ({ viewTableField }) => {
  return (
    <FilterFieldFactory
      key={viewTableField.name}
      type={viewTableField.type}
      name={viewTableField.name}
      label={viewTableField.label}
      tip={undefined}
      electronName={viewTableField.name}
      electronForeignName={undefined}
      electronReferenceTo={undefined}
      electronOptions={undefined}
      referenceViewName={undefined}
      currencyOptions={undefined}
      attachmentOptions={undefined}
      filterOptions={viewTableField.filterOptions}
      filterType={viewTableField.filterType}
    />
  );
};
