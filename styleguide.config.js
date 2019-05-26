/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: 0 */

'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const reactDoc = require('library-utils/react-doc');
const upperCamelCase = require('uppercamelcase');
const WEBPACK_BASE_TEMPLATE = require('./webpack.base');

const PORT = parseInt(process.env.PORT || 8080, 10);
const TITLE = 'arui-feather';

module.exports = {
    title: TITLE,
    serverPort: PORT,
    skipComponentsWithoutExample: true,
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
    exampleMode: 'expand',
    moduleAliases: {
        'arui-feather': path.resolve(__dirname, './src/')
    },
    pagePerSection: true,
    styleguideDir: path.resolve(__dirname, './demo/styleguide/'),
    styleguideComponents: {
        'StyleGuide$': 'arui-demo/styleguide/styleguide',
        StyleGuideRenderer: 'arui-demo/styleguide/styleguide-renderer',
        SectionHeadingRenderer: 'arui-demo/section-heading/section-heading-renderer',
        Markdown: 'arui-demo/markdown',
        Preview: 'arui-demo/preview',
        Editor: 'arui-demo/editor/editor',
        Pathline: 'arui-demo/pathline',
        'slots$': 'arui-demo/slots',
        'ReactComponent$': 'arui-demo/react-component',
    },
    template: {
        favicon: 'https://assets-cdn.github.com/favicon.ico'
    }, // path.resolve(__dirname, './demo/template.html'),
    webpackConfig: merge.smart(WEBPACK_BASE_TEMPLATE, {
        devServer: {
            disableHostCheck: true
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/^arui-feather/, (resource) => {
                resource.request = resource.request.replace(/^arui-feather/, path.resolve(__dirname, './src'));
            })
        ]
    }),
    moduleAliases: {
        'arui-feather': path.resolve(__dirname, 'src')
    },
    pagePerSection: true,
    sections: [
        {
            title: 'Components',
            components: './src/*/index.js',
            sectionDepth: 1,
        }
    ],
};
