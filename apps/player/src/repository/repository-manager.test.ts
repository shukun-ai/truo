import { TypeException } from '@shukun/exception';
import { PlayerRepository } from '@shukun/schema';
import { skip } from 'rxjs';

import { SimpleRepository } from './repositories/simple-repository';

import { RepositoryManager } from './repository-manager';

describe('RepositoryManager', () => {
  const RouterRepository = jest.fn();

  describe('register', () => {
    it('register', () => {
      const repositoryManager = new RepositoryManager();
      repositoryManager.register({
        textDisplay: { type: 'Simple' },
      });

      expect(repositoryManager.get('textDisplay')).toBeInstanceOf(
        SimpleRepository,
      );
    });

    it('unregister', () => {
      const playerRepositories: Record<string, PlayerRepository> = {
        textDisplay: { type: 'Simple' },
      };
      const repositoryManager = new RepositoryManager();
      repositoryManager.register(playerRepositories);
      repositoryManager.unregister(playerRepositories);

      expect(() => repositoryManager.get('textDisplay')).toThrow(
        new TypeException('Did not defined repository'),
      );
    });

    it('set and get values', () => {
      const repositoryManager = new RepositoryManager();
      repositoryManager.register({
        textDisplay: { type: 'Simple' },
        group: { type: 'Simple' },
        role: { type: 'Simple' },
      });

      repositoryManager.setValue('textDisplay', ['names', 0, 'value'], 'Bob');
      repositoryManager.setValue('role', ['names'], ['admin']);
      const values = repositoryManager.getValues([
        'textDisplay',
        'group',
        'role',
        'neverRegisterMock',
      ]);

      expect(values).toEqual({
        textDisplay: { names: [{ value: 'Bob' }] },
        group: {},
        role: { names: ['admin'] },
        neverRegisterMock: {},
      });
    });

    it('observable and set values', (done) => {
      const repositoryManager = new RepositoryManager();
      repositoryManager.register({
        textDisplay: { type: 'Simple' },
        group: { type: 'Simple' },
        role: { type: 'Simple' },
      });

      repositoryManager
        .combineQueries(['textDisplay', 'group', 'role', 'neverRegisterMock'])
        .pipe(skip(1)) // The first subscribe is empty value.
        .subscribe((values) => {
          expect(values).toEqual({
            textDisplay: { names: [{ value: 'Bob' }] },
            group: {},
            role: { names: ['admin'] },
            neverRegisterMock: {},
          });
          done();
        });

      repositoryManager.setValue('textDisplay', ['names', 0, 'value'], 'Bob');
      repositoryManager.setValue('role', ['names'], ['admin']);
    });

    it('reset', () => {
      const repositoryManager = new RepositoryManager();
      repositoryManager.register({
        textDisplay: { type: 'Simple' },
        role: { type: 'Simple' },
      });
      repositoryManager.setValue('textDisplay', ['names', 0, 'value'], 'Bob');
      repositoryManager.setValue('role', ['names'], ['admin']);
      expect(repositoryManager.getValues(['textDisplay', 'role'])).toEqual({
        textDisplay: { names: [{ value: 'Bob' }] },
        role: { names: ['admin'] },
      });
      repositoryManager.resetValue('textDisplay');
      expect(repositoryManager.getValues(['textDisplay', 'role'])).toEqual({
        textDisplay: {},
        role: { names: ['admin'] },
      });
    });
  });
});
