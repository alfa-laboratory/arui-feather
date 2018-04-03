/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint-disable no-console */

const del = require('del');
const fs = require('fs');
const glob = require('glob');
const mkdirp = require('mkdirp');
const path = require('path');
const uppercamelcase = require('uppercamelcase');

const {
    removeDublicates,
    getFilename,
    getDirectories,
    getTemplate,
    ICON_REGEXP,
    COPYRIGHT
} = require('./utils');

console.info('⏳ Creating icons...');
console.time('In time');

// Folders to add
const CATEGORIES = [
    'action',
    'banking',
    'brand',
    'category',
    'currency',
    'entity',
    'file',
    'ui',
    'user'
];

class Icon {
    constructor(iconPath) {
        this.fileName = getFilename(iconPath);
        this.path = iconPath;
        this.categoryPath = `./src/icon/${this
            .getCategory()}/${this.getName()}/`;
        this.indexFile = `${this.categoryPath}index.js`;
        this.cssFile = `${this.categoryPath}${this.getName()}.css`;
        this.jsxFile = `${this.categoryPath}${this.getName()}.jsx`;
        this.name = this.getName();
        this.category = this.getCategory();
        this.componentName = `Icon${uppercamelcase(this.getName())}`;
        this.size = this.getSize();
        this.color = this.getColor();
        this.colored = this.getColor() === 'color';
        this.aruiColor = this.getAruiColor();
        this.classes = this.getClasses();
    }

    getClasses() {
        let classes = `.icon_size_${this.getSize()}.icon_name_${this.getName()}`;
        if (!this.getAruiColor()) {
            classes += '.icon_colored.icon_theme_alfa-on-color';
            classes += `, .icon_size_${this.getSize()}.icon_name_${this.getName()}`;
            classes += '.icon_colored.icon_theme_alfa-on-white';
        } else {
            classes += `.icon_theme_${this.getAruiColor()}`;
        }
        return classes;
    }

    // Category
    getCategory() {
        return path.basename(path.dirname(this.path));
    }

    // Name
    getName() {
        return this.fileName.match(ICON_REGEXP)[3];
    }

    // Size
    getSize() {
        return this.fileName.match(ICON_REGEXP)[5];
    }

    // Color
    getColor() {
        return this.fileName.match(ICON_REGEXP)[7];
    }

    // Color in arui fashion
    getAruiColor() {
        let color = this.getColor();
        if (color === 'white') return 'alfa-on-color';
        if (color === 'black') return 'alfa-on-white';
        return false;
    }
}


// Get icons
const icons = [];

CATEGORIES.forEach((folder) => {
    glob.sync(
        `./node_modules/alfa-ui-primitives/icons/${folder}/**/*.svg`)
        .map(file => icons.push(new Icon(file)));
});

// Delete folders
const clean = new Promise((resolve) => {
    getDirectories('./src/icon').map(file => del.sync(file));
    resolve();
});

// Create icon-test.jsx
const createTests = () => new Promise((resolve) => {
    const shortIcons = removeDublicates(icons);
    fs.writeFileSync(
        './src/icon/icon-test.jsx',
        getTemplate('icon-test.jsx', shortIcons)
    );
    resolve();
});

// Create folder structure
const createFolders = () => new Promise((resolve) => {
    icons.map(item => mkdirp.sync(item.categoryPath));
    resolve();
});

// Component files
const createComponents = () => new Promise((resolve) => {
    icons.forEach((item) => {
        // Copy .svg
        fs.copyFileSync(item.path, `${item.categoryPath}${item.fileName}`);

        // Create index.js
        fs.writeFileSync(item.indexFile, getTemplate('index.js', item));

        // Create .jsx
        fs.writeFileSync(item.jsxFile, getTemplate('icon.jsx', item));

        // Create .css & add copyright
        if (!fs.existsSync(item.cssFile)) fs.writeFileSync(item.cssFile, COPYRIGHT);

        // Add CSS rule
        fs.appendFileSync(item.cssFile, getTemplate('icon.css', item), 'utf8');
    });
    resolve();
});

// Main process. Clean icons, create documentaion, folder structure,
// copy svgs, create index.js, .jsx and css files for component.
Promise.all([
    clean,
    createTests(),
    createFolders(),
    createComponents()
])
    .then(() => {
        console.info(`Created: ${icons.length} icons`);
        console.timeEnd('In time');
    })
    .catch((err) => {
        if (err) throw err;
    });
