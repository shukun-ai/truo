import sourceData from './source.test.json';
import { validateSourceSchema } from './validate';

describe('attachment', () => {
  it('validateSourceSchema', () => {
    const result = validateSourceSchema(sourceData);
    if (!result) {
      // Just convince for debug if validate gets errors
      console.error(validateSourceSchema.errors);
    }
    expect(result).toEqual(true);
  });
});
