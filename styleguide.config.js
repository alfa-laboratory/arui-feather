/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

'use strict';

const path = require('path');
const merge = require('webpack-merge');
const reactDoc = require('library-utils/react-doc');
const upperCamelCase = require('uppercamelcase');
const WEBPACK_BASE_TEMPLATE = require('arui-presets/webpack.base');
const WEBPACK_DEV_TEMPLATE = require('arui-presets/webpack.development');

const PORT = parseInt(process.env.PORT || 8080, 10);

module.exports = {
    title: 'ARUI Feather',
    serverPort: PORT,
    styles: {
        SectionHeading: {
            heading: {
                fontSize: '48px',
                fontWeight: 'bold',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }
        },
        ToolbarButton: {
            button: {
                display: 'none'
            }
        },
        Playground: {
            preview: {
                borderRadius: 0,
                padding: 0
            }
        },
        StyleGuide: {
            content: {
                maxWidth: 'none'
            }
        }
    },
    skipComponentsWithoutExample: true,
    components: './src/*/index.js',
    propsParser(filePath) {
        return reactDoc(filePath);
    },
    getComponentPathLine(filePath) {
        const componentDirName = path.dirname(filePath);
        const componentSourcesFileName = componentDirName.split(path.sep).pop();
        const componentName = upperCamelCase(componentSourcesFileName);
        return `import ${componentName} from 'arui-feather/${componentSourcesFileName}';`;
    },
    getExampleFilename(componentPath) {
        return path.resolve(path.dirname(componentPath), './README.md');
    },
    ignore: ['**/*-test.jsx'],
    styleguideDir: path.resolve(__dirname, './demo/styleguide/'),
    template: path.resolve(__dirname, './demo/template.html'),
    webpackConfig: merge.smart(WEBPACK_BASE_TEMPLATE, WEBPACK_DEV_TEMPLATE, {
        devServer: {
            disableHostCheck: true
        },
        resolve: {
            alias: {
                // Переопределяем компоненты styleguidist
                'rsg-components/Wrapper': path.resolve(__dirname, './demo/components/preview-with-theme-switcher'),
                'rsg-components/Logo': path.resolve(__dirname, './demo/components/logo.jsx'),
                'rsg-components/Playground/PlaygroundRenderer': path.resolve(
                    __dirname,
                    './demo/components/playground-with-share-example-button'
                ),
                'rsg-components/StyleGuide/StyleGuideRenderer': path.resolve(
                    __dirname,
                    './node_modules/react-styleguidist/lib/rsg-components/StyleGuide/StyleGuideRenderer'
                ),
                'rsg-components/StyleGuide/index': path.resolve(
                    __dirname,
                    './node_modules/react-styleguidist/lib/rsg-components/StyleGuide/index'
                ),
                'rsg-components/StyleGuide': path.resolve(__dirname, './demo/components/styleguide')
            }
        }
    })
};
