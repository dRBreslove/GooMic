/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    setupFilesAfterEnv: ['./jest.setup.cjs'],
    testMatch: ['**/__tests__/**/*.test.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^../utils/logger$': '<rootDir>/src/__tests__/mocks/logger.js',
        '^../ai-services$': '<rootDir>/src/__tests__/mocks/ai-services.js'
    },
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'json'],
    watchman: false,
    modulePathIgnorePatterns: [
        '<rootDir>/www/package.json',
        '<rootDir>/ios/App/App/public/package.json',
        '<rootDir>/src/package.json'
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(ws)/)'
    ]
};
