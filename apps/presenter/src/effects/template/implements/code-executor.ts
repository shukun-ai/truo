import { TemplateDependencies } from '../template-service.interface';

export class CodeExecutor {
  public run(code: string, dependencies: TemplateDependencies): unknown {
    return this.executeCode(code, dependencies);
  }

  private executeCode(
    code: string,
    dependencies: TemplateDependencies,
  ): unknown {
    const run = new Function('$', '$$', this.wrapCode(code));
    const $ = dependencies.repositories ?? {};
    const $$ = dependencies.helpers ?? {};

    const value = run($, $$);
    return value;
  }

  private wrapCode(code: string) {
    return `
            function main () {
                ${code}
            }
            return main();
        `;
  }
}
