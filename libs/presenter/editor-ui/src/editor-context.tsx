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

export type WidgetEntity = Entity<PresenterWidget>;
export type NodeEntity = Entity<PresenterNode>;
export type RepositoryEntity = Entity<PresenterRepository>;

export type TabEntity = { id: string; tabType: 'widget' };
export type NodeCollapseEntity = {
  id: string;
  collapse: true;
};

export type EditorContextProps = {
  disabledPresenter: boolean;
  disabledSystem: boolean;
  state: {
    tabs: Record<string, TabEntity>;
    widgets: Record<string, WidgetEntity>;
    nodes: Record<string, NodeEntity>;
    repositories: Record<string, RepositoryEntity>;
    widgetDefinitions: Record<string, WidgetSchema>;
    repositoryDefinitions: Record<string, RepositorySchema>;
    nodeCollapses: Record<string, NodeCollapseEntity>;
    selectedWidgetEntityId: string | null;
    selectedRepositoryEntityId: string | null;
    selectedConnectorEntityId: string | null;
    selectedMetadataEntityId: string | null;
    selectedEnvironmentEntityId: string | null;
    selectedTabId: string | null;

    // selectedTab$: Observable<TabEntity | null>;
    // selectedTabEntityId$: Observable<string | null>;
    // selectedWidgetEntityId$: Observable<string | null>;
    // selectedRepositoryEntityId$: Observable<string | null>;
    // selectedConnectorEntityId$: Observable<string | null>;
    // selectedMetadataEntityId$: Observable<string | null>;
    // selectedEnvironmentEntityId$: Observable<string | null>;
    previewDomain: string;
    presenterLabel: string;
    rootNodeId: 'root';
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
      create(entity: PresenterWidget): void;
      update(entityId: string, entity: Partial<PresenterWidget>): void;
      remove(entityId: string): void;
      rename(entityId: string, label: string): void;
      getLabels(label: string): string[];
      validateLabel(label: string): void;
    };
    node: {
      moveToBeside: (
        sourceNodeId: string,
        targetNodeId: string,
        position: 'before' | 'after',
      ) => void;
      moveToInside: (sourceNodeId: string, targetNodeId: string) => void;
      removeTreeNode(sourceNodeId: string): void;
      closeTreeCollapse: (sourceNodeId: string) => void;
      openTreeCollapse: (sourceNodeId: string) => void;
      addWidget: (
        type: 'sibling' | 'insert',
        newWidgetTag: string,
        newWidgetTitle: string,
        targetNodeId: string,
      ) => void;
      copyWidget(widget: WidgetEntity, targetNodeId: string): void;
    };
    repository: {
      isUniqueId(repositoryId: string): boolean;
      create(entity: PresenterRepository): void;
      update(entityId: string, entity: PresenterRepository): void;
      remove(entityId: string): void;
    };
    tab: {
      previewWidget: (widgetEntityId: string) => void;
      previewRepository(repositoryEntityId: string): void;
      previewConnector(connectorEntityId: string): void;
      previewMetadata(metadataEntityId: string): void;
      previewEnvironment(environmentEntityId: string): void;
      fix(entityId: string): void;
      activeEditing(entityId: string): void;
      inactiveEditing(entityId: string): void;
      choose(entityId: string): void;
      close(entityId: string): void;
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
