/* eslint react/forbid-prop-types: 0 */

import { PureComponent } from 'react';
import Type from 'prop-types';

import cn from '../../../src/cn';

@cn('playground')
class PlaygroundRenderer extends PureComponent {
    render(cn) {
        const { className, ...props } = this.props.previewProps;
        return (
            <div className={ cn() }>
                <div className={ cn('preview') } { ...props } data-preview={ this.props.name }>
                    { this.props.preview }
                </div>
                <div className={ cn('controls') }>
                    <div className={ cn('tabs') }>{ this.props.tabButtons }</div>
                    <div className={ cn('toolbar') }>{ this.props.toolbar }</div>
                </div>
                <div className={ cn('tab') }>{ this.props.tabBody }</div>
            </div>
        );
    }
}

PlaygroundRenderer.propTypes = {
    className: Type.string,
    name: Type.string.isRequired,
    preview: Type.node.isRequired,
    previewProps: Type.object.isRequired,
    tabButtons: Type.node.isRequired,
    tabBody: Type.node.isRequired,
    toolbar: Type.node.isRequired
};

export default PlaygroundRenderer;
