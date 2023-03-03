import { playerSchema } from '@shukun/schema';

import { createPlayerAjv } from '../../schema-validator/internal/player-ajv';
import { SchemaValidator } from '../../schema-validator/schema-validator';

export const playerSchemaValidator = new SchemaValidator(
  createPlayerAjv(),
).compile(playerSchema);
