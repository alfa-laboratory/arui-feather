import React from 'react';
import PropTypes from 'prop-types';

import Button from '../../../src/button';

import './slots.css';

const CodeTabButton = props => <Button { ...props }>{ '<>' }</Button>;

CodeTabButton.propTypes = {
    active: PropTypes.bool,
    name: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default CodeTabButton;
