import {
  PresenterNode,
  PresenterRepository,
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
    presenterLabel: string;
    widgets: KeyMap<PresenterWidget>;
    nodes: KeyMap<PresenterNode>;
    repositories: KeyMap<PresenterRepository>;
    widgetDefinitions: KeyMap<WidgetSchema>;
    repositoryDefinitions: KeyMap<RepositorySchema>;
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
