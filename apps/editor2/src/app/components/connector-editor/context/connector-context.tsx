import { ConnectorSchema } from '@shukun/schema';
import { createContext, useContext } from 'react';

export type EditorContextProps = {
  value: ConnectorSchema;
  onChange: (value: ConnectorSchema) => void;
};

const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider = EditorContext.Provider;

export const useEditorContext = (): EditorContextProps => {
  const editorContext = useContext(EditorContext);
  if (!editorContext) {
    throw new Error('The connector editorContext is not initialize.');
  }
  return editorContext;
};
