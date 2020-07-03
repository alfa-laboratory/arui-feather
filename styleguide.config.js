/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: 0 */
/* eslint @typescript-eslint/no-var-requires: 0 */

'use strict';

const path = require('path');
const { lstatSync, readdirSync } = require('fs');
const merge = require('webpack-merge');
const upperCamelCase = require('uppercamelcase');
const reactDocgenTypescript = require('react-docgen-typescript');
const config = require('arui-demo');

const WEBPACK_BASE_TEMPLATE = require('./webpack.base');

const typescriptDocReader = reactDocgenTypescript.withCustomConfig('./tsconfig.json', {});

/* eslint import/no-unresolved: 0 */
const { version } = require('./package');

const PORT = parseInt(process.env.PORT || 8080, 10);
const TITLE = 'arui-feather';

// Prepare styleguidist context https://react-styleguidist.js.org/docs/configuration.html#context
// For share example functionality

const getContext = (source) => readdirSync(source)
    .filter((name) => !['lib', 'mq', 'vars', 'font', 'skeleton-mixins'].includes(name))
    .map((name) => path.join(source, name))
    .filter((file) => lstatSync(file).isDirectory())
    .reduce(
        (prev, componentDirName) => {
            const componentSourcesFileName = componentDirName.split(path.sep).pop();
            const componentName = upperCamelCase(componentSourcesFileName);

            return { ...prev, [componentName]: componentDirName };
        },
        {
            PreviewFrame: 'arui-demo/preview-frame',
        },
    );

const context = getContext(path.join(__dirname, 'src'));

module.exports = {
    ...config,
    title: TITLE,
    version,
    serverPort: PORT,
    skipComponentsWithoutExample: true,
    components: './src/*/entrypoint-for-demo.ts',

    propsParser(componentIndexPath) {
        const dirPath = path.dirname(componentIndexPath);
        const componentName = dirPath.split(path.sep).pop();
        const componentPath = path.resolve(dirPath, `${componentName}.tsx`);
        const docs = typescriptDocReader.parse(componentPath)[0];

        Object.keys(docs.props).forEach((key) => {
            const defaultValue = docs.props[key].defaultValue;

            if (
                defaultValue
                && defaultValue.value !== undefined
                && typeof defaultValue.value !== 'string') {
                // TODO: постараться убрать после обновления styleguidist
                // почему-то react styleguidist в недрах ожидает string;
                // А тут, как и должно приходит true/false
                // хачим чтоб работало
                defaultValue.value = String(defaultValue.value);
            }
        });

        return docs;
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
    ignore: ['**/*-test.tsx'],
    moduleAliases: {
        'arui-feather': path.resolve(__dirname, './src/'),
    },
    context,
    styleguideDir: path.resolve(__dirname, './demo/styleguide/'),
    webpackConfig: merge.smart(WEBPACK_BASE_TEMPLATE, {
        resolve: {
            extensions: ['.ts', '.tsx'],
        },
        devServer: {
            disableHostCheck: true,
        },
        module: {
            rules: [
                {
                    test: /\.(ico|xml)$/i,
                    loader: 'file-loader',
                },
            ],
        },
    }),
    sections: [
        {
            title: 'Components',
            components: ['./src/*/entrypoint-for-demo.ts'],
            sectionDepth: 1,
        },
    ],
};
