import { createContext, useContext } from 'react';

export type EditorContextProps = {
  mode: 'presenter' | 'system';
};

const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider = ({
  mode,
  children,
}: {
  mode: EditorContextProps['mode'];
  children: JSX.Element;
}) => (
  <EditorContext.Provider value={{ mode }}>{children}</EditorContext.Provider>
);

export const useEditorContext = (): EditorContextProps => {
  const editorContext = useContext(EditorContext);
  if (!editorContext) {
    throw new Error('The editorContext is not initialize.');
  }
  return editorContext;
};
