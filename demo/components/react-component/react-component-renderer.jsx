import { PureComponent } from 'react';
import Type from 'prop-types';
import Pathline from '../pathline';

import cn from '../../../src/cn';

@cn('react-component')
class ReactComponentRenderer extends PureComponent {
    render(cn) {
        return (
            <div className={ cn() } id={ `${this.props.name}-container` }>
                <header className={ cn('header') }>
                    { this.props.heading }
                    { this.props.pathLine && <Pathline>{ this.props.pathLine }</Pathline> }
                </header>
                {
                    (this.props.description || this.props.docs) &&
                    <div className={ cn('docs') }>
                        { this.props.description }
                        { this.props.docs }
                    </div>
                }
                {
                    this.props.tabButtons &&
                    <div>
                        <div className={ cn('tab-buttons') }>
                            { this.props.tabButtons }
                        </div>
                        <div className={ cn('tab-bodies') }>
                            { this.props.tabBodies }
                        </div>
                    </div>
                }
                { this.props.examples }
            </div>
        );
    }
}

ReactComponentRenderer.propTypes = {
    name: Type.string.isRequired,
    heading: Type.node.isRequired,
    filepath: Type.string,
    pathLine: Type.string,
    tabButtons: Type.node,
    tabBodies: Type.node,
    description: Type.node,
    docs: Type.node,
    examples: Type.node,
    isolated: Type.bool
};

export default ReactComponentRenderer;
