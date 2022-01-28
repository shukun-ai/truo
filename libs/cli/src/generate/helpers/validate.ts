import { ApplicationSchema, validateApplicationSchema } from '@shukun/schema';

export async function validate(
  application: ApplicationSchema,
): Promise<ApplicationSchema> {
  const result = validateApplicationSchema(application);

  if (!result) {
    console.error(validateApplicationSchema.errors);
    throw new Error('Failed to validate this application schema.');
  }

  return application;
}
