import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../src/cn';

@cn('examples')
class ExamplesRenderer extends PureComponent {
    render(cn) {
        return <article className={ cn() }>{ this.props.children }</article>;
    }
}

ExamplesRenderer.propTypes = {
    className: Type.string,
    children: Type.node
};

export default ExamplesRenderer;
