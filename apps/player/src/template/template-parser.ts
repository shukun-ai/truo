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
    const codes: Literal['codes'] = [];

    for (const token of tokens) {
      if (token.type === this.TEXT) {
        texts.push(token.text);
      }
      if (token.type === this.CODE) {
        const text = token.text;
        const code = this.getCode(text);
        const identifiers = this.getIdentifiers(code);
        codes.push({
          code,
          identifiers,
        });
      }
    }

    return {
      texts,
      codes,
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

  private getIdentifiers(code: string): string[] {
    const identifiers = new EsIdentifier().parse(code);
    return identifiers;
  }
}
