/* eslint-disable */
export default {
  displayName: 'server-integration-testing',
  preset: '../../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.integration-testing.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/server-integration-testing',
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
};
