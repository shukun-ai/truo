import {
  Box,
  Card,
  Checkbox,
  Group,
  NativeSelect,
  SelectItem,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';

import { useObservableState } from 'observable-hooks';
import { useMemo } from 'react';

import { MetadataEntity } from '../../../../../../repositories/metadata/metadata-ref';
import { useAppContext } from '../../../../../contexts/app-context';

import { ElectronForeignNameInputs } from './electron-foreign-name-inputs';
import { ElectronReferenceToInputs } from './electron-reference-to-inputs';
import { ElectronSelectInputs } from './electron-select-inputs';

export type ElectronProps = {
  electronName: string;
  value: MetadataEntity['electrons'][number];
  onChange: (value: MetadataEntity['electrons'][number] | null) => void;
};

export const Electron = ({ electronName, value, onChange }: ElectronProps) => {
  const app = useAppContext();

  const allowedFieldType = useObservableState(
    app.repositories.metadataRepository.allowedFieldType$,
    [],
  );

  const filedTypeOptions = useMemo<SelectItem[]>(() => {
    return allowedFieldType.map((fieldType) => ({
      value: fieldType.type,
      label: fieldType.type,
      disabled: !!fieldType.deprecated || !!fieldType.system,
    }));
  }, [allowedFieldType]);

  return (
    <Card
      withBorder
      sx={{
        overflow: 'visible',
        marginBottom: 12,
      }}
    >
      <Text fw="bold" mb={6}>
        {electronName}
      </Text>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flex: 1, marginRight: 12 }}>
          <TextInput
            placeholder="显示名称"
            value={value.label}
            onChange={(event) =>
              onChange({
                ...value,
                label: event.target.value,
              })
            }
          />
        </Box>
        <Box sx={{ flex: 1, marginRight: 12 }}>
          <NativeSelect
            data={filedTypeOptions}
            value={value.fieldType}
            onChange={(event) =>
              onChange({
                ...value,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                fieldType: event.target.value as any,
              })
            }
          />
        </Box>
        <Group>
          <Checkbox
            label="必填"
            checked={value.isRequired}
            onChange={(event) =>
              onChange({ ...value, isRequired: event.currentTarget.checked })
            }
          />
          <Tooltip
            multiline
            width={220}
            withArrow
            transitionProps={{ duration: 200 }}
            label="请慎重勾选唯一性，如果数据库里已存在重复数据，唯一性将无法生效，需要手动清理数据库。该功能将会在后续优化为自动化。"
          >
            <Checkbox
              label="唯一性"
              checked={value.isUnique}
              onChange={(event) =>
                onChange({ ...value, isUnique: event.currentTarget.checked })
              }
            />
          </Tooltip>
          <Checkbox
            label="索引"
            checked={value.isIndexed}
            onChange={(event) =>
              onChange({ ...value, isIndexed: event.currentTarget.checked })
            }
          />
        </Group>
      </Box>
      {(value.fieldType === 'SingleSelect' ||
        value.fieldType === 'MultiSelect') && (
        <Card withBorder mt={12}>
          <Text>选择项</Text>
          <ElectronSelectInputs
            value={value.options}
            onChange={(newValue) => onChange({ ...value, options: newValue })}
          />
        </Card>
      )}
      {(value.fieldType === 'ManyToOne' ||
        value.fieldType === 'ManyToMany') && (
        <Card withBorder mt={12}>
          <Text>关联项</Text>
          <ElectronReferenceToInputs
            value={value.referenceTo}
            onChange={(newValue) =>
              onChange({ ...value, referenceTo: newValue })
            }
          />
          <ElectronForeignNameInputs
            atomName={value.referenceTo}
            value={value.foreignName}
            onChange={(newValue) =>
              onChange({ ...value, foreignName: newValue })
            }
          />
        </Card>
      )}
    </Card>
  );
};
