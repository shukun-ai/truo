import { select } from '@ngneat/elf';
import { getAllEntitiesApply, selectAllEntities } from '@ngneat/elf-entities';
import { PresenterWidgets } from '@shukun/schema';

import { Observable, distinctUntilChanged, map } from 'rxjs';

import { ApiRequester } from '../../apis/requester';

import { write } from '../mutations';

import { ContainerRepository } from './container-repository';
import { IPresenterRepository } from './presenter-repository.interface';
import { presenterStore } from './presenter-store';
import { TabRepository } from './tab-repository';
import { widgetRef } from './widget-ref';
import { WidgetRepository } from './widget-repository';

export class PresenterRepository implements IPresenterRepository {
  private readonly presenterStore = presenterStore;

  containerRepository = new ContainerRepository();

  widgetRepository = new WidgetRepository();

  tabRepository = new TabRepository();

  widgetDefinitions$ = this.presenterStore.pipe(
    select((state) => state.widgetDefinitions),
  );

  selectedContainerId$ = this.presenterStore.pipe(
    select((state) => state.selectedContainerId),
  );

  selectedWidgetId$ = this.presenterStore.pipe(
    select((state) => state.selectedWidgetId),
  );

  selectedWidgets$: Observable<PresenterWidgets> = this.presenterStore
    .combine({
      selectedContainerId: this.presenterStore.pipe(
        select((state) => state.selectedContainerId),
      ),
      widgets: this.presenterStore.pipe(selectAllEntities({ ref: widgetRef })),
    })
    .pipe(
      map(({ selectedContainerId }) => {
        return this.presenterStore.query(
          getAllEntitiesApply({
            filterEntity: (entity) =>
              entity.containerId === selectedContainerId,
            ref: widgetRef,
          }),
        );
      }),
      map((widgets) => {
        const selectedWidgets: PresenterWidgets = {};
        widgets.forEach((widget) => {
          selectedWidgets[widget.id] = widget;
        });
        return selectedWidgets;
      }),
      distinctUntilChanged(),
    );

  constructor(private readonly apiRequester: ApiRequester) {}

  async fetchLatest(presenterName: string) {
    const response = await this.apiRequester.editorRequester.getPresenter();
    const presenter = response.data.value[presenterName];
    if (!presenter) {
      throw new Error('Did not find presenter.');
    }
    this.containerRepository.initialize(presenter);
    this.widgetRepository.upsertByContainer(presenter);
  }

  selectedWidget(widgetId: string) {
    this.presenterStore.update(
      write((state) => (state.selectedWidgetId = widgetId)),
    );
  }
}
