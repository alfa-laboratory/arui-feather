const fs = require('fs');
const path = require('path');

const UNDERSCORE_RE = /_/g;
const DASH = '-';

const colorsPath = path.resolve(
    __dirname,
    '../node_modules/alfa-ui-primitives/styles/colors.json'
);
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));

let css = '';
Object.keys(colors).forEach(function (color) {
    const token = colors[color];

    if (token.deprecated) return;

    const name = color.replace(UNDERSCORE_RE, DASH);
    const value = token.a === 1 ? token.hex : token.rgba;

    css += `    --color-${name}: ${value};\n`;
});

const cssPath = path.resolve(__dirname, '../src/vars/primitive-colors.css');
fs.writeFileSync(cssPath, `:root {\n${css}}\n`);
