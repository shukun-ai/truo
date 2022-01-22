import { enableCrossOriginAuth } from './envHelper';

describe('env-helpers', () => {
  it('enableCrossOriginAuth', async () => {
    expect(enableCrossOriginAuth()).toBeFalsy();
    process.env.REACT_APP_ENABLE_CROSS_ORIGIN_AUTH = 'true';
    expect(enableCrossOriginAuth()).toBeTruthy();
  });
});
