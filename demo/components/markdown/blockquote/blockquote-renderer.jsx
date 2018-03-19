import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../../src/cn';

@cn('blockquote')
class BlockquoteRenderer extends PureComponent {
    render(cn) {
        return <blockquote className={ cn() }>{ this.props.children }</blockquote>;
    }
}
BlockquoteRenderer.propTypes = {
    children: Type.node.isRequired
};

export default BlockquoteRenderer;
