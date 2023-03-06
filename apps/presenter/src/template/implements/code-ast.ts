import { parse, Node } from 'acorn';
import { full } from 'acorn-walk';

export class CodeAst {
  parse(esCode: string): Node {
    return parse(esCode, { ecmaVersion: 2020 });
  }

  getDependencies(ast: Node): { repositories: string[]; helpers: string[] } {
    const repositories = new Set<string>();
    const helpers = new Set<string>();

    full(ast, (node) => {
      // TODO need to refactor nested if and any.
      if (node.type === 'MemberExpression') {
        if ((node as any)?.object?.name === '$') {
          const name = (node as any)?.property?.name;
          if (name) {
            repositories.add(name);
          }
        }
        if ((node as any)?.object?.name === '$$') {
          const name = (node as any)?.property?.name;
          if (name) {
            helpers.add(name);
          }
        }
      }
    });

    return {
      repositories: [...repositories],
      helpers: [...helpers],
    };
  }
}
