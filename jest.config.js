const nextJest = require('next/jest');
const createJestConfig = nextJest({
  dir: './',
});
const customJestConfig = {
  roots: ['<rootDir>/'],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapper: {
    '^@pages/(.*)$': '<rootDir>/pages/$1',
    '^@shared/(.*)$': '<rootDir>/shared/$1',
    '^@features/(.*)$': '<rootDir>/features/$1',
    '^@styles/(.*)$': '<rootDir>/styles/$1',
    '^@store/(.*)$': '<rootDir>/store/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};
module.exports = createJestConfig(customJestConfig);
