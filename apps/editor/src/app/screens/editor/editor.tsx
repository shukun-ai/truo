import { useSetState } from '@mantine/hooks';
import { Editor as BaseEditor } from '@shukun/presenter/editor-ui';

import { useObservableState } from 'observable-hooks';

import { environment } from '../../../environments/environment';
import { deserialization } from '../../../repositories/presenter/deserialization-service';
import { editorRepository } from '../../../repositories/presenter/editor-repository';
import { nodeRepository } from '../../../repositories/presenter/node-repository';
import { ActivityTab } from '../../../repositories/presenter/presenter-store';
import { repositoryRepository } from '../../../repositories/presenter/repository-repository';
import { widgetRepository } from '../../../repositories/presenter/widget-repository';
import { tabRepository } from '../../../repositories/tab/tab-repository';
import { useAppContext } from '../../contexts/app-context';

import { useLoadPresenter } from './use-load-presenter';

export type EditorProps = {
  mode: 'presenter' | 'system';
};

export const Editor = ({ mode }: EditorProps) => {
  const app = useAppContext();

  const presenter = useObservableState(widgetRepository.presenter$);
  const tabs = useObservableState(tabRepository.tabs$, {});
  const selectedTab = useObservableState(tabRepository.selectedTab$, null);
  const allowedFieldType = useObservableState(
    app.repositories.metadataRepository.allowedFieldType$,
    [],
  );
  const [monitorState, setMonitorState] = useSetState<{
    previewState: unknown;
  }>({ previewState: {} });

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
          repositories: presenter.repositoryEntities,
          metadatas: {},
          connectors: {},
          environments: {},
          tasks: {},
          widgetDefinitions: presenter.widgetDefinitions,
          widgetGallery: presenter.widgetGallery,
          repositoryDefinitions: presenter.repositoryDefinitions,
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
            ActivityTab.Watches,
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
          repository: {
            isUniqueId: repositoryRepository.isUniqueId,
            create: repositoryRepository.create,
            update: repositoryRepository.update,
            remove: repositoryRepository.remove,
          },
          metadata: {
            create: {} as any,
            update: {} as any,
            remove: {} as any,
          },
          connector: {
            create: {} as any,
            update: {} as any,
            remove: {} as any,
          },
          environment: {
            create: {} as any,
            update: {} as any,
            remove: {} as any,
          },
          tab: {
            previewWidget: (foreignId: string) =>
              tabRepository.preview('widget', foreignId),
            previewRepository: (foreignId: string) =>
              tabRepository.preview('repository', foreignId),
            previewConnector: (foreignId: string) =>
              tabRepository.preview('connector', foreignId),
            previewMetadata: (foreignId: string) =>
              tabRepository.preview('metadata', foreignId),
            previewEnvironment: (foreignId: string) =>
              tabRepository.preview('environment', foreignId),
            fix: tabRepository.fix,
            activeEditing: tabRepository.activeEditing,
            inactiveEditing: tabRepository.inactiveEditing,
            choose: tabRepository.choose,
            close: tabRepository.close,
          },
        },
        monitor: {
          previewState: monitorState.previewState,
          updatePreviewState: (state: unknown) =>
            setMonitorState({ previewState: state }),
        },
      }}
    />
  );
};
