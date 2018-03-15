import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from '../../../../src/cn';

import './pre.css';

@cn('pre')
class PreRenderer extends PureComponent {
    render(cn) {
        return <pre className={ cn() }>{ this.props.children }</pre>;
    }
}

PreRenderer.propTypes = {
    children: PropTypes.node.isRequired
};

export default PreRenderer;
