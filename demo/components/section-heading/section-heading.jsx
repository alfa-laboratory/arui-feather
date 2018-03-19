/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import Type from 'prop-types';
import getUrl from 'react-styleguidist/lib/utils/getUrl';
import Slot from '../slot';
import SectionHeadingRenderer from './section-heading-renderer';

export default function SectionHeading({
    slotName, slotProps, children, id, ...rest
}) {
    const href = getUrl({ slug: id, anchor: true });
    return (
        <SectionHeadingRenderer
            toolbar={ <Slot name={ slotName } props={ slotProps } /> }
            id={ id }
            href={ href }
            { ...rest }
        >
            { children }
        </SectionHeadingRenderer>
    );
}

SectionHeading.propTypes = {
    children: Type.node,
    id: Type.string.isRequired,
    slotName: Type.string.isRequired,
    slotProps: Type.object.isRequired,
    depth: Type.number.isRequired,
    deprecated: Type.bool
};
