module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
  ],
  coveragePathIgnorePatterns: ['node_modules'],
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
}
