// TODO @teryaew: move to arui-presets?

// https://github.com/kisenka/svg-sprite-loader/tree/master/examples/custom-runtime-generator

let path = require('path');
let pascalCase = require('pascal-case');
let { stringifyRequest } = require('loader-utils');
let { stringifySymbol, stringify } = require('svg-sprite-loader/lib/utils');

module.exports = function runtimeGenerator({ symbol, config, context, loaderContext }) {
    let { spriteModule, symbolModule, runtimeOptions } = config;
    let compilerContext = loaderContext._compiler.context;

    let iconModulePath = path.resolve(compilerContext, runtimeOptions.iconModule);
    let iconModuleRequest = stringify(
        path.relative(path.dirname(symbol.request.file), iconModulePath)
    );

    let spriteRequest = stringifyRequest({ context }, spriteModule);
    let symbolRequest = stringifyRequest({ context }, symbolModule);
    let parentComponentDisplayName = 'SpriteSymbolComponent';
    let displayName = `${pascalCase(symbol.id)}${parentComponentDisplayName}`;

    return `
        import React from 'react';
        import SpriteSymbol from ${symbolRequest};
        import sprite from ${spriteRequest};
        import ${parentComponentDisplayName} from ${iconModuleRequest};

        let symbol = new SpriteSymbol(${stringifySymbol(symbol)});
        sprite.add(symbol);
        export default class ${displayName} extends React.Component {
            render() {
                return <${parentComponentDisplayName} glyph="${symbol.id}" {...this.props} />;
            }
        }
    `;
};
