import { NativeSelect, SelectItem } from '@mantine/core';
import { MetadataElectronManyToOne } from '@shukun/schema';

import { useMemo } from 'react';

import { useSchemaContext } from './schema-context';

export type ElectronReferenceToInputsProps = {
  value: MetadataElectronManyToOne['referenceTo'];
  onChange: (newValue: MetadataElectronManyToOne['referenceTo']) => void;
  disabled?: boolean;
};

export const ElectronReferenceToInputs = ({
  value,
  onChange,
  disabled,
}: ElectronReferenceToInputsProps) => {
  const { metadatas } = useSchemaContext();

  const atoms = useMemo<SelectItem[]>(() => {
    return Object.values(metadatas).map((atom) => ({
      value: atom.id,
      label: `${atom.label} (${atom.label})`,
    }));
  }, [metadatas]);

  return (
    <NativeSelect
      label="关联表"
      data={atoms}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      disabled={disabled}
    />
  );
};
