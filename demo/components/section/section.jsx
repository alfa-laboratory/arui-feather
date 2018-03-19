import React from 'react';
import Type from 'prop-types';
import Examples from '../examples';
import Components from '../components';
import Sections from '../sections';
import SectionRenderer from './section-renderer';
import { DisplayModes } from 'react-styleguidist/lib/consts';

export default function Section({ section, depth }, { displayMode }) {
    const {
        name, slug, filepath, content, components, sections, description
    } = section;

    const contentJsx = content && <Examples examples={ content } name={ name } />;
    const componentsJsx = components && <Components components={ components } depth={ depth + 1 } />;
    const sectionsJsx = sections && <Sections sections={ sections } depth={ depth + 1 } />;

    return (
        <SectionRenderer
            description={ description }
            name={ name }
            slug={ slug }
            filepath={ filepath }
            content={ contentJsx }
            components={ componentsJsx }
            sections={ sectionsJsx }
            isolated={ displayMode !== DisplayModes.all }
            depth={ depth }
        />
    );
}

Section.propTypes = {
    section: Type.object.isRequired,
    depth: Type.number.isRequired
};

Section.contextTypes = {
    displayMode: Type.string
};
