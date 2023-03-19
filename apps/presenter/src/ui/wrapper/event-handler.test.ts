import {
  PresenterEventNavigation,
  PresenterEventSetRepository,
} from '@shukun/schema';

import { repositoryIdentifier } from '../../effects/repository/repository-manager.interface';
import { TemplateService } from '../../effects/template/template-service';

import { handleEvent } from './event-handler';

describe('EventHandler', () => {
  describe('handleEvent', () => {
    it('should change repository value, when run setRepository event without convertor.', () => {
      const event: PresenterEventSetRepository = {
        action: 'setRepository',
        target: 'simple',
        path: ['name'],
      };
      const payload = null;
      const context: any = {
        containerId: 'mockContainerId',
        repositoryManager: {
          setValue: (
            identifier: repositoryIdentifier,
            path: (string | number)[],
            value: unknown,
          ): void => {
            expect(identifier).toEqual({
              scope: 'container',
              containerId: 'mockContainerId',
              repositoryId: 'simple',
            });
            expect(path).toEqual(['name']);
            expect(value).toEqual(null);
          },
        },
        templateService: new TemplateService(),
        states: { simple: { name: 'Tom' } },
      };
      handleEvent(event, payload, context);
    });

    it('should handle navigation, when run navigation event.', () => {
      const event: PresenterEventNavigation = {
        action: 'navigation',
        page: 'about',
        search: '',
      };
      const payload = null;
      const context: any = {
        containerId: 'mockContainerId',
        repositoryManager: {
          trigger: (
            identifier: repositoryIdentifier,
            payload: unknown,
          ): void => {
            expect(identifier).toEqual({
              scope: 'app',
              containerId: 'mockContainerId',
              repositoryId: 'router',
            });
            expect(payload).toEqual({
              action: 'push',
              page: 'about',
              search: undefined,
            });
          },
        },
        templateService: new TemplateService(),
        states: { simple: { name: 'Tom' } },
      };
      handleEvent(event, payload, context);
    });
  });
});
