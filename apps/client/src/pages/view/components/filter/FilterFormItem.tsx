import { MetadataSchema, ViewV2Column } from '@shukun/schema';
import React, { FunctionComponent, useMemo } from 'react';

import { FilterFieldFactory } from '../fields/FilterFieldFactory';

export interface FilterFormItemProps {
  metadata: MetadataSchema;
  viewColumn: ViewV2Column;
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

  if (!electron) {
    return <></>;
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
    />
  );
};
