import { readFile } from 'fs/promises';

import { ApplicationSchema } from '@shukun/schema';

export async function readApplication(
  inputFile: string,
): Promise<ApplicationSchema> {
  const application = await readFile(inputFile, {
    encoding: 'utf-8',
  });

  const json: ApplicationSchema = JSON.parse(application);
  return json;
}
