module.exports = {
    roots: [
      '<rootDir>',
      '<rootDir>/src',
    ],
    modulePaths: [
      '<rootDir>',
      '<rootDir>/node_modules',
    ],
    testMatch: [
      '<rootDir>/tests/**/*.spec.ts',
    ],
    testPathIgnorePatterns: [
      '/node_modules/',
      '/dist/',
      '/lib/',
    ],
    verbose: true,
    globals: {
      'ts-jest': {
        tsConfig: 'tsconfig.json',
      },
    },
    preset: 'ts-jest',
    setupFiles: [
      '<rootDir>/tests/test.config.ts'
    ]
};
