module.exports = {
  displayName: 'player',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  transform: {
    '^.+\\.js?$': 'jest-esm-transformer',
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/apps/player',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: [
    '<rootDir>/../../node_modules/(?!(lit-html|lit|@lit|lit-element)/)',
  ],
};
