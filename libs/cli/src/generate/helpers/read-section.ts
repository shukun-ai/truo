import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

export async function readSection<T>(
  inputPath: string,
  moduleName: string,
): Promise<T[]> {
  const path = join(inputPath, moduleName);
  const files = await readdir(path);
  const jsonFiles = files.filter((file) => file.endsWith('.json'));

  const section: T[] = [];

  for (const jsonFile of jsonFiles) {
    const string = await readFile(join(path, jsonFile), {
      encoding: 'utf-8',
    });

    const json = JSON.parse(string);

    delete json.$schema;

    section.push(json);
  }

  return section;
}
