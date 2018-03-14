import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Logo from 'react-styleguidist/lib/rsg-components/Logo/LogoRenderer';
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';
import Styled from 'react-styleguidist/lib/rsg-components/Styled';

import cn from '../../../src/cn';

@cn('styleguide')
export class StyleGuideRenderer extends PureComponent {
	render(cn) {
		return (
			<div className={ cn({ 'has-sidebar': this.props.hasSidebar }) }>
				<main className={ cn('content') }>
					{ this.props.children }
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
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	homepageUrl: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	toc: PropTypes.node.isRequired,
	hasSidebar: PropTypes.bool
};

export default StyleGuideRenderer;
