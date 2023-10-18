import { WidgetGallery } from '@shukun/component';
import {
  ConnectorSchema,
  EnvironmentSchema,
  MetadataElectron,
  MetadataReviseSchema,
  PresenterNode,
  PresenterProcess,
  PresenterRepository,
  PresenterSchema,
  PresenterWidget,
  RepositorySchema,
  TaskSchema,
  WidgetSchema,
} from '@shukun/schema';
import { createContext, useContext } from 'react';

export enum ActivityTab {
  Screens = 'Screens',
  Widgets = 'Widgets',
  Repositories = 'Repositories',
  Processes = 'Processes',
  Watches = 'Watches',
  Metadatas = 'Metadatas',
  Connectors = 'Connectors',
  Environments = 'Environments',
}

export type Entity<T> = T & { id: string };

export type WidgetEntity = Entity<PresenterWidget>;
export type RepositoryEntity = Entity<PresenterRepository>;
export type ProcessEntity = Entity<PresenterProcess>;
export type MetadataEntity = Entity<MetadataReviseSchema>;
export type ConnectorEntity = Entity<ConnectorSchema>;
export type EnvironmentEntity = Entity<EnvironmentSchema>;
export type TaskEntity = Entity<TaskSchema>;

export type TabEntity = {
  id: string;
  isPreview: boolean;
  isEdit: boolean;
  hasError: boolean;
  tabType:
    | 'widget'
    | 'repository'
    | 'process'
    | 'watch'
    | 'connector'
    | 'metadata'
    | 'environment';
  foreignId: string;
};

export type NodeCollapseEntity = {
  id: string;
  collapse: true;
};

export type DevtoolLogs = {
  state: Record<string, unknown>;
  widgetState: Record<string, { index: number; item: unknown }>;
  widgetProperties: Record<string, unknown>;
};

export type EditorContextProps = {
  disabledPresenter: boolean;
  disabledSystem: boolean;
  state: {
    tabs: Record<string, TabEntity>;
    widgets: Record<string, WidgetEntity>;
    nodes: Record<string, PresenterNode>;
    repositories: Record<string, RepositoryEntity>;
    processes: Record<string, ProcessEntity>;
    metadatas: Record<string, MetadataEntity>;
    connectors: Record<string, ConnectorEntity>;
    environments: Record<string, EnvironmentEntity>;
    tasks: Record<string, TaskEntity>;
    widgetDefinitions: Record<string, WidgetSchema>;
    repositoryDefinitions: Record<string, RepositorySchema>;
    nodeCollapses: Record<string, NodeCollapseEntity>;
    selectedTab: TabEntity | null;
    selectedActivityTab: ActivityTab | null;
    previewDomain: string;
    presenterLabel: string;
    rootNodeId: 'root';
    allowedFieldType: {
      type: MetadataElectron['fieldType'];
      deprecated?: boolean;
      system?: boolean;
    }[];
    systemActivityTabs: ActivityTab[];
    presenterActivityTabs: ActivityTab[];
    widgetGallery: WidgetGallery;
  };
  dispatch: {
    editor: {
      chooseActivityTab: (tab: ActivityTab | null) => void;
    };
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
        widgetTag: string,
        widgetLabel: string,
        targetNodeId: string,
      ) => void;
      copyWidget(widget: WidgetEntity, targetNodeId: string): void;
    };
    repository: {
      isUniqueId(repositoryId: string): boolean;
      create(repositoryId: string, repository: PresenterRepository): void;
      update(repositoryId: string, repository: PresenterRepository): void;
      remove(repositoryId: string): void;
    };
    process: {
      create(process: PresenterProcess): string;
      update(processId: string, process: PresenterProcess): void;
      remove(processId: string): void;
    };
    metadata: {
      create(metadataName: string): void;
      update(entity: MetadataEntity): void;
      remove(entityId: string): void;
    };
    connector: {
      create(connectorName: string): void;
      update(entity: ConnectorEntity): void;
      remove(entityId: string): void;
    };
    environment: {
      create(environmentName: string): void;
      update(entity: EnvironmentEntity): void;
      remove(entityId: string): void;
    };
    tab: {
      previewWidget: (widgetEntityId: string) => void;
      previewRepository(repositoryEntityId: string): void;
      previewProcess(processEntityId: string): void;
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
  devtool: {
    logs: DevtoolLogs;
    update: (logs: DevtoolLogs) => void;
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
