import { commonSchemaValidator } from './common-schema-validator';

describe('commonSchemaValidator', () => {
  it('Should pass', () => {
    const jsonSchema = {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email',
        },
        createdAt: {
          type: 'string',
          format: 'dateTimeISO',
        },
      },
    };
    const input = {
      email: 'test@shukun.work',
      createdAt: '2023-01-08T03:21:47.392Z',
    };
    commonSchemaValidator.compile(jsonSchema).validate(input);
  });
});
