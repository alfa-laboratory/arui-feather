import React from 'react';
import Type from 'prop-types';
import Section from '../section';
import SectionsRenderer from './sections-renderer';

export default function Sections({ sections, depth }) {
    return (
        <SectionsRenderer>
            {
                sections.map((section, idx) => (
                    <Section
                        key={ idx }
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
