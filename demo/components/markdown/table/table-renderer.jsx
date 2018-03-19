import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../../src/cn';

@cn('table')
class TableRenderer extends PureComponent {
    render(cn) {
        return <table className={ cn() }>{ this.props.children }</table>;
    }
}

TableRenderer.propTypes = {
    children: Type.node.isRequired
};

export default TableRenderer;
