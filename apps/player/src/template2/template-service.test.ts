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
});
