/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const reactDoc = require('library-utils/react-doc');
const upperCamelCase = require('uppercamelcase');
const fs = require('fs');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

const PORT = parseInt(process.env.PORT || 8080, 10);

module.exports = {
    title: 'ARUI FEATHER (fantasy)',
    serverPort: PORT,
    skipComponentsWithoutExample: true,
    components: './src/**/fantasy/index.js',
    propsParser(filePath) {
        return reactDoc(filePath);
    },
    getExampleFilename(componentPath) {
        // если в дирректории src/componentname/fantasy/ есть файл README.md - то по умолчанию будет использован он
        // иначе будет использован README.md из src/componentname/
        const fantasyExamplesPath = path.resolve(path.dirname(componentPath), './README.md');
        if (fs.existsSync(fantasyExamplesPath)) {
            return fantasyExamplesPath;
        }
        const featherExamplesPath = path.resolve(path.dirname(componentPath), '../README.md');
        return featherExamplesPath;
    },
    getComponentPathLine(filePath) {
        const componentDirName = path.dirname(path.resolve(filePath, '../'));
        const componentSourcesFileName = componentDirName.split(path.sep).pop();
        const componentName = upperCamelCase(componentSourcesFileName);
        return `import ${componentName} from 'arui-feather/${componentSourcesFileName}/fantasy';`;
    },
    ignore: ['**/*-test.jsx'],
    styleguideDir: path.resolve(__dirname, './arui-demo/styleguide-fantasy/'),
    webpackConfig: merge.smart(ARUI_TEMPLATE, {
        devServer: {
            disableHostCheck: true
        },
        resolve: {
            alias: {
                // Переопределяем компоненты styleguidist
                'rsg-components/Wrapper': path.resolve(__dirname, './arui-demo/components/preview-with-theme-switcher'),
                'rsg-components/Logo': path.resolve(__dirname, './arui-demo/components/logo.jsx'),
                'rsg-components/Playground/PlaygroundRenderer': path.resolve(__dirname,
                    './arui-demo/components/playground-with-share-example-button'
                ),
                'rsg-components/StyleGuide/StyleGuideRenderer': path.resolve(__dirname,
                    './node_modules/react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer'
                ),
                'rsg-components/StyleGuide/index': path.resolve(__dirname,
                    './node_modules/react-styleguidist/lib/rsg-components/StyleGuide/index'
                ),
                'rsg-components/StyleGuide': path.resolve(__dirname, './arui-demo/components/styleguide')
            }
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/font_roboto\.css$/, 'node-noop')
        ]
    })
};
