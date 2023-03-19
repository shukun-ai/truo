import { Tokenizr } from 'ts-tokenizr';

import { TemplateLiteral } from '../template-service.interface';

export class TemplateParser {
  CODE_START_TAG = 'CODE_START_TAG';
  CODE_END_TAG = 'CODE_END_TAG';
  CODE = 'CODE';
  TEXT = 'TEXT';

  parse(template: string): TemplateLiteral {
    const lexer = new Tokenizr();

    lexer.rule(/{{[^{{]*}}/, (ctx, match) => {
      ctx.accept(this.CODE, match[1]);
    });
    lexer.rule(/[^{{}}]*/, (ctx, match) => {
      ctx.accept(this.TEXT, match[1]);
    });

    lexer.input(template);
    const tokens = lexer.tokens();

    const texts: string[] = [];
    const codes: string[] = [];

    if (template.startsWith('{{')) {
      texts.push('');
    }

    for (const token of tokens) {
      if (token.type === this.TEXT) {
        texts.push(token.text);
      }
      if (token.type === this.CODE) {
        const text = token.text;
        const code = this.removeCodeTag(text);
        codes.push(code);
      }
    }

    if (template.endsWith('}}')) {
      texts.push('');
    }

    return {
      raw: this.getRaw(texts),
      texts,
      codes: this.getCodes(codes),
    };
  }

  private getRaw(texts: string[]) {
    return texts.length === 2 && texts.every((text) => text === '');
  }

  private getCodes(codes: string[]): TemplateLiteral['codes'] {
    return codes.map((code) => {
      return {
        code,
      };
    });
  }

  private removeCodeTag(code: string) {
    return code.substring(2, code.length - 2).trim();
  }
}
