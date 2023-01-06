import { isEngineName } from '@shukun/electron';
import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsEngineName(validationOptions?: ValidationOptions) {
  validationOptions = {
    message: 'We only support lowercase letter, number and underscore.',
    ...validationOptions,
  };

  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'IsEngineName',
      target: (object as any).constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown) {
          return isEngineName(value);
        },
      },
    });
  };
}
