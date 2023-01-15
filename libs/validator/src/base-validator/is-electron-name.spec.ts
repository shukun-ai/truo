import { isElectronName } from './is-electron-name';

describe('isElectronName', () => {
  it('if name, then pass', () => {
    expect(isElectronName('name')).toEqual(true);
  });

  it('if isPublic, then pass.', () => {
    expect(isElectronName('isPublic')).toEqual(true);
  });

  it('if isOn2023, then pass.', () => {
    expect(isElectronName('isOn2023')).toEqual(true);
  });

  it('if SystemPublic, then throw', () => {
    expect(isElectronName('SystemPublic')).toEqual(false);
  });

  it('if update$hello, then throw', () => {
    expect(isElectronName('update$hello')).toEqual(false);
  });

  it('if $hello, then throw', () => {
    expect(isElectronName('$hello')).toEqual(false);
  });

  it('if hello_world, then throw', () => {
    expect(isElectronName('hello_world')).toEqual(false);
  });

  it('if hello__world, then throw', () => {
    expect(isElectronName('hello__world')).toEqual(false);
  });

  it('if is not a string, then false', () => {
    expect(isElectronName(10)).toEqual(false);
  });
});
