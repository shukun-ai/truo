import { PresenterEvent } from '@shukun/schema';

import { IRepositoryManager } from './repository-manager.interface';
import { IApiRequester } from './requester.interface';
import { IStore } from './store.interface';
import {
  ITemplateService,
  TemplateEvaluateHelpers,
} from './template-service.interface';

export interface IEventManager {
  handleEvents(events: PresenterEvent[], state: EventManagerState): void;
}

export type EventManagerContext = {
  store: IStore;
  repositoryManager: IRepositoryManager;
  templateService: ITemplateService;
  helpers: TemplateEvaluateHelpers;
  apiRequester: IApiRequester;
};

export type EventManagerState = {
  index: number;
  item: unknown;
  payload: unknown;
  containerId: string | null;
};
