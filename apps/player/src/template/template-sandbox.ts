import { Literal } from './template-literal.interface';

export class TemplateSandbox {
  private DEPENDENCIES_SCOPE = '$$__SCOPE__$$';

  execute(code: Literal['codes'][number], imports: unknown[]) {
    const dependencies = this.getDependencies(code, imports);
    const run = new Function(
      this.DEPENDENCIES_SCOPE,
      this.wrapCode(code.code, dependencies),
    );
    const value = run(dependencies);
    return value;
  }

  private wrapCode(code: string, dependencies: Record<string, unknown>) {
    const keys = Object.keys(dependencies).join(',');
    return `const {${keys}} = ${this.DEPENDENCIES_SCOPE}; return ${code};`;
  }

  private getDependencies(
    code: Literal['codes'][number],
    imports: unknown[],
  ): Record<string, unknown> {
    const dependencies: Record<string, unknown> = {};

    imports.forEach((next, index) => {
      const name = code.identifiers[index];
      dependencies[name] = next;
    });

    return dependencies;
  }
}
