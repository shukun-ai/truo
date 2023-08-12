import { EditorContext, EditorContextProps } from './editor-context';
import { EditorEntry } from './editor-entry';

export const Editor = ({ value }: { value: EditorContextProps }) => (
  <EditorContext.Provider value={value}>
    <EditorEntry />
  </EditorContext.Provider>
);
