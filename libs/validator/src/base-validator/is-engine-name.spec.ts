import { isEngineName } from './is-engine-name';

describe('isEngineName', () => {
  it('if name, then true', () => {
    expect(isEngineName('name')).toEqual(true);
  });

  it('if isPublic, then false.', () => {
    expect(isEngineName('isPublic')).toEqual(false);
  });

  it('if is_on_2023, then true.', () => {
    expect(isEngineName('is_on_2023')).toEqual(true);
  });

  it('if system__public, then true', () => {
    expect(isEngineName('system__public')).toEqual(true);
  });

  it('if internal__table, then false', () => {
    expect(isEngineName('internal__table')).toEqual(false);
  });

  it('if $hello, then false', () => {
    expect(isEngineName('$hello')).toEqual(false);
  });

  it('if 0, then false', () => {
    expect(isEngineName(0)).toEqual(false);
  });
});
