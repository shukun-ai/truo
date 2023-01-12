import { MetadataSchema, ViewColumn } from '@shukun/schema';
import React, { FunctionComponent, useMemo } from 'react';

import { FilterFieldFactory } from '../fields/FilterFieldFactory';

export interface FilterFormItemProps {
  metadata: MetadataSchema;
  viewColumn: ViewColumn;
}

export const FilterFormItem: FunctionComponent<FilterFormItemProps> = ({
  metadata,
  viewColumn,
}) => {
  const electron = useMemo(() => {
    const electron = metadata.electrons.find(
      (electron) => electron.name === viewColumn.electronName,
    );
    return electron;
  }, [metadata, viewColumn.electronName]);

  if (['createdAt', 'updatedAt'].includes(viewColumn.electronName)) {
    return <InternalFilterFormItem viewColumn={viewColumn} />;
  }

  if (!electron) {
    console.error(`Did not find the electron in filter: ${electron}`);
    return null;
  }

  return (
    <FilterFieldFactory
      key={viewColumn.name}
      type={viewColumn.type}
      name={viewColumn.name}
      label={viewColumn.label}
      tip={undefined}
      electronName={electron.name}
      electronForeignName={electron.foreignName}
      electronReferenceTo={electron.referenceTo}
      electronOptions={electron.options}
      referenceViewName={viewColumn.referenceViewName}
      currencyOptions={electron.currencyOptions}
      attachmentOptions={electron.attachmentOptions}
      filterOptions={viewColumn.filterOptions}
      filterType={viewColumn.filterType}
    />
  );
};

export interface InternalFilterFormItem {
  viewColumn: ViewColumn;
}

export const InternalFilterFormItem: FunctionComponent<
  InternalFilterFormItem
> = ({ viewColumn }) => {
  return (
    <FilterFieldFactory
      key={viewColumn.name}
      type={viewColumn.type}
      name={viewColumn.name}
      label={viewColumn.label}
      tip={undefined}
      electronName={viewColumn.name}
      electronForeignName={undefined}
      electronReferenceTo={undefined}
      electronOptions={undefined}
      referenceViewName={undefined}
      currencyOptions={undefined}
      attachmentOptions={undefined}
      filterOptions={viewColumn.filterOptions}
      filterType={viewColumn.filterType}
    />
  );
};
