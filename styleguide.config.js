/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

'use strict';

const path = require('path');
const merge = require('webpack-merge');
const reactDockGen = require('react-docgen');
const fs = require('fs');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

const documentation = { };
function reactDocGenWithMergedComposed(filePath, resolver, handlers) {
    if (documentation[filePath]) {
        return documentation[filePath];
    }
    const content = fs.readFileSync(filePath);
    const doc = reactDockGen.parse(content, resolver, handlers)[0];
    doc.filePath = filePath;
    if (doc.composes) {
        doc.composes = doc.composes.map((relativePath) => {
            const composeComponentPath = path.resolve(path.dirname(filePath), `${relativePath}.jsx`);
            return reactDocGenWithMergedComposed(composeComponentPath, resolver, handlers);
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
    serverPort: 3013,
    skipComponentsWithoutExample: true,
    components: 'src/**/**/[a-z]*.jsx',
    propsParser(filePath, source, resolver, handlers) {
        return reactDocGenWithMergedComposed(filePath, resolver, handlers);
    },
    ignore: ['**/*-test.jsx'],
    styleguideDir: path.resolve(__dirname, './arui-demo/styleguide/'),
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
        }
    })
};
