import { toNumber } from 'lodash';
import { Token, Tokenizr } from 'ts-tokenizr';

const LEXER_TYPE_FUNCTION = 'function';
const LEXER_TYPE_STRING = 'string';
const LEXER_TYPE_NUMBER = 'number';
const LEXER_TYPE_BOOLEAN = 'boolean';
const LEXER_TYPE_NULL = 'null';

export function tokenization(value: string) {
  const lexer = new Tokenizr();

  lexer.rule(
    /^[a-zA-Z_][a-zA-Z0-9_]*[.][a-zA-Z_][a-zA-Z0-9_]*/,
    (ctx, match) => {
      ctx.accept(LEXER_TYPE_FUNCTION, match[0]);
    },
  );
  lexer.rule(/'((?:\\\\|\\{|\\}|\\'|.)*?)'/, (ctx, match) => {
    ctx.accept(LEXER_TYPE_STRING, match[1]);
  });
  lexer.rule(/[+-]?\d+\.?\d*/, (ctx, match) => {
    ctx.accept(LEXER_TYPE_NUMBER, toNumber(match[0]));
  });
  lexer.rule(/true|false/, (ctx, match) => {
    ctx.accept(LEXER_TYPE_BOOLEAN, match[0] === 'true' ? true : false);
  });
  lexer.rule(/null/, (ctx) => {
    ctx.accept(LEXER_TYPE_NULL, null);
  });
  lexer.rule(/./, (ctx) => {
    ctx.ignore();
  });

  lexer.input(value);

  let tokens: Token[];

  try {
    tokens = lexer.tokens();
  } catch (error) {
    throw new Error('We cannot parse input formula.');
  }

  const functionToken = tokens[0];

  if (functionToken.type !== LEXER_TYPE_FUNCTION) {
    throw new Error(
      'The first keyword is not function, for example use States.secret.',
    );
  }

  if (typeof functionToken.value !== 'string') {
    throw new Error('functionToken.value is not string.');
  }

  const [scopeName, methodName] = functionToken.value.split('.');

  return {
    scopeName,
    methodName,
    arguments: tokens
      .filter((token) =>
        [
          LEXER_TYPE_STRING,
          LEXER_TYPE_NUMBER,
          LEXER_TYPE_BOOLEAN,
          LEXER_TYPE_NULL,
        ].includes(token.type),
      )
      .map((token) => token.value),
  };
}
