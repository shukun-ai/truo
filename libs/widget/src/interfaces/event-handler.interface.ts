import { IRepositoryManager } from './repository-manager.interface';
import { IApiRequester } from './requester.interface';
import {
  ITemplateService,
  TemplateEvaluateHelpers,
} from './template-service.interface';

export type EventHandlerContext = {
  containerId: string | null;
  repositoryManager: IRepositoryManager;
  templateService: ITemplateService;
  helpers: TemplateEvaluateHelpers;
  apiRequester: IApiRequester;
  widgetState: {
    index: number;
    item: unknown;
    payload: unknown;
  };
};
