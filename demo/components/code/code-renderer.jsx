import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../src/cn';

@cn('code')
class CodeRenderer extends PureComponent {
    render(cn) {
        const isHighlighted = this.props.className && this.props.className.indexOf('lang-') !== -1;

        if (isHighlighted) {
            return <code className={ cn() } dangerouslySetInnerHTML={ { __html: this.props.children } } />;
        }

        return <code className={ cn() }>{ this.props.children }</code>;
    }
}

CodeRenderer.propTypes = {
    className: Type.string,
    children: Type.node.isRequired
};

export default CodeRenderer;
