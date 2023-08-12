import {
  PresenterNode,
  PresenterRepository,
  PresenterSchema,
  PresenterWidget,
  RepositorySchema,
  WidgetSchema,
} from '@shukun/schema';
import { createContext, useContext } from 'react';

export type Entity<T> = T & { id: string };

export type Tab = { tabType: 'widget' };

export type TabEntity = Entity<Tab>;
export type WidgetEntity = Entity<PresenterWidget>;
export type NodeEntity = Entity<PresenterNode>;
export type RepositoryEntity = Entity<PresenterRepository>;

export type EditorContextProps = {
  disabledPresenter: boolean;
  disabledSystem: boolean;
  state: {
    tabs: Record<string, TabEntity>;
    previewDomain: string;
    presenterLabel: string;
    widgets: Record<string, WidgetEntity>;
    nodes: Record<string, NodeEntity>;
    repositories: Record<string, RepositoryEntity>;
    widgetDefinitions: Record<string, WidgetSchema>;
    repositoryDefinitions: Record<string, RepositorySchema>;
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
    widget: {
      update: (entityId: string, entity: PresenterWidget) => void;
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
