import { parse } from 'acorn';
import { ancestor } from 'acorn-walk';

import { IdentifierNode } from './es-tree.interface';

export class EsIdentifier {
  parse(esCode: string) {
    const ast = parse(esCode, { ecmaVersion: 2020 });

    const identifiers = new Set<string>();

    ancestor(ast, {
      Identifier(node: IdentifierNode) {
        identifiers.add(node.name);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    return [...identifiers];
  }
}
