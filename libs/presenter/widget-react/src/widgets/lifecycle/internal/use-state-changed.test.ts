import { renderHook } from '@testing-library/react';

import { useStateChanged } from './use-state-changed';

describe('use-state-changed', () => {
  describe('useStateChanged', () => {
    it('should ', () => {
      let runCount = 0;

      const onRun = vi.fn(() => {
        runCount++;
      });

      const props: any = {
        stateChanged: [['user', 'role']],
        onRun,
        app: {
          state: {
            user: {
              role: 'default',
            },
          },
        },
      };

      const { rerender } = renderHook(useStateChanged, {
        initialProps: props,
      });

      props.app.state.user.role = 'default2';
      rerender(props);
      props.app.state.user.role = 'default3';
      rerender(props);

      expect(runCount).toEqual(3);
    });
  });
});
