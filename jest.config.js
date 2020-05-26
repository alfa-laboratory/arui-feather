module.exports = {
    testRegex: '.*\\.test\\.(js|ts|tsx)$',
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/assets-mock.js',
        '\\.png$': '<rootDir>/__mocks__/assets-mock.js',
        '\\.svg': '<rootDir>/__mocks__/assets-mock.js',
        '\\.xml': '<rootDir>/__mocks__/assets-mock.js',
        '\\.ico': '<rootDir>/__mocks__/assets-mock.js',
    },
    transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
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
        '<rootDir>/__tests__/setup.js',
    ],
    collectCoverageFrom: [
        'src/**/*.{js,ts,tsx}',
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
