import { Editor as BaseEditor } from '@shukun/presenter/editor-ui';

import { useObservableState } from 'observable-hooks';

import { useState } from 'react';

import { environment } from '../../../environments/environment';
import { connectorRepository } from '../../../repositories/connector/connector-repository';
import { environmentRepository } from '../../../repositories/environment/environment-repository';
import { metadataRepository } from '../../../repositories/metadata/metadata-repository';
import { deserialization } from '../../../repositories/presenter/deserialization-service';
import { editorRepository } from '../../../repositories/presenter/editor-repository';
import { nodeRepository } from '../../../repositories/presenter/node-repository';
import { ActivityTab } from '../../../repositories/presenter/presenter-store';
import { processRepository } from '../../../repositories/presenter/process-repository';
import { variableRepository } from '../../../repositories/presenter/variable-repository';
import { widgetRepository } from '../../../repositories/presenter/widget-repository';
import { tabRepository } from '../../../repositories/tab/tab-repository';
import { taskRepository } from '../../../repositories/task/task-repository';
import { viewRepository } from '../../../repositories/view/view-repository';
import { useAppContext } from '../../contexts/app-context';

import { useLoadPresenter } from './use-load-presenter';

export type EditorProps = {
  mode: 'presenter' | 'system';
};

export type DevtoolLogs = {
  state: Record<string, unknown>;
  widgetState: Record<string, { index: number; item: unknown }>;
  widgetProperties: Record<string, unknown>;
};

export const Editor = ({ mode }: EditorProps) => {
  const app = useAppContext();

  const presenter = useObservableState(widgetRepository.presenter$);
  const tabs = useObservableState(tabRepository.tabs$, {});
  const selectedTab = useObservableState(tabRepository.selectedTab$, null);
  const metadatas = useObservableState(metadataRepository.all$, {});
  const connectors = useObservableState(connectorRepository.all$, {});
  const environments = useObservableState(environmentRepository.all$, {});
  const views = useObservableState(viewRepository.all$, {});
  const tasks = useObservableState(taskRepository.all$, {});
  const allowedFieldType = useObservableState(
    metadataRepository.allowedFieldType$,
    [],
  );
  const [devtoolLogs, setDevtoolLogs] = useState<DevtoolLogs>({
    state: {},
    widgetState: {},
    widgetProperties: {},
  });

  const { loading } = useLoadPresenter(app);

  if (!presenter || loading) {
    return 'loading';
  }

  return (
    <BaseEditor
      value={{
        disabledPresenter: mode === 'system',
        disabledSystem: mode === 'presenter',
        state: {
          tabs,
          widgets: presenter.widgetEntities,
          nodes: presenter.nodes,
          variables: presenter.variableEntities,
          processes: presenter.processEntities,
          metadatas,
          connectors,
          environments,
          views,
          tasks,
          widgetDefinitions: presenter.widgetDefinitions,
          widgetGallery: presenter.widgetGallery,
          nodeCollapses: presenter.treeCollapseEntities,
          selectedTab,
          selectedActivityTab: presenter.selectedActivityTab,
          previewDomain: environment.previewDomain,
          presenterLabel: presenter.presenterLabel,
          rootNodeId: 'root',
          allowedFieldType: allowedFieldType,
          systemActivityTabs: [
            ActivityTab.Screens,
            ActivityTab.Widgets,
            ActivityTab.Repositories,
          ],
          presenterActivityTabs: [
            ActivityTab.Metadatas,
            ActivityTab.Connectors,
            ActivityTab.Environments,
          ],
        },
        dispatch: {
          editor: {
            chooseActivityTab: editorRepository.chooseActivityTab,
          },
          deserialization: {
            build: deserialization.build,
          },
          synchronize: {
            update:
              app.repositories.presenterRepository.synchronizeService.update.bind(
                app.repositories.presenterRepository.synchronizeService,
              ),
          },
          widget: {
            create: widgetRepository.create,
            update: widgetRepository.update,
            remove: widgetRepository.remove,
            rename: widgetRepository.rename,
            getLabels: widgetRepository.getLabels,
            validateLabel: widgetRepository.validateLabel,
          },
          node: {
            moveToBeside: nodeRepository.moveToBeside,
            moveToInside: nodeRepository.moveToInside,
            removeTreeNode: nodeRepository.removeTreeNode,
            closeTreeCollapse: nodeRepository.closeTreeCollapse,
            openTreeCollapse: nodeRepository.openTreeCollapse,
            addWidget: nodeRepository.addWidget,
            copyWidget: nodeRepository.copyWidget,
          },
          variable: {
            isUniqueId: variableRepository.isUniqueId,
            create: variableRepository.create,
            update: variableRepository.update,
            remove: variableRepository.remove,
          },
          process: {
            create: processRepository.create,
            update: processRepository.update,
            remove: processRepository.remove,
          },
          metadata: {
            create: metadataRepository.create,
            update: metadataRepository.update,
            remove: metadataRepository.remove,
          },
          connector: {
            create: connectorRepository.create,
            update: connectorRepository.update,
            remove: connectorRepository.remove,
          },
          environment: {
            create: environmentRepository.create,
            update: environmentRepository.update,
            remove: environmentRepository.remove,
          },
          view: {
            isUnique: viewRepository.isUnique,
            create: viewRepository.create,
            update: viewRepository.update,
            remove: viewRepository.remove,
          },
          tab: {
            previewWidget: (foreignId: string) =>
              tabRepository.preview('widget', foreignId),
            previewVariable: (foreignId: string) =>
              tabRepository.preview('variable', foreignId),
            previewProcess: (foreignId: string) =>
              tabRepository.preview('process', foreignId),
            previewConnector: (foreignId: string) =>
              tabRepository.preview('connector', foreignId),
            previewMetadata: (foreignId: string) =>
              tabRepository.preview('metadata', foreignId),
            previewEnvironment: (foreignId: string) =>
              tabRepository.preview('environment', foreignId),
            previewView: (foreignId: string) =>
              tabRepository.preview('view', foreignId),
            fix: tabRepository.fix,
            activeEditing: tabRepository.activeEditing,
            inactiveEditing: tabRepository.inactiveEditing,
            choose: tabRepository.choose,
            close: tabRepository.close,
          },
        },
        devtool: {
          logs: devtoolLogs,
          update: setDevtoolLogs,
        },
      }}
    />
  );
};
