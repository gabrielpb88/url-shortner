import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src', '<rootDir>/__tests__'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coveragePathIgnorePatterns: ['node_modules'],
  testEnvironment: 'node',
  transform: { '^.+\\.(t|j)s$': 'ts-jest' },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  preset: 'ts-jest'
}

export default config
