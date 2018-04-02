/* eslint strict: [0, "global"] */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');
const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const reactDoc = require('library-utils/react-doc');
const upperCamelCase = require('uppercamelcase');
const WEBPACK_BASE_TEMPLATE = require('arui-presets/webpack.base');
const WEBPACK_DEV_TEMPLATE = require('arui-presets/webpack.development');

const PORT = parseInt(process.env.PORT || 8080, 10);

module.exports = {
    title: 'arui-feather',
    serverPort: PORT,
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
        const componentDirName = path.dirname(componentPath);
        const resultDirName = path.resolve(__dirname, './demo/.tmp');
        const resultPath = path.resolve(resultDirName, `${path.basename(componentDirName)}.md`);
        const files = glob.sync(path.resolve(componentDirName, '*(EXAMPLES|RULES).md'));
        const encoding = 'utf8';

        if (files.length) {
            const resultData = files.reduce((acc, file) => {
                if (path.basename(file, '.md').toLowerCase() === 'examples') {
                    acc += fs.readFileSync(file, encoding);
                } else if (path.basename(file, '.md').toLowerCase() === 'rules') {
                    acc += `\n===RULES===\n${fs.readFileSync(file, encoding)}`;
                }
                return acc;
            }, '');

            mkdirp.sync(resultDirName);
            fs.writeFileSync(resultPath, resultData, encoding);
        }

        return resultPath;
    },
    ignore: ['**/*-test.jsx'],
    styleguideDir: path.resolve(__dirname, './demo/styleguide/'),
    styleguideComponents: {
        StyleGuide: path.resolve(__dirname, './demo/components/styleguide'),
        slots: path.resolve(__dirname, './demo/components/slots')
    },
    template: path.resolve(__dirname, './demo/template.html'),
    webpackConfig: merge.smart(WEBPACK_BASE_TEMPLATE, WEBPACK_DEV_TEMPLATE, {
        devServer: {
            disableHostCheck: true
        },
        resolve: {
            modules: [path.resolve(__dirname, './demo/node_modules')]
        }
    })
};
