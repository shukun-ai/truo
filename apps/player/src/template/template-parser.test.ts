import { TemplateParser } from './template-parser';

describe('TemplateParser', () => {
  describe('parse', () => {
    it('should return literal', () => {
      const output = new TemplateParser().parse('{{currentUser.name}}');
      expect(output).toEqual({
        texts: [' ', ' '],
        codes: [
          {
            code: 'currentUser.name',
            identifiers: ['currentUser'],
          },
        ],
      });
    });

    it('should return literal', () => {
      const output = new TemplateParser().parse('Hello {{currentUser.name}}!');
      expect(output).toEqual({
        texts: ['Hello ', '!'],
        codes: [
          {
            code: 'currentUser.name',
            identifiers: ['currentUser'],
          },
        ],
      });
    });

    it('should return literal', () => {
      const output = new TemplateParser().parse('Hello {{`hi`}}!');
      expect(output).toEqual({
        texts: ['Hello ', '!'],
        codes: [
          {
            code: '`hi`',
            identifiers: [],
          },
        ],
      });
    });

    it('should return literal', () => {
      const output = new TemplateParser().parse(
        'Hello {{currentUser.name}}, my role is {{role.name}}!',
      );
      expect(output).toEqual({
        texts: ['Hello ', ', my role is ', '!'],
        codes: [
          { code: 'currentUser.name', identifiers: ['currentUser'] },
          { code: 'role.name', identifiers: ['role'] },
        ],
      });
    });
  });
});
