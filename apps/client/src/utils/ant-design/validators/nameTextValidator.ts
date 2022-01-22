import { RuleObject } from 'antd/lib/form';
import { StoreValue } from 'antd/lib/form/interface';

import { isEngineName } from '../validations/isEngineName';
import { isNotDoubleUnderscore } from '../validations/isNotDoubleUnderscore';
import { isStartedWithLowercase } from '../validations/isStartedWithLowercase';

export function nameTextValidator(
  rule: RuleObject,
  value: StoreValue,
): Promise<void> | void {
  const valid =
    isEngineName(value) &&
    isNotDoubleUnderscore(value) &&
    isStartedWithLowercase(value);

  if (!valid) {
    return Promise.reject(
      '仅支持小写字母(a-z), 数字(0-9)和下划线(_) ，且必须以字母开头。',
    );
  }

  return Promise.resolve();
}
