import {
  RuleEngineOperator,
  RuleEngineSet,
  RuleEngineSourceMethod,
} from '@shukun/schema';
import every from 'lodash/every';
import get from 'lodash/get';
import some from 'lodash/some';

import { log } from '../log';

export function ruleEngine(ruleConfigs: RuleEngineSet, state: unknown) {
  if (!ruleConfigs.globalCondition || ruleConfigs.globalCondition === 'none') {
    return false;
  }

  if (ruleConfigs.globalCondition === 'always') {
    return true;
  }

  if (!['every', 'some'].includes(ruleConfigs.globalCondition)) {
    log.error(`未支持该 RuleEngineSwitch 类型 ${ruleConfigs.globalCondition}`);
    return false;
  }

  const everyOrSome = ruleConfigs.globalCondition === 'some' ? some : every;

  const result = everyOrSome(ruleConfigs.conditions, (condition) => {
    const sourceMethod = methods[condition.sourceMethod];
    const source = sourceMethod(condition.sourceParam, state);

    let target = null;

    if (condition.targetMethod) {
      const targetMethod = methods[condition.targetMethod];
      target = targetMethod(condition.targetParam, state);
    }

    const operator = operators[condition.operator];

    return operator(source, target);
  });

  return result;
}

const methods: {
  [name in RuleEngineSourceMethod]: (value: unknown, state: unknown) => unknown;
} = {
  getField: (value: unknown, state: unknown) => {
    if (typeof value === 'string') {
      return get(state, value);
    } else {
      throw new Error('value is not a string, when run in getField rule.');
    }
  },
  getFixed: (value: unknown, state: unknown) => {
    return value;
  },
  getFieldOptions: (value: unknown, state: unknown) => {
    // TODO: should add types check with joi.
    if (!Array.isArray(value)) {
      throw new Error('only support value as a string[]');
    }
    return value;
  },
};

const operators: {
  [name in RuleEngineOperator]: (a: any, b: any) => boolean;
} = {
  equal: (a: unknown, b: unknown) => a === b,
  notEqual: (a: unknown, b: unknown) => a !== b,
  in: (a: unknown, b: unknown[]) => b.indexOf(a) > -1,
  notIn: (a: unknown, b: unknown[]) => b.indexOf(a) === -1,
  lessThan: (a: number, b: number) => a < b,
  lessThanInclusive: (a: number, b: number) => a <= b,
  greaterThan: (a: number, b: number) => a > b,
  greaterThanInclusive: (a: number, b: number) => a >= b,
  isTrue: (a: unknown, b: unknown) => !!a,
};
