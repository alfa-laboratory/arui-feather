module.exports = {
    testRegex: '.*\\.test\\.(jsx|js)$',
    moduleNameMapper: {
        '\\.css$': '<rootDir>/__mocks__/assets-mock.js',
        '\\.png$': '<rootDir>/__mocks__/assets-mock.js',
        '\\.svg': '<rootDir>/__mocks__/assets-mock.js',
        '\\.xml': '<rootDir>/__mocks__/assets-mock.js',
        '\\.ico': '<rootDir>/__mocks__/assets-mock.js'
    },
    modulePathIgnorePatterns: [
        '<rootDir>/.publish/'
    ],
    moduleFileExtensions: [
        'js',
        'jsx',
        'json'
    ],
    setupFiles: [
        '<rootDir>/__tests__/setup.js'
    ],
    collectCoverageFrom: [
        'src/**/*.{js,ts,jsx,tsx}'
    ],
    coverageReporters: [
        'lcov',
        'text',
        'clover'
    ],
    coveragePathIgnorePatterns: [
        '/node_modules/',
        '\\.test\\.jsx$',
        '-test\\.jsx$',
        'index.js'
    ],
    snapshotSerializers: [
        'enzyme-to-json/serializer'
    ],
    globals: {
        window: true,
        jest: true
    }
};
