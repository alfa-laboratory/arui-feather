import React from 'react';
import PropTypes from 'prop-types';

export function SectionsRenderer({ children }) {
    return <section>{ children }</section>;
}

SectionsRenderer.propTypes = {
    children: PropTypes.node
};

export default SectionsRenderer;
