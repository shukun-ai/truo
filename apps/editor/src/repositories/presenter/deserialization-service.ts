import { PresenterSchema } from '@shukun/schema';

import { presenterStore } from './presenter-store';

export const deserialization = {
  build(): PresenterSchema {
    const state = presenterStore.getValue();

    const presenter: PresenterSchema = {
      label: state.presenterLabel,
      widgets: omitEntityId(state.widgetEntities),
      nodes: state.nodes,
      repositories: omitEntityId(state.repositoryEntities),
    };
    return presenter;
  },
};

const omitEntityId = <T extends { id: string; [key: string]: any }>(
  entities: Record<string, T>,
): Record<string, Omit<T, 'id'>> => {
  const newEntities: Record<string, Omit<T, 'id'>> = {};
  for (const [entityId, entity] of Object.entries(entities)) {
    const { id, ...other } = entity;
    newEntities[entityId] = other;
  }
  return newEntities;
};
