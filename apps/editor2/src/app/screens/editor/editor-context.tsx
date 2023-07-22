import { createContext, useContext } from 'react';

export type EditorContextProps = {
  disabledPresenter: boolean;
  disabledSystem: boolean;
};

const EditorContext = createContext<EditorContextProps | null>(null);

export const EditorProvider = ({
  mode,
  children,
}: {
  mode: 'presenter' | 'system';
  children: JSX.Element;
}) => (
  <EditorContext.Provider
    value={{
      disabledPresenter: mode === 'system',
      disabledSystem: mode === 'presenter',
    }}
  >
    {children}
  </EditorContext.Provider>
);

export const useEditorContext = (): EditorContextProps => {
  const editorContext = useContext(EditorContext);
  if (!editorContext) {
    throw new Error('The editorContext is not initialize.');
  }
  return editorContext;
};
