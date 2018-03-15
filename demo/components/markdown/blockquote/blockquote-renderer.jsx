import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import cn from '../../../../src/cn';

@cn('blockquote')
class BlockquoteRenderer extends PureComponent {
    render(cn) {
        return <blockquote className={ cn() }>{ this.props.children }</blockquote>;
    }
}
BlockquoteRenderer.propTypes = {
    children: PropTypes.node.isRequired
};

export default BlockquoteRenderer;
