import {
  PresenterNode,
  PresenterRepository,
  PresenterSchema,
  PresenterWidget,
  RepositorySchema,
  WidgetSchema,
} from '@shukun/schema';
import { createContext, useContext } from 'react';

export type KeyMap<T> = Record<string, T>;

export type EditorContextProps = {
  disabledPresenter: boolean;
  disabledSystem: boolean;
  state: {
    previewDomain: string;
    presenterLabel: string;
    widgets: KeyMap<PresenterWidget>;
    nodes: KeyMap<PresenterNode>;
    repositories: KeyMap<PresenterRepository>;
    widgetDefinitions: KeyMap<WidgetSchema>;
    repositoryDefinitions: KeyMap<RepositorySchema>;
  };
  dispatch: {
    deserialization: {
      build: () => PresenterSchema;
    };
    synchronize: {
      update: (
        presenterName: string,
        presenter: PresenterSchema,
      ) => Promise<void>;
    };
  };
};

export const EditorContext = createContext<EditorContextProps | null>(null);

export const useEditorContext = (): EditorContextProps => {
  const editorContext = useContext(EditorContext);
  if (!editorContext) {
    throw new Error('The editorContext is not initialize.');
  }
  return editorContext;
};

export const useEditorState = (): EditorContextProps['state'] => {
  const editorContext = useEditorContext();
  return editorContext.state;
};

export const useEditorDispatch = (): EditorContextProps['dispatch'] => {
  const editorContext = useEditorContext();
  return editorContext.dispatch;
};
