import { isStartedWithLowercase } from '@shukun/electron';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsStartedWithLowercase(validationOptions?: ValidationOptions) {
  validationOptions = {
    message: 'We only support starting with lowercase letters.',
    ...validationOptions,
  };

  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsStartedWithLowercase',
      target: (object as any).constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isStartedWithLowercase(value);
        },
      },
    });
  };
}
