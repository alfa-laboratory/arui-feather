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
    COPYRIGHT,
    BANKS_MAPPING,
    BANKS_MAPPING_ADDITIONAL
} = require('./utils');

console.info('⏳ Creating icons...');
console.time('In time');

// Folders to add
const CATEGORIES = ['action', 'banking', 'brand', 'category', 'currency', 'entity', 'file', 'ui', 'user'];

class Icon {
    constructor(iconPath, mapping) {
        this.fileName = getFilename(iconPath, mapping);
        this.path = iconPath;
        this.categoryPath = `./src/icon/${this.getCategory()}/${this.getName()}/`;
        this.indexFile = `${this.categoryPath}index.ts`;
        this.cssFile = `${this.categoryPath}${this.getName()}.css`;
        this.tsxFile = `${this.categoryPath}${this.getName()}.tsx`;
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
const additionalIcons = [];

// Populate icons array
CATEGORIES.forEach((folder) => {
    glob.sync(`./node_modules/alfa-ui-primitives/icons/${folder}/**/*.svg`).forEach((iconPath) => {
        let filename = path.basename(iconPath, 'icon');
        let name = filename.match(ICON_REGEXP)[3];

        /**
         * Наполнение списка иконок по-умолчанию.
         */
        const icon = new Icon(iconPath, {});
        icons.push(icon);

        /**
         * Дополнительное наполнение списка иконок - дублируем иконки, переименовывая их.
         * Действие выполняется для иконок, имена которых находятся в маппинге BANKS_MAPPING
         */
        if (name in BANKS_MAPPING) {
            const additionalIcon = new Icon(iconPath, BANKS_MAPPING);
            additionalIcons.push(additionalIcon);
        }

        /**
         * Дополнительное наполнение списка иконок - дублируем иконки, переименовывая их.
         * Действие выполняется для иконок, имена которых находятся в маппинге BANKS_MAPPING_ADDITIONAL
         */
        if (name in BANKS_MAPPING_ADDITIONAL) {
            const additionalIcon = new Icon(iconPath, BANKS_MAPPING_ADDITIONAL);
            additionalIcons.push(additionalIcon);
        }
    });
});

// Delete folders
const clean = new Promise((resolve) => {
    getDirectories('./src/icon').map(file => del.sync(file));
    resolve();
});

// Create icon-test.tsx
const createTests = arr =>
    new Promise((resolve) => {
        const shortIcons = removeDublicates(arr);
        fs.writeFileSync('./src/icon/icon.test.tsx', getTemplate('icon.test.tsx', shortIcons));
        resolve();
    });

// Create folder structure
const createFolders = arr =>
    new Promise((resolve) => {
        arr.map(item => mkdirp.sync(item.categoryPath));
        resolve();
    });

// Component files
const createComponents = arr =>
    new Promise((resolve) => {
        arr.forEach((item) => {
            // Copy .svg
            fs.copyFileSync(item.path, `${item.categoryPath}${item.fileName}`);

            // Create index.ts
            fs.writeFileSync(item.indexFile, getTemplate('index.ts', item));

            // Create .tsx
            fs.writeFileSync(item.tsxFile, getTemplate('icon.tsx', item));

            // Create .css & add copyright
            if (!fs.existsSync(item.cssFile)) fs.writeFileSync(item.cssFile, COPYRIGHT);

            // Add CSS rule
            fs.appendFileSync(item.cssFile, getTemplate('icon.css', item), 'utf8');
        });
        resolve();
    });

// Main process. Clean icons, create documentaion, folder structure,
// copy svgs, create index.ts, .tsx and css files for component.

const allIcons = [...icons, ...additionalIcons];
Promise.all([clean, createTests(allIcons), createFolders(allIcons), createComponents(allIcons)])
    .then(() => {
        console.info(`Created: ${icons.length} icons`);
        console.timeEnd('In time');
    })
    .catch((err) => {
        if (err) throw err;
    });
