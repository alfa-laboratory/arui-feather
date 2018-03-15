import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from '../../../../src/cn';

@cn('table')
class TableRenderer extends PureComponent {
    render(cn) {
        return <table className={ cn() }>{ this.props.children }</table>;
    }
}

TableRenderer.propTypes = {
    children: PropTypes.node.isRequired
};

export default TableRenderer;
