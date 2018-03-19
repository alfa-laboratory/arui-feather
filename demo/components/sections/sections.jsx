/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import Type from 'prop-types';
import Section from '../section';
import SectionsRenderer from './sections-renderer';

export default function Sections({ sections, depth }) {
    return (
        <SectionsRenderer>
            {
                sections.map((section, index) => (
                    <Section
                        key={ `${index + depth}` }
                        section={ section }
                        depth={ depth }
                    />
                ))
            }
        </SectionsRenderer>
    );
}

Sections.propTypes = {
    sections: Type.array.isRequired,
    root: Type.bool,
    depth: Type.number.isRequired
};
