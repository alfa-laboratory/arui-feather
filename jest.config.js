module.exports = {
    testRegex: '.*\\.test\\.tsx?$',
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/assets-mock.ts',
        '\\.png$': '<rootDir>/__mocks__/assets-mock.ts',
        '\\.svg': '<rootDir>/__mocks__/assets-mock.ts',
        '\\.xml': '<rootDir>/__mocks__/assets-mock.ts',
        '\\.ico': '<rootDir>/__mocks__/assets-mock.ts',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    modulePathIgnorePatterns: [
        '<rootDir>/.publish/',
    ],
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json',
    ],
    setupFiles: [
        '<rootDir>/__tests__/setup.ts',
    ],
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
    ],
    coverageReporters: [
        'lcov',
        'text',
        'clover',
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '\\.test\\.tsx$',
        '-test\\.tsx$',
        'index.ts',
        // REMOVE AFTER UPGRADE STYLEGUIDIST
        'entrypoint-for-demo.ts',
        'polyfills.js',
        '\\.d\\.ts$',
        '\\.gulpfile\\.js$',
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer',
    ],
    globals: {
        window: true,
        jest: true,
    },
};
