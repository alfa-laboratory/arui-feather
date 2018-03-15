import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../src/button';

const ExamplesTabButton = (props) => {
    const component = props.props;
    const showButton = component.props || (component.methods && component.methods.length > 0);
    return showButton ? <Button { ...props }>Примеры и код</Button> : null;
};

ExamplesTabButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    props: PropTypes.shape({
        props: PropTypes.object,
        methods: PropTypes.array
    }).isRequired,
    active: PropTypes.bool
};

export default ExamplesTabButton;
