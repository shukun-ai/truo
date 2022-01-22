import {
  RuleEngineGlobalCondition,
  RuleEngineOperator,
  RuleEngineSourceMethod,
  RuleEngineTargetMethod,
} from '@shukun/schema';

import { ruleEngine } from './ruleEngine';

test('test ruleEngine', () => {
  const result = ruleEngine(
    {
      globalCondition: RuleEngineGlobalCondition.every,
      conditions: [
        {
          sourceMethod: RuleEngineSourceMethod.getField,
          sourceParam: 'test',
          operator: RuleEngineOperator.equal,
          targetMethod: RuleEngineTargetMethod.getFixed,
          targetParam: 'testValue',
        },
      ],
    },
    { test: 'testValue' },
  );

  expect(result).toBe(true);
});
