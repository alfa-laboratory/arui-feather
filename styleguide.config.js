/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

'use strict';

const path = require('path');
const merge = require('webpack-merge');
const ARUI_TEMPLATE = require('arui-presets/webpack.base');

module.exports = {
    title: 'ARUI FEATHER',
    serverPort: 3013,
    skipComponentsWithoutExample: true,
    components: 'src/**/**/[a-z]*.jsx',
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
