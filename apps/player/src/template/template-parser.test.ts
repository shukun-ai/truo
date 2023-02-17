import { TemplateParser } from './template-parser';

describe('TemplateParser', () => {
  describe('parse', () => {
    it('should return literal', () => {
      const output = new TemplateParser().parse('{{currentUser.name}}');
      expect(output).toEqual({
        texts: [' ', ' '],
        codes: ['currentUser.name'],
        dependencies: ['currentUser'],
      });
    });

    it('should return literal', () => {
      const output = new TemplateParser().parse('Hello {{currentUser.name}}!');
      expect(output).toEqual({
        texts: ['Hello ', '!'],
        codes: ['currentUser.name'],
        dependencies: ['currentUser'],
      });
    });

    it('should return literal', () => {
      const output = new TemplateParser().parse('Hello {{`hi`}}!');
      expect(output).toEqual({
        texts: ['Hello ', '!'],
        codes: ['`hi`'],
        dependencies: [],
      });
    });

    it('should return literal', () => {
      const output = new TemplateParser().parse(
        'Hello {{currentUser.name}}, my role is {{role.name}}!',
      );
      expect(output).toEqual({
        texts: ['Hello ', ', my role is ', '!'],
        codes: ['currentUser.name', 'role.name'],
        dependencies: ['currentUser', 'role'],
      });
    });
  });
});
