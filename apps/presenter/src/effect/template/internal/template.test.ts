import { parseParameters } from './template';

describe('parseParameters', () => {
  describe('run', () => {
    it('Pure text', () => {
      expect(
        parseParameters('About is pure text.', {
          state: {
            currentUser: {
              age: 26,
            },
          },
          helpers: {},
        }),
      ).toEqual('About is pure text.');
    });

    it('One parameter and it is a integer', () => {
      expect(
        parseParameters('$$_js:return $.currentUser.age;', {
          state: {
            currentUser: {
              age: 26,
            },
          },
          helpers: {},
        }),
      ).toEqual(26);
    });

    it('Two parameter', () => {
      expect(
        parseParameters(
          '$$_js:return $.currentUser.name + " is " + $.role.name;',
          {
            state: {
              currentUser: {
                name: 'Bob',
              },
              role: {
                name: 'admin',
              },
            },
            helpers: {},
          },
        ),
      ).toEqual('Bob is admin');
    });

    it('Template literal.', () => {
      expect(
        parseParameters(
          '$$_js:return `${$.currentUser.name} is ${$.role.name}`;',
          {
            state: {
              currentUser: {
                name: 'Bob',
              },
              role: {
                name: 'admin',
              },
            },
            helpers: {},
          },
        ),
      ).toEqual('Bob is admin');
    });

    it('One parameter with string', () => {
      expect(
        parseParameters('$$_js:return "Name: " + $.currentUser.name;', {
          state: {
            currentUser: {
              name: 'Bob',
            },
          },
          helpers: {},
        }),
      ).toEqual('Name: Bob');
    });

    it('Raw object.', () => {
      expect(
        parseParameters('$$_js:return { key: $.currentUser.name }', {
          state: {
            currentUser: {
              name: 'Bob',
            },
          },
          helpers: {},
        }),
      ).toEqual({ key: 'Bob' });
    });

    it('Closure', () => {
      expect(
        parseParameters(
          '$$_js:return (() => { return $.currentUser.name })();',
          {
            state: {
              currentUser: {
                name: 'Bob',
              },
            },
            helpers: {},
          },
        ),
      ).toEqual('Bob');
    });

    it('Closure', () => {
      expect(
        parseParameters('$$_js:return $$.get($.currentUser, "name");', {
          state: {
            currentUser: {
              name: 'Bob',
            },
          },
          helpers: {
            get: (value: any, prop: string) => {
              return value[prop];
            },
          },
        }),
      ).toEqual('Bob');
    });
  });
});
