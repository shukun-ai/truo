import { UnknownSourceModel } from '@shukun/schema';

import { DetailMode } from '../../../../services/detail';
import { log } from '../../../../utils/log';
import { createStringFunction } from '../../../../utils/string-function/stringFunction';

export function runStringCode(
  code: string | undefined,
  source: UnknownSourceModel | undefined,
  sources: UnknownSourceModel[],
  mode: DetailMode | undefined,
) {
  if (!code) {
    return false;
  }

  let disabled = false;

  try {
    disabled = createStringFunction(code)({
      source: source,
      sources: sources ?? [],
      mode,
    });
  } catch (error) {
    log.error('规则引擎执行失败。', error);
  }

  return disabled;
}
