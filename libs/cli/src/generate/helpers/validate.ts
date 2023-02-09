import { ApplicationSchema } from '@shukun/schema';
import { applicationSchemaValidator } from '@shukun/validator';

export async function validate(
  application: ApplicationSchema,
): Promise<ApplicationSchema> {
  applicationSchemaValidator.validate(application);
  return application;
}
