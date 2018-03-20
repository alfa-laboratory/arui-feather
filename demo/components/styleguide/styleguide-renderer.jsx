import { PureComponent } from 'react';
import Type from 'prop-types';

import Logo from '../logo';

import cn from '../../../src/cn';

@cn('styleguide')
class StyleGuideRenderer extends PureComponent {
    render(cn) {
        return (
            <div className={ cn({ 'has-sidebar': this.props.hasSidebar }) }>
                <main className={ cn('content') }>
                    <div className={ cn('inner') }>
                        { this.props.children }
                    </div>
                </main>
                {
                    this.props.hasSidebar &&
                    <div className={ cn('sidebar') }>
                        <div>
                            <Logo>{ this.props.title }</Logo>
                        </div>
                        { this.props.toc }
                    </div>
                }
            </div>
        );
    }
}

StyleGuideRenderer.propTypes = {
    title: Type.string.isRequired,
    homepageUrl: Type.string.isRequired,
    children: Type.node.isRequired,
    toc: Type.node.isRequired,
    hasSidebar: Type.bool
};

export default StyleGuideRenderer;
