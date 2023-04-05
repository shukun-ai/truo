import { LegacyFunctionComponent } from '@shukun/component';
import {
  MetadataAttachmentOptions,
  MetadataCurrencyOptions,
  MetadataOptions,
  MetadataSchema,
  ViewDetailField,
} from '@shukun/schema';
import { useObservableState } from 'observable-hooks';
import React, { FunctionComponent, useMemo } from 'react';

import { DetailMode, source$ } from '../../../../services/detail';
import { InputFieldFactory } from '../fields/InputFieldFactory';
import { ShowFieldFactory } from '../fields/ShowFieldFactory';
import { runStringCode } from '../ribbon/runStringCode';

export interface DetailFieldProps {
  metadata: MetadataSchema;
  viewDetailField: ViewDetailField;
  detailMode: DetailMode;
}

export const DetailField: LegacyFunctionComponent<DetailFieldProps> = ({
  metadata,
  viewDetailField,
  detailMode,
}) => {
  const electron = useMemo(() => {
    return metadata.electrons.find(
      (electron) => electron.name === viewDetailField.electronName,
    );
  }, [metadata.electrons, viewDetailField.electronName]);

  const source = useObservableState(source$);

  const disabled = useMemo(() => {
    return runStringCode(
      viewDetailField.disabledCode,
      source ?? undefined,
      source ? [source] : [],
      detailMode,
    );
  }, [source, viewDetailField.disabledCode, detailMode]);

  const required = useMemo(() => {
    return runStringCode(
      viewDetailField.requiredCode,
      source ?? undefined,
      source ? [source] : [],
      detailMode,
    );
  }, [source, viewDetailField.requiredCode, detailMode]);

  if (!electron) {
    return <>不存在该字段</>;
  }

  if (detailMode === DetailMode.Show) {
    return (
      <ShowFieldFactory
        type={viewDetailField.type}
        name={viewDetailField.name}
        label={viewDetailField.label}
        viewLink={undefined}
        electronName={viewDetailField.electronName}
        electronOptions={electron.options as MetadataOptions}
        electronForeignName={electron.foreignName as string}
        electronReferenceTo={electron.referenceTo as string}
        referenceViewName={viewDetailField.referenceViewName}
        currencyOptions={electron.currencyOptions as MetadataCurrencyOptions}
        attachmentOptions={
          electron.attachmentOptions as MetadataAttachmentOptions
        }
        tip={viewDetailField.tip}
        row={source ?? undefined}
      />
    );
  } else {
    return (
      <InputFieldFactory
        type={viewDetailField.type}
        name={viewDetailField.name}
        label={viewDetailField.label}
        electronName={viewDetailField.electronName}
        electronOptions={electron.options as MetadataOptions}
        electronForeignName={electron.foreignName as string | undefined}
        electronReferenceTo={electron.referenceTo as string | undefined}
        referenceViewName={viewDetailField.referenceViewName}
        currencyOptions={electron.currencyOptions as MetadataCurrencyOptions}
        attachmentOptions={
          electron.attachmentOptions as MetadataAttachmentOptions
        }
        tip={viewDetailField.tip}
        required={required}
        disabled={disabled}
        filterOptions={viewDetailField.filterOptions}
      />
    );
  }
};
