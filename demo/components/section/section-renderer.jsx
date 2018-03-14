import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';
import SectionHeading from '../section-heading';

import cn from '../../../src/cn';

@cn('section')
export class SectionRenderer extends PureComponent {
    render(cn) {
        return (
            <section className={ cn() }>
                {
                    this.props.name &&
                    <SectionHeading
                        depth={ this.props.depth }
                        id={ this.props.slug }
                        slotName='sectionToolbar'
                        slotProps={ this.props }
                    >
                        { this.props.name }
                    </SectionHeading>
                }
                { this.props.description && <Markdown text={ this.props.description } /> }
                { this.props.content }
                { this.props.sections }
                { this.props.components }
            </section>
        );
    }
}

SectionRenderer.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
    slug: PropTypes.string,
    filepath: PropTypes.string,
    content: PropTypes.node,
    components: PropTypes.node,
    sections: PropTypes.node,
    isolated: PropTypes.bool,
    depth: PropTypes.number.isRequired
};

export default SectionRenderer;
