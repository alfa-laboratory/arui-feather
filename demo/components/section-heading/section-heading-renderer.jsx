import { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Heading from '../../../src/heading';
import cn from '../../../src/cn';

import './section-heading.css';

@cn('section-heading')
class SectionHeadingRenderer extends PureComponent {
    render(cn) {
        const sizes = ['xl', 'l', 'm', 's'];
        // TODO @teryaew: handle 0-6 range for heading sizes
        // const headingLevel = Math.min(6, this.props.depth);

        return (
            <div className={ cn() }>
                <Heading size={ sizes[this.props.depth - 1] } id={ this.props.id }>
                    <a href={ this.props.href }>
                        { this.props.children }
                    </a>
                </Heading>
                <div>{ this.props.toolbar }</div>
            </div>
        );
    }
}

SectionHeadingRenderer.propTypes = {
    children: PropTypes.node,
    toolbar: PropTypes.node,
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    depth: PropTypes.number.isRequired,
    deprecated: PropTypes.bool
};

export default SectionHeadingRenderer;
