import {
  playerEventSchema,
  playerRepositorySchema,
  playerSchema,
  playerWidgetSchema,
} from '@shukun/schema';
import { Options } from 'ajv';

import { createBaseAjv } from './base-ajv';

export function createPlayerAjv(options?: Options) {
  const validate = createBaseAjv(options)
    .addSchema(playerSchema, 'player.schema.json')
    .addSchema(playerEventSchema, 'player/event.schema.json')
    .addSchema(playerRepositorySchema, 'player/repository.schema.json')
    .addSchema(playerWidgetSchema, 'player/widget.schema.json');

  return validate;
}
