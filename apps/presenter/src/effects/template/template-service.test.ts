import { TemplateService } from './template-service';

describe('TemplateService', () => {
  describe('parse', () => {
    it('one repository dependent in a code.', () => {
      expect(new TemplateService().parse(`{{ $.currentUser.name }}`)).toEqual({
        raw: true,
        texts: ['', ''],
        codes: [
          {
            code: '$.currentUser.name',
            repositories: ['currentUser'],
            helpers: [],
          },
        ],
      });
    });

    it('two repository dependent in a code.', () => {
      expect(
        new TemplateService().parse(`{{ $.currentUser.name + $.role.name }}`),
      ).toEqual({
        raw: true,
        texts: ['', ''],
        codes: [
          {
            code: '$.currentUser.name + $.role.name',
            repositories: ['currentUser', 'role'],
            helpers: [],
          },
        ],
      });
    });

    it('two repository dependent in two code.', () => {
      expect(
        new TemplateService().parse(
          `{{ $.currentUser.name }} is {{ $.role.name }}`,
        ),
      ).toEqual({
        raw: false,
        texts: ['', ' is ', ''],
        codes: [
          {
            code: '$.currentUser.name',
            repositories: ['currentUser'],
            helpers: [],
          },
          {
            code: '$.role.name',
            repositories: ['role'],
            helpers: [],
          },
        ],
      });
    });

    it('one repository and helpers dependent in a code.', () => {
      expect(
        new TemplateService().parse('{{ $$.get($.currentUser, "name") }}'),
      ).toEqual({
        raw: true,
        texts: ['', ''],
        codes: [
          {
            code: '$$.get($.currentUser, "name")',
            repositories: ['currentUser'],
            helpers: ['get'],
          },
        ],
      });
    });
  });

  describe('evaluate', () => {
    it('two codes.', () => {
      const output = new TemplateService().evaluate(
        {
          raw: false,
          texts: ['', ' is ', ''],
          codes: [
            {
              code: '$.currentUser.name',
              repositories: ['currentUser'],
              helpers: [],
            },
            {
              code: '$.role.name',
              repositories: ['role'],
              helpers: [],
            },
          ],
        },
        {
          repositories: {
            currentUser: { name: 'Bob' },
            role: { name: 'admin' },
          },
        },
      );
      expect(output).toEqual('Bob is admin');
    });

    it('one repository and one helper.', () => {
      const output = new TemplateService().evaluate(
        {
          raw: true,
          texts: ['', ''],
          codes: [
            {
              code: '$$.get($.currentUser, "name")',
              repositories: ['currentUser'],
              helpers: ['get'],
            },
          ],
        },
        {
          repositories: {
            currentUser: { name: 'Bob' },
          },
          helpers: {
            get: (target: Record<string, string>, path: string) => {
              return target[path];
            },
          },
        },
      );
      expect(output).toEqual('Bob');
    });

    it('return number, if raw.', () => {
      const output = new TemplateService().evaluate(
        {
          raw: true,
          texts: ['', ''],
          codes: [
            {
              code: '$.currentUser.latitude',
              repositories: ['currentUser'],
              helpers: [],
            },
          ],
        },
        {
          repositories: {
            currentUser: { latitude: 22.3085407 },
          },
        },
      );
      expect(output).toEqual(22.3085407);
    });
  });

  describe('analyzeCode', () => {
    it('should return codeSubstances.', () => {
      expect(
        new TemplateService().executeCode(
          // eslint-disable-next-line no-template-curly-in-string
          'return `${$.currentUser.name} is ${$.currentUser.age}.`',
          {
            repositories: {
              currentUser: { name: 'Bob', age: '26' },
            },
          },
        ),
      ).toEqual('Bob is 26.');
    });
  });
});
