import { join } from 'path';

import { SystemGenerator } from './system-generate';

describe('Generate', () => {
  it('generate', async () => {
    const systemGenerator = new SystemGenerator();
    const output = await systemGenerator.generate({
      inputPath: join(__dirname, '../__mock__/input'),
    });

    expect(JSON.parse(output)).toMatchObject({ title: 'SHUKUN MOCK' });
  });
});
