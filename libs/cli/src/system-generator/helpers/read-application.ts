import { readFile } from 'fs/promises';
import { join } from 'path';

import { ApplicationSchema } from '@shukun/schema';

export async function readApplication(
  inputPath: string,
): Promise<ApplicationSchema> {
  const application = await readFile(join(inputPath, 'application.json'), {
    encoding: 'utf-8',
  });

  const json: ApplicationSchema = JSON.parse(application);
  delete json.$schema;
  return json;
}
