import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../../src/cn';

@cn('table-cell')
class TableCellRenderer extends PureComponent {
    render(cn) {
        if (this.props.header) {
            return <th className={ cn() }>{ this.props.children }</th>;
        }

        return <td className={ cn() }>{ this.props.children }</td>;
    }
}

TableCellRenderer.propTypes = {
    children: Type.node.isRequired,
    header: Type.bool
};

export default TableCellRenderer;
