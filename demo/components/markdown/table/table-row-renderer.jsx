import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../../src/cn';

@cn('table-row')
class TableRowRenderer extends PureComponent {
    render(cn) {
        return <tr className={ cn() }>{ this.props.children }</tr>;
    }
}

TableRowRenderer.propTypes = {
    children: Type.node.isRequired
};

export default TableRowRenderer;
