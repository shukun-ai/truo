module.exports = {
  displayName: 'server-integration-testing',
  preset: '../../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.integration-testing.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/apps/server-integration-testing',
  globalSetup: './global-setup.js',
  globalTeardown: './global-teardown.js',
};
