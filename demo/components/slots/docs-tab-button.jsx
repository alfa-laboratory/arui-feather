import React from 'react';
import Type from 'prop-types';

import Button from '../../../src/button';

const ExamplesTabButton = (props) => {
    const component = props.props;
    const showButton = component.props || (component.methods && component.methods.length > 0);
    return showButton ? <Button { ...props }>Свойства и методы</Button> : null;
};

ExamplesTabButton.propTypes = {
    onClick: Type.func.isRequired,
    name: Type.string.isRequired,
    props: Type.shape({
        props: Type.object,
        methods: Type.array
    }).isRequired,
    active: Type.bool
};

export default ExamplesTabButton;
