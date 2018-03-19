import React from 'react';
import Type from 'prop-types';

import TabItem from '../../../src/tab-item';

const TabButton = (props) => {
    const component = props.props;
    const showButton = component && (component.props || (component.methods && component.methods.length > 0));
    return showButton ? <TabItem { ...props } checked={ props.active }>{ props.children }</TabItem> : null;
};

TabButton.propTypes = {
    onClick: Type.func.isRequired,
    name: Type.string.isRequired,
    props: Type.shape({
        props: Type.object,
        methods: Type.array
    }).isRequired,
    active: Type.bool,
    children: Type.node
};

export default TabButton;
