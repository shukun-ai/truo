import { write } from './mutation';

describe('mutation', () => {
  it('should ', () => {
    const state = {
      loading: false,
    };

    const update = write<typeof state>((draft) => {
      draft.loading = true;
    });

    const newState = update(state);

    expect(newState).toEqual({ loading: true });
  });
});
