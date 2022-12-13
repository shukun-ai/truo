import { Injectable } from '@nestjs/common';

@Injectable()
export class CompilerHelperService {
  LEFT_TAG = '<%%';

  RIGHT_TAG = '%%>';

  compileJsonTemplate(input: unknown): string {
    return this.replaceExpressionTag(
      this.stringify(this.compileJsonExpression(input)),
    );
  }

  compileExpression(input: string): string {
    // input: "Hello ${$.input}"
    return `${this.LEFT_TAG}${this.checkInjection(input)}${this.RIGHT_TAG}`;
  }

  checkInjection(input: string): string {
    // TODO throw error
    return input;
  }

  replaceExpressionTag(input: string): string {
    return input
      .replaceAll(`"${this.LEFT_TAG}`, '')
      .replaceAll(`${this.RIGHT_TAG}"`, '');
  }

  compileJsonExpression(input: unknown): unknown {
    if (typeof input === 'string') {
      return this.compileExpression(input);
    }

    if (typeof input === 'object' && Array.isArray(input)) {
      return input.map((item) => this.compileJsonExpression(item));
    }

    if (typeof input === 'object' && input !== null) {
      const newInput: Record<string, unknown> = {};
      for (const [key, item] of Object.entries(input)) {
        newInput[key] = this.compileJsonExpression(item);
      }
      return newInput;
    }

    return input;
  }

  stringify(input: unknown): string {
    return JSON.stringify(input);
  }
}
