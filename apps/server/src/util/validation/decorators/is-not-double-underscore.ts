import { isNotDoubleUnderscore } from '@shukun/validator';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsNotDoubleUnderscore(validationOptions?: ValidationOptions) {
  validationOptions = {
    message: 'We do not support double or more underscores.',
    ...validationOptions,
  };

  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsNotDoubleUnderscore',
      target: (object as any).constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isNotDoubleUnderscore(value);
        },
      },
    });
  };
}
