import { join } from 'path';

import { generate } from './generate';

describe('Generate', () => {
  it('generate', async () => {
    const output = await generate({
      inputPath: join(__dirname, '../__mock__/input'),
    });

    expect(JSON.parse(output)).toMatchObject({ title: 'SHUKUN MOCK' });
  });
});
