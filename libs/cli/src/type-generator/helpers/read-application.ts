import { ApplicationSchema } from '@shukun/schema';
import { readFile } from 'fs/promises';

export async function readApplication(
  inputFile: string,
): Promise<ApplicationSchema> {
  const application = await readFile(inputFile, {
    encoding: 'utf-8',
  });

  const json: ApplicationSchema = JSON.parse(application);
  return json;
}
