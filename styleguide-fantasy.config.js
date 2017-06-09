/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const reactDockGen = require('react-docgen');
const upperCamelCase = require('uppercamelcase');
const fs = require('fs');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

const documentation = { };
function reactDocGenWithMergedComposed(filePath, resolver, handlers, componentName) {
    if (documentation[filePath]) {
        return documentation[filePath];
    }
    const content = fs.readFileSync(filePath);
    // react-docgen считает компонент реакт компонентом, только если он наследуется от React.Component
    // для такого кейса оставляем заглушку
    let doc;
    try {
        doc = reactDockGen.parse(content, resolver, handlers)[0];
    } catch (e) {
        doc = {
            displayName: componentName
        };
    }
    doc.filePath = filePath;
    if (doc.composes) {
        doc.composes = doc.composes.map((relativePath) => {
            const composeComponentPath = path.resolve(path.dirname(filePath), `${relativePath}.jsx`);
            return reactDocGenWithMergedComposed(composeComponentPath, resolver, handlers, componentName);
        });
    } else {
        doc.composes = [];
    }
    doc.props = doc.composes.reduce((prev, item) => Object.assign({}, prev, item.props), doc.props || {});
    documentation[filePath] = doc;
    return doc;
}

module.exports = {
    title: 'ARUI FEATHER',
    serverPort: 3014,
    skipComponentsWithoutExample: true,
    components: './src/**/fantasy/index.js',
    propsParser(filePath, source, resolver, handlers) {
        // react-docgen не понимает реекспорт, поэтому явно сообщаем откуда брать описание
        const componentDirName = path.dirname(filePath);
        const componentSourcesFileName = path.resolve(filePath, '../..').split(path.sep).pop();
        const componentSourcesPath = path.resolve(componentDirName, `${componentSourcesFileName}.jsx`);
        const componentName = upperCamelCase(componentSourcesFileName);
        if (fs.existsSync(componentSourcesPath)) {
            return reactDocGenWithMergedComposed(componentSourcesPath, resolver, handlers, componentName);
        }
        const mainComponentPath = path.resolve(componentDirName, `../${componentName}.jsx`);
        return reactDocGenWithMergedComposed(mainComponentPath, resolver, handlers);
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
    ignore: ['**/*-test.jsx'],
    styleguideDir: path.resolve(__dirname, './arui-demo/styleguide-fantasy/'),
    webpackConfig: merge.smart(ARUI_TEMPLATE, {
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
