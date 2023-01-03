import { sync } from 'write';

export async function writeFile(
  text: string,
  outputFile: string,
): Promise<void> {
  sync(outputFile, text, {
    newline: true,
  });
}
