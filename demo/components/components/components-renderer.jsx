import React from 'react';
import Type from 'prop-types';

export default function ComponentsRenderer({ children }) {
    return <div>{ children }</div>;
}

ComponentsRenderer.propTypes = {
    children: Type.node.isRequired
};
