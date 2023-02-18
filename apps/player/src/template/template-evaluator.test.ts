import { TemplateEvaluator } from './template-evaluator';

describe('TemplateEvaluator', () => {
  describe('evaluate', () => {
    it('should ', () => {
      const value = new TemplateEvaluator().evaluate(
        {
          texts: ['Hello ', ', my role is ', '!'],
          codes: [
            { code: 'currentUser.name', identifiers: ['currentUser'] },
            { code: 'role.name', identifiers: ['role'] },
          ],
        },
        ['Bob', 'admin'],
      );
      expect(value).toEqual('Hello Bob, my role is admin!');
    });
  });
});
