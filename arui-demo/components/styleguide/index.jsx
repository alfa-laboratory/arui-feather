/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
import StyleGuide from 'react-styleguidist/lib/rsg-components/StyleGuide';
import {
    processSections,
    setSlugs,
    slugger
} from 'react-styleguidist/lib/utils/utils';
import { getPlayground, isPlayground } from '../playground-with-share-example-button/utils';
import '../../../src/font/font_roboto.css';

export default function (props) {
    if (isPlayground()) {
        /* eslint global-require: 0 */
        /* eslint import/no-webpack-loader-syntax: 0 */
        /* eslint import/no-unresolved: 0 */
        const styleguide = require('!!react-styleguidist/loaders/styleguide-loader!react-styleguidist/lib/index.js');
        // Reset slugger for each render to be deterministic
        slugger.reset();
        const sections = setSlugs(getPlayground(processSections(styleguide.sections))); // подменяем секции для отображения
        /* eslint react/prop-types: 0 */
        // Показываем код сразу
        const config = { ...props.config, showCode: true };
        return (
            <StyleGuide { ...props } config={ config } sections={ sections } isolatedComponent={ true } />
        );
    }

    return (
        <StyleGuide { ...props } />
    );
}

