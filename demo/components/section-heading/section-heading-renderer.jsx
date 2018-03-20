import { PureComponent } from 'react';
import Type from 'prop-types';

import Heading from '../../../src/heading';
import cn from '../../../src/cn';

@cn('section-heading')
class SectionHeadingRenderer extends PureComponent {
    render(cn) {
        const sizes = ['xl', 'l', 'm', 's'];
        // TODO @teryaew: handle 0-6 range for heading sizes
        // const headingLevel = Math.min(6, this.props.depth);

        return (
            <div className={ cn() }>
                <Heading size={ sizes[this.props.depth - 1] } id={ this.props.id }>
                    <a href={ this.context.displayMode === 'all' ? this.props.href : null }>
                        { this.props.children }
                    </a>
                </Heading>
                <div>{ this.props.toolbar }</div>
            </div>
        );
    }
}

SectionHeadingRenderer.propTypes = {
    children: Type.node,
    toolbar: Type.node,
    id: Type.string.isRequired,
    href: Type.string.isRequired,
    depth: Type.number.isRequired,
    deprecated: Type.bool
};

SectionHeadingRenderer.contextTypes = {
    displayMode: Type.string
};

export default SectionHeadingRenderer;
