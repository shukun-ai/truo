import { setProp, setProps } from '@ngneat/elf';
import { upsertEntities } from '@ngneat/elf-entities';
import { PresenterSchema } from '@shukun/schema';

import { presenterStore } from './presenter-store';
import { PresenterRepositoryEntity, repositoryRef } from './repository-ref';
import { PresenterWidgetEntity, widgetRef } from './widget-ref';

export const serialization = {
  parse(presenter: PresenterSchema): void {
    const { initialized } = presenterStore.getValue();

    if (initialized) {
      return;
    }

    const widgetEntities = getWidgetEntities(presenter);
    const repositoryEntities = getRepositoryEntities(presenter);

    presenterStore.update(
      setProps(() => ({ initialized: true, presenterLabel: presenter.label })),
      upsertEntities(widgetEntities, { ref: widgetRef }),
      upsertEntities(repositoryEntities, { ref: repositoryRef }),
      setProp('nodes', presenter.nodes),
    );
  },
};

const getWidgetEntities = (
  presenter: PresenterSchema,
): PresenterWidgetEntity[] => {
  const widgetEntities: PresenterWidgetEntity[] = [];

  for (const [widgetId, widget] of Object.entries(presenter.widgets)) {
    widgetEntities.push({
      ...widget,
      id: widgetId,
    });
  }

  return widgetEntities;
};

const getRepositoryEntities = (
  presenter: PresenterSchema,
): PresenterRepositoryEntity[] => {
  const repositoryEntities: PresenterRepositoryEntity[] = [];

  for (const [repositoryId, repository] of Object.entries(
    presenter.repositories,
  )) {
    repositoryEntities.push({
      ...repository,
      id: repositoryId,
    });
  }

  return repositoryEntities;
};
