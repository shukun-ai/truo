import {
  presenterContainerSchema,
  presenterEventSchema,
  presenterRepositorySchema,
  presenterSchema,
  presenterScreenSchema,
  presenterWidgetSchema,
} from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

export function createPresenterAjv(options?: Options) {
  const validate = createBaseAjv(options)
    .addSchema(presenterSchema, 'presenter.schema.json')
    .addSchema(presenterScreenSchema, 'presenter/screen.schema.json')
    .addSchema(presenterContainerSchema, 'presenter/container.schema.json')
    .addSchema(presenterEventSchema, 'presenter/event.schema.json')
    .addSchema(presenterRepositorySchema, 'presenter/repository.schema.json')
    .addSchema(presenterWidgetSchema, 'presenter/widget.schema.json');

  return validate;
}
