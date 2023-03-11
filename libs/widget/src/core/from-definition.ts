import { WidgetSchema } from '@shukun/schema';
import { M } from 'ts-algebra';
import { ValuesType } from 'utility-types';

export type FromDefinition<P extends WidgetSchema> = M.Resolve<
  M.Object<{
    [key in keyof P['properties']]: ParseExpectedType<P['properties'][key]>;
  }>
> &
  M.Resolve<
    M.Object<{
      [key in keyof P['events']]: M.Primitive<string, true, () => void>;
    }>
  >;

type ParseExpectedType<E extends ValuesType<WidgetSchema['properties']>> =
  E extends { expectedType: 'string' }
    ? M.Primitive<string>
    : E extends { expectedType: 'number' }
    ? M.Primitive<number>
    : E extends { expectedType: 'boolean' }
    ? M.Primitive<boolean>
    : M.Never;
