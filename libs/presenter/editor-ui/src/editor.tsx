import { EditorContext } from './editor-context';
import { EditorEntry } from './editor-entry';

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
    <EditorEntry />
  </EditorContext.Provider>
);
