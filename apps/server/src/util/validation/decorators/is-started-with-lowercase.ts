import { registerDecorator, ValidationOptions } from 'class-validator';

export function isStartedWithLowercase(value: unknown) {
  const regex = new RegExp(/^[a-z]{1,}/);
  return typeof value === 'string' && regex.test(value);
}

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
