import { Box, NativeSelect, SelectItem } from '@mantine/core';
import { MetadataElectronManyToOne } from '@shukun/schema';

import { useMemo } from 'react';

import { useSchemaContext } from './schema-context';

export type ElectronForeignNameInputsProps = {
  atomName: string;
  value: MetadataElectronManyToOne['foreignName'];
  onChange: (newValue: MetadataElectronManyToOne['foreignName']) => void;
  disabled?: boolean;
};

export const ElectronForeignNameInputs = ({
  atomName,
  value,
  onChange,
  disabled,
}: ElectronForeignNameInputsProps) => {
  const { metadatas } = useSchemaContext();

  const atomOptions = useMemo<SelectItem[]>(() => {
    const atom = metadatas.find((atom) => atom.metadataName === atomName);

    return Object.entries(atom?.electrons ?? {}).map(
      ([electronName, electron]) => ({
        value: electronName,
        label: `${electron.label} (${electronName})`,
      }),
    );
  }, [atomName, metadatas]);

  return (
    <Box>
      <NativeSelect
        label="显示字段"
        description="该功能仅用于数据库查询，对展示器无影响"
        data={atomOptions}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
      />
    </Box>
  );
};
