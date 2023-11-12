import { select, setProps } from '@ngneat/elf';
import {
  addEntities,
  deleteEntities,
  getAllEntitiesApply,
  selectEntitiesCount,
  setEntities,
  updateEntities,
} from '@ngneat/elf-entities';

import { ViewSchema, ViewType } from '@shukun/schema';

import { IApiRequester } from '../../apis/requester.interface';

import { ViewEntity, viewRef, createViewEntityId, getView } from './view-ref';
import { viewStore } from './view-store';

export const viewRepository = {
  all$: viewStore.pipe(select((state) => state.viewEntities)),

  count$: viewStore.pipe(selectEntitiesCount({ ref: viewRef })),

  initialize: async (apiRequester: IApiRequester) => {
    const response = await apiRequester.developerRequester.pullViews();

    const entities: ViewEntity[] = Object.entries(response.data.value).map(
      ([viewName, view]) => ({
        id: createViewEntityId(viewName),
        viewName,
        ...view,
      }),
    );
    viewStore.update(
      setEntities(entities, { ref: viewRef }),
      setProps(() => ({
        initialized: true,
      })),
    );
  },

  createPush: (apiRequester: IApiRequester): (() => Promise<void>) => {
    return async (): Promise<void> => {
      const entities = viewStore.query(
        getAllEntitiesApply({
          ref: viewRef,
        }),
      );

      const views: Record<string, ViewSchema> = entities.reduce(
        (total, current) => {
          return {
            ...total,
            [current.name]: getView(current),
          };
        },
        {},
      );

      await apiRequester.developerRequester.pushViews(views);
    };
  },

  isUnique: (viewName: string): boolean => {
    const existEntity = viewStore.query(
      getAllEntitiesApply({
        filterEntity: (item) => item.viewName === viewName,
        ref: viewRef,
      }),
    );

    return existEntity.length === 1;
  },

  create: (viewName: string): void => {
    const entity: ViewEntity = {
      id: createViewEntityId(viewName),
      viewName,
      name: viewName,
      label: viewName,
      type: ViewType.Simple,
      isVisible: true,
      priority: 0,
    };
    viewStore.update(addEntities(entity, { ref: viewRef }));
  },

  update: (entity: ViewEntity): void => {
    viewStore.update(
      updateEntities(
        entity.id,
        {
          ...entity,
        },
        { ref: viewRef },
      ),
    );
  },

  remove: (entityId: string): void => {
    viewStore.update(deleteEntities(entityId, { ref: viewRef }));
  },
};
