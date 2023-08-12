import { ConnectorSchema } from '@shukun/schema';

import { Stage } from './components/stage';
import { EditorProvider } from './context/connector-context';

export type ConnectorEditorProps = {
  value: ConnectorSchema;
  onChange: (value: ConnectorSchema) => void;
};

export const ConnectorEditor = ({ value, onChange }: ConnectorEditorProps) => {
  return (
    <EditorProvider value={{ value, onChange }}>
      <Stage />
    </EditorProvider>
  );
};
