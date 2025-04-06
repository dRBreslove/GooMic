/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    verbose: true,
    setupFilesAfterEnv: ['./jest.setup.js'],
    modulePathIgnorePatterns: ['<rootDir>/ios/'],
    testTimeout: 30000,
    transform: {},
    moduleFileExtensions: ['js', 'json', 'node'],
};
