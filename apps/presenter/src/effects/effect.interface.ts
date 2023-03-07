import { IApiRequester } from './apis/requester.interface';
import { ConfigDefinitions } from './loaders/config-manager.interface';
import { ILoader } from './loaders/loader.interface';
import { CurrentUserRepository } from './repositories/current-user-repository';
import { RouterRepository } from './repositories/router-repository';
import { CustomRepositoryService } from './repository/custom-repository-service';
import { IRepositoryManager } from './repository/repository-manager.interface';
import { IAuthStorage } from './storages/auth-storage.interface';
import { ITemplateService } from './template/template-service.interface';

export type EffectInjector = {
  authStorage: IAuthStorage;
  apiRequester: IApiRequester;
  loader: ILoader;
  repositoryManager: IRepositoryManager;
  customRepositoryService: CustomRepositoryService;
  templateService: ITemplateService;
  routerRepository: RouterRepository;
  currentUserRepository: CurrentUserRepository;
  definitions: ConfigDefinitions;
  presenterContext: {
    orgName: string;
    appName: string;
  };
};
