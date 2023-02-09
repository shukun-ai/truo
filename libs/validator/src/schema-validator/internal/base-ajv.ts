import Ajv, { Options } from 'ajv';

import { isDateTimeIso } from '../../base-validator/is-date-time-iso';
import { isElectronName } from '../../base-validator/is-electron-name';
import { isEmail } from '../../base-validator/is-email';
import { isEngineName } from '../../base-validator/is-engine-name';
import { isRolePermission } from '../../base-validator/is-role-permission';

export function createBaseAjv(options?: Options) {
  return new Ajv(options)
    .addKeyword('tsEnumNames')
    .addKeyword('skEditorType')
    .addFormat('email', {
      type: 'string',
      validate: isEmail,
    })
    .addFormat('dateTimeISO', {
      type: 'string',
      validate: isDateTimeIso,
    })
    .addFormat('engineName', {
      type: 'string',
      validate: isEngineName,
    })
    .addFormat('apiName', {
      type: 'string',
      validate: isEngineName,
    })
    .addFormat('electronName', {
      type: 'string',
      validate: isElectronName,
    })
    .addFormat('rolePermission', {
      type: 'string',
      validate: isRolePermission,
    });
}
