import { MetadataSchema, ViewV2Field } from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { DetailMode, source$ } from '../../../../services/detail';
import { InputFieldFactory } from '../fields/InputFieldFactory';
import { ShowFieldFactory } from '../fields/ShowFieldFactory';
import { runStringCode } from '../ribbon/runStringCode';

export interface DetailFieldProps {
  metadata: MetadataSchema;
  viewField: ViewV2Field;
  detailMode: DetailMode;
}

export const DetailField: FunctionComponent<DetailFieldProps> = ({
  metadata,
  viewField,
  detailMode,
}) => {
  const electron = useMemo(() => {
    return metadata.electrons.find(
      (electron) => electron.name === viewField.electronName,
    );
  }, [metadata.electrons, viewField.electronName]);

  const source = useObservableState(source$);

  const disabled = useMemo(() => {
    return runStringCode(
      viewField.disabledCode,
      source ?? undefined,
      source ? [source] : [],
      detailMode,
    );
  }, [source, viewField.disabledCode, detailMode]);

  const required = useMemo(() => {
    return runStringCode(
      viewField.requiredCode,
      source ?? undefined,
      source ? [source] : [],
      detailMode,
    );
  }, [source, viewField.requiredCode, detailMode]);

  if (!electron) {
    return <>不存在该字段</>;
  }

  if (detailMode === DetailMode.Show) {
    return (
      <ShowFieldFactory
        type={viewField.type}
        name={viewField.name}
        label={viewField.label}
        viewLink={undefined}
        electronName={viewField.electronName}
        electronOptions={electron.options}
        electronForeignName={electron.foreignName}
        electronReferenceTo={electron.referenceTo}
        referenceViewName={viewField.referenceViewName}
        currencyOptions={electron.currencyOptions}
        attachmentOptions={electron.attachmentOptions}
        tip={viewField.tip}
        row={source ?? undefined}
      />
    );
  } else {
    return (
      <InputFieldFactory
        type={viewField.type}
        name={viewField.name}
        label={viewField.label}
        electronName={viewField.electronName}
        electronOptions={electron.options}
        electronForeignName={electron.foreignName}
        electronReferenceTo={electron.referenceTo}
        referenceViewName={viewField.referenceViewName}
        currencyOptions={electron.currencyOptions}
        attachmentOptions={electron.attachmentOptions}
        tip={viewField.tip}
        required={required}
        disabled={disabled}
        filterOptions={viewField.filterOptions}
      />
    );
  }
};
