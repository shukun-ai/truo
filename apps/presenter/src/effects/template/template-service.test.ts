import { TemplateService } from './template-service';

describe('TemplateService', () => {
  describe('run', () => {
    it('Pure text', () => {
      expect(
        new TemplateService().run(
          'About is pure text.',
          {
            currentUser: {
              age: 26,
            },
          },
          {},
        ),
      ).toEqual('About is pure text.');
    });

    it('One parameter and it is a integer', () => {
      expect(
        new TemplateService().run(
          '${$.currentUser.age}',
          {
            currentUser: {
              age: 26,
            },
          },
          {},
        ),
      ).toEqual(26);
    });

    it('Two parameter', () => {
      expect(
        new TemplateService().run(
          '${ $.currentUser.name + " is " + $.role.name }',
          {
            currentUser: {
              name: 'Bob',
            },
            role: {
              name: 'admin',
            },
          },
          {},
        ),
      ).toEqual('Bob is admin');
    });

    it('Template literal.', () => {
      expect(
        new TemplateService().run(
          '${ `${$.currentUser.name} is ${$.role.name}` }',
          {
            currentUser: {
              name: 'Bob',
            },
            role: {
              name: 'admin',
            },
          },
          {},
        ),
      ).toEqual('Bob is admin');
    });

    it('One parameter with string', () => {
      expect(
        new TemplateService().run(
          'Name: ${$.currentUser.name}',
          {
            currentUser: {
              name: 'Bob',
            },
          },
          {},
        ),
      ).toEqual('Name: Bob');
    });

    it('Raw object.', () => {
      expect(
        new TemplateService().run(
          '${{ key: $.currentUser.name }}',
          {
            currentUser: {
              name: 'Bob',
            },
          },
          {},
        ),
      ).toEqual({ key: 'Bob' });
    });

    it('Closure', () => {
      expect(
        new TemplateService().run(
          '${ (() => { return $.currentUser.name })() }',
          {
            currentUser: {
              name: 'Bob',
            },
          },
          {},
        ),
      ).toEqual('Bob');
    });

    it('Closure', () => {
      expect(
        new TemplateService().run(
          '${ $$.get($.currentUser, "name") }',
          {
            currentUser: {
              name: 'Bob',
            },
          },
          {
            get: (value: any, prop: string) => {
              return value[prop];
            },
          },
        ),
      ).toEqual('Bob');
    });
  });
});
