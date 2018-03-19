/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import Type from 'prop-types';
import map from 'lodash/map';
import Markdown from '../markdown';

const plural = (array, caption) => (array.length === 1 ? caption : `${caption}s`);
const list = array => array.map(item => item.description).join(', ');
const paragraphs = array => array.map(item => item.description).join('\n\n');

const fields = {
    deprecated: value => `**Deprecated:** ${value[0].description}`,
    see: value => paragraphs(value),
    link: value => paragraphs(value),
    author: value => `${plural(value, 'Author')}: ${list(value)}`,
    version: value => `Version: ${value[0].description}`,
    since: value => `Since: ${value[0].description}`
};

export function getMarkdown(props) {
    return map(fields, (format, field) => props[field] && format(props[field]))
        .filter(Boolean)
        .join('\n\n');
}

export default function JsDoc(props) {
    const markdown = getMarkdown(props);
    return markdown ? <Markdown text={ markdown } /> : null;
}

JsDoc.propTypes = {
    deprecated: Type.array,
    see: Type.array,
    link: Type.array,
    author: Type.array,
    version: Type.array,
    since: Type.array
};
