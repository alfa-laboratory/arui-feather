/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: 0 */

'use strict';

const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const merge = require('webpack-merge');
const reactDoc = require('library-utils/react-doc');
const upperCamelCase = require('uppercamelcase');
const WEBPACK_BASE_TEMPLATE = require('./webpack.base');
const config = require('arui-demo');

const { version } = require('./package');

const PORT = parseInt(process.env.PORT || 8080, 10);
const TITLE = 'arui-feather';

// Prepare styleguidist context https://react-styleguidist.js.org/docs/configuration.html#context
// For share example functionality

const getContext = source => readdirSync(source)
    .filter(name => !['lib', 'mq', 'vars', 'font', 'skeleton-mixins'].includes(name))
    .map(name => path.join(source, name))
    .filter(file => lstatSync(file).isDirectory())
    .reduce(
        (prev, componentDirName) => {
            const componentSourcesFileName = componentDirName.split(path.sep).pop();
            const componentName = upperCamelCase(componentSourcesFileName);

            prev[componentName] = componentDirName;

            return prev;
        },
        {
            PreviewFrame: 'arui-demo/preview-frame'
        }
    );

const context = getContext(path.join(__dirname, 'src'));

module.exports = {
    ...config,
    title: TITLE,
    version,
    serverPort: PORT,
    skipComponentsWithoutExample: true,
    components: './src/*/index.{ts,js}',

    propsParser(filePath) {
        return reactDoc(filePath);
    },
    getComponentPathLine(filePath) {
        const componentDirName = path.dirname(filePath);
        const componentSourcesFileName = componentDirName.split(path.sep).pop();
        const componentName = upperCamelCase(componentSourcesFileName);

        return `import ${componentName} from '${TITLE}/${componentSourcesFileName}';`;
    },
    getExampleFilename(componentPath) {
        return path.resolve(path.dirname(componentPath), './README.md');
    },
    ignore: ['**/*-test.jsx'],
    moduleAliases: {
        'arui-feather': path.resolve(__dirname, './src/')
    },
    context,
    styleguideDir: path.resolve(__dirname, './demo/styleguide/'),
    webpackConfig: merge.smart(WEBPACK_BASE_TEMPLATE, {
        resolve: {
            extensions: ['.ts', '.tsx']
        },
        devServer: {
            disableHostCheck: true
        },
        module: {
            rules: [
                {
                    test: /\.(ico|xml)$/i,
                    loader: 'file-loader'
                },
                {
                    test: /\.tsx?/i,
                    loader: 'ts-loader'
                }
            ]
        }
    }),
    sections: [
        {
            title: 'Components',
            components: ['./src/*/index.js', './src/*/index.ts'],
            sectionDepth: 1
        }
    ]
};
