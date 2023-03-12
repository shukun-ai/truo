import { WidgetSchema } from '@shukun/schema';
import { M } from 'ts-algebra';
import { ValuesType } from 'utility-types';

/**
 * Why do we need to use "as const" for input.
 * @see {@link https://github.com/ThomasAribart/json-schema-to-ts/blob/master/documentation/FAQs/does-json-schema-to-ts-work-on-json-file-schemas.md}
 */
export type FromDefinition<P extends WidgetSchema> = M.Resolve<
  M.Object<{
    [key in keyof P['properties']]: ParseExpectedType<P['properties'][key]>;
  }>
>;

type ParseExpectedType<E extends ValuesType<WidgetSchema['properties']>> =
  E extends { expectedType: 'string' }
    ? M.Primitive<string>
    : E extends { expectedType: 'number' }
    ? M.Primitive<number>
    : E extends { expectedType: 'boolean' }
    ? M.Primitive<boolean>
    : E extends { expectedType: 'array' }
    ? M.Array<M.Any>
    : E extends { expectedType: 'object' }
    ? M.Object<{ [k: string]: M.Any }>
    : M.Never;
