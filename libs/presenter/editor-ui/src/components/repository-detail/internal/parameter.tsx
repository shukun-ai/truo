import { Box } from '@mantine/core';
import {
  AtomNameInput,
  ConnectorNameInput,
  JsonInput,
} from '@shukun/presenter/editor-inputs';
import { RepositorySchema } from '@shukun/schema';
import { useMemo } from 'react';

import { useEditorContext } from '../../../editor-context';

export type ParameterProps = {
  value: unknown;
  onChange: (newValue: unknown) => void;
  parameter: RepositorySchema['parameters'][number];
  parameterName: string;
};

export const Parameter = ({
  value,
  onChange,
  parameter,
  parameterName,
}: ParameterProps) => {
  const { type } = parameter;

  const commonInputProps = {
    label: parameter.label,
    secondaryLabel: parameterName,
    description: parameter.description,
    required: parameter.required,
  };

  const { state } = useEditorContext();
  const { metadatas, connectors } = state;

  const atomOptions = useMemo<{ label: string; value: string }[]>(() => {
    return Object.entries(metadatas).map(([atomName, atom]) => ({
      label: `${atom.label} (${atomName})`,
      value: atomName,
    }));
  }, [metadatas]);

  const connectorOptions = useMemo<{ label: string; value: string }[]>(() => {
    return Object.entries(connectors).map(([connectorName, connector]) => ({
      label: `${connector.label} (${connectorName})`,
      value: connectorName,
    }));
  }, [connectors]);

  if (
    type === 'connectorName' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <ConnectorNameInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        connectorOptions={connectorOptions}
        {...commonInputProps}
      />
    );
  }

  if (
    type === 'atomName' &&
    (typeof value === 'string' || value === undefined)
  ) {
    return (
      <AtomNameInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        atomOptions={atomOptions}
        {...commonInputProps}
      />
    );
  }

  if (type === 'json' && (typeof value === 'string' || value === undefined)) {
    return (
      <JsonInput
        value={value}
        onChange={(newValue) => onChange(newValue)}
        {...commonInputProps}
      />
    );
  }

  return <Box>未找到该数据仓库的定义</Box>;
};
