const fs = require('fs');
const path = require('path');

const colorsPath = path.resolve(__dirname, '../node_modules/alfa-ui-primitives/colors.json');
const colors = JSON.parse(fs.readFileSync(colorsPath, 'utf8'));

let css = ':root {\n';
for (let color in colors) {
  if (colors.hasOwnProperty(color)) {
    css += `    --${color.replace(/_/g, '-')}: ${colors[color]};\n`;
  }
}
css += '}\n';

const cssPath = path.resolve(__dirname, '../src/vars/primitive-colors.css');
fs.writeFileSync(cssPath, css);
