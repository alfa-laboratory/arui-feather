/* eslint import/prefer-default-export: 0 */
/* eslint-disable arrow-body-style */
/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

const path = require('path');
const handlebars = require('handlebars');
const fs = require('fs');

const SIZE_ORDER = ['s', 'm', 'l', 'xl', 'xxl'];

const ICON_REGEXP = new RegExp(/([a-z]*)(_)(.*?)(_)(.*?)(_)([a-z]*)/, 'i');

// Bank name —> bank ID
// We rename banks for convenient usage in apps
const BANKS_MAPPING = {
    'bank-alfa': 'bank-2449',
    'bank-baltiyskiy': 'bank-3308',
    'bank-europe': 'bank-10223',
    'bank-home-credit': 'bank-439',
    'bank-mdm': 'bank-9908',
    'bank-mkb': 'bank-3001',
    'bank-moscow': 'bank-5475',
    'bank-mts': 'bank-1490',
    'bank-otkritie': 'bank-4267',
    'bank-otp': 'bank-7311',
    'bank-psb': 'bank-1516',
    'bank-qiwi': 'bank-1309',
    'bank-raiffeisen': 'bank-8967',
    'bank-russian-standard': 'bank-6415',
    'bank-saint-petersburg': 'bank-285',
    'bank-sber': 'bank-4924',
    'bank-skb': 'bank-5030',
    'bank-societe-generale': 'bank-351',
    'bank-tinkoff': 'bank-256',
    'bank-trust': 'bank-1415',
    'bank-unicredit': 'bank-7687',
    'bank-uralsib': 'bank-7686',
    'bank-uralskiy': 'bank-2377',
    'bank-vozrozhdenie': 'bank-244',
    'bank-vtb': 'bank-404'
};

const COPYRIGHT =
`/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */\n`;

// Check if source is directory
const isDirectory = source => fs.lstatSync(source).isDirectory();

// Remove Dublicates from an array of icons
const removeDublicates = (arr) => {
    return arr.reduce((result, item) => {
        const total = result;

        // Check if icon with such name exists &
        // returns its index in array
        const getIndex = () => total
            .map(i => i.name)
            .indexOf(item.name);

        const sizeItem = {
            size: item.size,
            colored: item.colored
        };

        // If icon with such name doesnt exist, add it
        if (getIndex() < 0) {
            total.push(
                {
                    name: item.name,
                    size: [sizeItem],
                    category: item.category,
                    colored: item.colored,
                    componentName: item.componentName
                }
            );
            return total;
        }

        const sizesArray = total[getIndex()].size;

        // Check if this size already exists
        const sizeIndex = sizesArray
            .map(i => i.size)
            .indexOf(item.size);

        // Add icon, if size doesnt exists or its colored
        if (sizeIndex < 0 || item.colored) {
            sizesArray.push(sizeItem);

            // Sort icons by size
            sizesArray.sort((a, b) => {
                return SIZE_ORDER.indexOf(a.size) >
                SIZE_ORDER.indexOf(b.size) ? 1 : -1;
            });
        }

        return total;
    }, []);
};

// Return filename. Also renames banks
const getFilename = (iconPath) => {
    let filename = path.basename(iconPath, 'icon');
    let name = filename.match(ICON_REGEXP)[3];
    if (name in BANKS_MAPPING) {
        filename = filename.replace(name, BANKS_MAPPING[name]);
    }
    return filename;
};

// Return all directories from source
const getDirectories = source =>
    fs.readdirSync(source)
        .map(name => path.join(source, name))
        .filter(isDirectory);

// Get Handlebars template
const getTemplate = (filename, data) => {
    let template = handlebars.compile(
        fs.readFileSync(`./tools/icon/${filename}.hbs`, 'utf8')
    );
    return template(data);
};

module.exports = {
    ICON_REGEXP,
    getDirectories,
    getTemplate,
    getFilename,
    removeDublicates,
    COPYRIGHT
};
