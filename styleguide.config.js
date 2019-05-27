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
        StyleGuide$: 'arui-demo/styleguide/styleguide',
        StyleGuideRenderer: 'arui-demo/styleguide/styleguide-renderer',
        SectionHeadingRenderer: 'arui-demo/section-heading/section-heading-renderer',
        Markdown: 'arui-demo/markdown',
        Preview: 'arui-demo/preview',
        Editor: 'arui-demo/editor/editor',
        Pathline: 'arui-demo/pathline',
        slots$: 'arui-demo/slots',
        ReactComponent$: 'arui-demo/react-component',
        ExamplePlaceholderRenderer: 'arui-demo/example-placeholder',
        Logo: 'arui-demo/logo'
    },
    require: [
        'arui-demo/global.css',
        path.resolve(__dirname, './src/button')
    ],
    styles: {
        Playground: {
            root: {
                marginBottom: 0
            },
            controls: {
                display: 'none'
            }
        },
        ReactComponent: {
            root: {
                marginBottom: 0
            },
            tabButtons: {
                marginBottom: '24px'
            }
        },
        StyleGuide: {
            root: {
                backgroundColor: 'inherit'
            },
            logo: {
                padding: 0,
                borderBottom: 'none'
            },
            sidebar: {
                background: '#eee',
                '.view-with-theme-switcher__layout_theme_alfa-on-color &': {
                    isolate: false,
                    background: 'rgb(56, 76, 94)'
                },
                border: 'none'
            },
            footer: {
                display: 'none'
            }
        },
        ComponentsList: {
            item: {
                '& a': {
                    color: '#333 !important',
                    opacity: '.6 !important',
                    '.view-with-theme-switcher__layout_theme_alfa-on-color &': {
                        isolate: false,
                        color: '#fff !important',
                        opacity: '.6 !important'
                    }
                }
            }
        }
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
    sections: [
        {
            title: 'Components',
            components: './src/*/index.js',
            sectionDepth: 1
        }
    ]
};
