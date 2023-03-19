import { TemplateDependencies } from '../template-service.interface';

export class CodeExecutor {
  public run(code: string, dependency: TemplateDependencies[number]): unknown {
    return this.executeCode(code, dependency);
  }

  private executeCode(
    code: string,
    dependency: TemplateDependencies[number],
  ): unknown {
    const run = new Function('$', '$$', this.wrapCode(code));
    const $ = dependency.repositories ?? {};
    const $$ = dependency.helpers ?? {};

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
