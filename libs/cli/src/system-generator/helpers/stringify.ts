import { ApplicationSchema } from '@shukun/schema';

export async function stringify(
  application: ApplicationSchema,
): Promise<string> {
  const text = JSON.stringify(application, null, 4);

  return text;
}
