import { TemplateSandbox } from './template-sandbox';

describe('TemplateSandbox', () => {
  describe('execute', () => {
    it('should return value, when one scope.', () => {
      const currentUser = { name: 'Bob' };
      const value = new TemplateSandbox().execute(
        {
          code: 'currentUser.name',
          identifiers: ['currentUser'],
        },
        [currentUser],
      );

      expect(value).toEqual('Bob');
    });

    it('should return value, when two scopes.', () => {
      const currentUser = { name: 'Bob' };
      const role = { name: 'admin' };
      const value = new TemplateSandbox().execute(
        {
          code: 'currentUser.name + ` role is ` + role.name',
          identifiers: ['currentUser', 'role'],
        },
        [currentUser, role],
      );

      expect(value).toEqual('Bob role is admin');
    });
  });
});
