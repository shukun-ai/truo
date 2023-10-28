import { VariableSchema } from '@shukun/schema';

import { SchemaRecursiveEditor } from './schema-recursive-editor';

export type SchemaEditorProps = {
  value: VariableSchema;
  onChange: (newValue: VariableSchema | null) => void;
};

export const SchemaEditor = ({ value, onChange }: SchemaEditorProps) => {
  return <SchemaRecursiveEditor value={value} onChange={onChange} />;
};
