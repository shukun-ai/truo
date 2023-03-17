import { PresenterEvent } from '@shukun/schema';

import { EventQueue } from './event-queue';

describe('EventQueue', () => {
  describe('emit', () => {
    it('emit and handle set repository.', () => {
      const RepositoryManager = jest.fn();
      const repositoryManager = new RepositoryManager();
      repositoryManager.setValue = (...args: unknown[]) => {
        expect(args).toEqual(['MockRepository', ['click'], { name: 'Bob' }]);
      };

      const eventQueue = new EventQueue(repositoryManager);
      const event: PresenterEvent = {
        action: 'setRepository',
        target: 'MockRepository',
        path: ['click'],
      };
      const payload = { name: 'Bob' };
      eventQueue.emit(event, payload);
    });
  });
});
