import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../../src/cn';

@cn('table-head')
class TableHeadRenderer extends PureComponent {
    render(cn) {
        return <tbody className={ cn() }>{ this.props.children }</tbody>;
    }
}

TableHeadRenderer.propTypes = {
    children: Type.node.isRequired
};

export default TableHeadRenderer;
