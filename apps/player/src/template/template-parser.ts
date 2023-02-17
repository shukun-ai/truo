import { Tokenizr } from 'ts-tokenizr';

import { EsIdentifier } from './es-identifier';

import { Literal } from './template-literal.interface';

export class TemplateParser {
  CODE_START_TAG = 'CODE_START_TAG';
  CODE_END_TAG = 'CODE_END_TAG';
  CODE = 'CODE';
  TEXT = 'TEXT';

  parse(template: string): Literal {
    const lexer = new Tokenizr();

    lexer.rule(/{{[^{{]*}}/, (ctx, match) => {
      ctx.accept(this.CODE, match[1]);
    });

    lexer.rule(/[^{{}}]*/, (ctx, match) => {
      ctx.accept(this.TEXT, match[1]);
    });

    lexer.input(this.getTemplate(template));
    const tokens = lexer.tokens();

    const texts: string[] = [];
    const codes: string[] = [];

    for (const token of tokens) {
      if (token.type === this.TEXT) {
        texts.push(token.text);
      }
      if (token.type === this.CODE) {
        const code = token.text;
        codes.push(this.getCode(code));
      }
    }

    const dependencies = this.getDependencies(codes);

    return {
      texts,
      codes,
      dependencies,
    };
  }

  private getCode(code: string) {
    return code.substring(2, code.length - 2);
  }

  private getTemplate(template: string) {
    let newTemplate = template;
    if (template.startsWith('{{')) {
      newTemplate = ` ${newTemplate}`;
    }
    if (template.endsWith('}}')) {
      newTemplate = `${newTemplate} `;
    }
    return newTemplate;
  }

  private getDependencies(codes: string[]) {
    const dependencies = new Set<string>();

    codes.forEach((code) => {
      const identifiers = new EsIdentifier().parse(code);
      identifiers.forEach((identifier) => dependencies.add(identifier));
    });

    return [...dependencies];
  }
}
