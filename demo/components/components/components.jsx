/* eslint react/forbid-prop-types: 0 */

import React from 'react';
import Type from 'prop-types';
import ReactComponent from '../react-component';
import ComponentsRenderer from './components-renderer';

export default function Components({ components, depth }) {
    return (
        <ComponentsRenderer>
            {
                components.map(component => (
                    <ReactComponent
                        key={ component.filepath }
                        component={ component }
                        depth={ depth }
                    />
                ))
            }
        </ComponentsRenderer>
    );
}

Components.propTypes = {
    components: Type.array.isRequired,
    depth: Type.number.isRequired
};
