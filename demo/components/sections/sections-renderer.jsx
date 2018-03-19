import React from 'react';
import Type from 'prop-types';

function SectionsRenderer({ children }) {
    return <section>{ children }</section>;
}

SectionsRenderer.propTypes = {
    children: Type.node
};

export default SectionsRenderer;
