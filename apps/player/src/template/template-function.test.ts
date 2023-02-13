import { TypeException } from '@shukun/exception';

import { templateFunction } from './template-function';

describe('Name of the group', () => {
  it('should return stringify, when correct template.', () => {
    const states = {
      e1: { value: 1 },
      e2: { value: 2 },
      e3: { world: { name: 'SKP' } },
    };
    const output = templateFunction(
      'Hello ${$.e1.value + $.e2.value} from ${$.e3.world.name}.',
      states,
    );
    expect(output).toEqual('Hello 3 from SKP.');
  });

  it('should format undefined, when states have undefined.', () => {
    const states = {};
    expect(() =>
      templateFunction(
        'Hello ${$.e1.value + $.e2.value} from ${$.e3.world.name}.',
        states,
      ),
    ).toThrow(new TypeException('The template expression is wrong.'));
  });
});
