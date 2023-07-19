import { NativeSelect, SelectItem } from '@mantine/core';
import { MetadataElectronManyToOne } from '@shukun/schema';

import { useMemo } from 'react';

import { useSchemaContext } from './schema-context';

export type ElectronReferenceToInputsProps = {
  value: MetadataElectronManyToOne['referenceTo'];
  onChange: (newValue: MetadataElectronManyToOne['referenceTo']) => void;
};

export const ElectronReferenceToInputs = ({
  value,
  onChange,
}: ElectronReferenceToInputsProps) => {
  const { metadatas } = useSchemaContext();

  const atoms = useMemo<SelectItem[]>(() => {
    return metadatas?.map((atom) => ({
      value: atom.metadataName,
      label: `${atom.label} (${atom.metadataName})`,
    }));
  }, [metadatas]);

  return (
    <NativeSelect
      label="关联表"
      data={atoms}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  );
};
