import { join } from 'path';
import { sync } from 'write';

export async function writeFile(
  text: string,
  outputPath: string,
): Promise<void> {
  sync(join(outputPath, 'application.json'), text, {
    newline: true,
  });
}
