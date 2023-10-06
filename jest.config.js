/* eslint-disable @typescript-eslint/no-var-requires */
const { moduleNameMapper } = require('tsconfig-paths-jest/jest.config');

module.exports = {
  rootDir: '',
  moduleFileExtensions: ['js', 'json', 'ts'],
  coveragePathIgnorePatterns: [
    'node_modules',
    'utils',
    'schemas',
    '.mock.ts$',
    '.dto.ts$',
    '.errors.ts$',
    '.exception.ts$',
    '.provider.ts$',
    '.schema.ts$',
  ],
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  moduleNameMapper,
};
