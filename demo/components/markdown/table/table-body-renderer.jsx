import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../../src/cn';

@cn('table-body')
class TableBodyRenderer extends PureComponent {
    render(cn) {
        return <tbody className={ cn() }>{ this.props.children }</tbody>;
    }
}

TableBodyRenderer.propTypes = {
    children: Type.node.isRequired
};

export default TableBodyRenderer;
