import { registerDecorator, ValidationOptions } from 'class-validator';

export function isEngineName(value: unknown) {
  const regex = new RegExp(/^[a-z0-9_]*$/);
  return typeof value === 'string' && regex.test(value);
}

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
