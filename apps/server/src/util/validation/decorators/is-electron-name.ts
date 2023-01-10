import { isElectronName } from '@shukun/schema';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsElectronName(validationOptions?: ValidationOptions) {
  validationOptions = {
    message:
      'We only support lowercase letter, uppercase letter, number and underscore.',
    ...validationOptions,
  };

  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isElectronName',
      target: (object as any).constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isElectronName(value);
        },
      },
    });
  };
}
