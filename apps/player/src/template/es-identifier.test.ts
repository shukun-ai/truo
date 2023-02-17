import { EsIdentifier } from './es-identifier';

describe('EsIdentifier', () => {
  describe('getAst', () => {
    it('should return currentUser when single variable.', () => {
      const output = new EsIdentifier().parse('currentUser.name');
      expect(output).toEqual(['currentUser']);
    });

    it('should return currentUser when single variable2.', () => {
      const output = new EsIdentifier().parse(
        'currentUser.name || currentUser.token',
      );
      expect(output).toEqual(['currentUser']);
    });

    it('should return currentUser when single variable3.', () => {
      const output = new EsIdentifier().parse('currentUser.name || role.name');
      expect(output).toEqual(['currentUser', 'role']);
    });

    it('should return currentUser when single variable3.', () => {
      const output = new EsIdentifier().parse('() => currentUser.name');
      expect(output).toEqual(['currentUser']);
    });

    it('should return currentUser when single variable3.', () => {
      const output = new EsIdentifier().parse(
        'const yourName = (event) => currentUser.names[0]',
      );
      // @remark The yourName and event are not used, so it's not a dependencies.
      expect(output).toEqual(['currentUser']);
    });

    it('should return currentUser when single variable3.', () => {
      const output = new EsIdentifier().parse(
        'const yourName = (event) => currentUser.names[event.detail.index]',
      );
      expect(output).toEqual(['currentUser', 'event']);
    });

    it('should return currentUser when single variable3.', () => {
      const output = new EsIdentifier().parse(
        `const yourName = (event) => {
            const name = event.name;
            return currentUser.name ? currentUser.name : name;
          }`,
      );
      expect(output).toEqual(['event', 'currentUser', 'name']);
    });

    it('should return currentUser when single variable3.', () => {
      expect(() => new EsIdentifier().parse('const = (event) =>')).toThrow();
    });
  });
});
