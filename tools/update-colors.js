const fs = require('fs');
const path = require('path');

const ARGB_RE = /^#(\w\w)?(\w\w)(\w\w)(\w\w)$/;
const UNDERSCORE_RE = /_/g;
const DASH = '-';
const BYTE = 256;

const colorsPath = path.resolve(__dirname, '../node_modules/alfa-ui-primitives/colors.json');
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));

function convertToAlfa(value) {
    if (!value) {
        return 1;
    }

    const byteValue = parseInt(value, 16);
    const share = byteValue / BYTE;

    return Math.round(share * 100) / 100;
}

function ARGBHexToRgba(hex) {
    const regMatch = ARGB_RE.exec(hex);

    if (!regMatch) {
        // If format doesn't match, we suggest it's already in proper format (rgba() or #RRGGBB).
        return hex;
    }

    const channelA = convertToAlfa(regMatch[1]);
    const channelR = parseInt(regMatch[2], 16);
    const channelG = parseInt(regMatch[3], 16);
    const channelB = parseInt(regMatch[4], 16);

    return `rgba(${channelR}, ${channelG}, ${channelB}, ${channelA})`;
}

let css = '';
Object.keys(colors).forEach(function (color) {
    const name = color.replace(UNDERSCORE_RE, DASH);
    const value = ARGBHexToRgba(colors[color]);

    css += `    --color-${name}: ${value};\n`;
});

const cssPath = path.resolve(__dirname, '../src/vars/primitive-colors.css');
fs.writeFileSync(cssPath, `:root {\n${css}}\n`);
