import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Examples from 'react-styleguidist/lib/rsg-components/Examples';
import SectionHeading from '../section-heading';
import JsDoc from 'react-styleguidist/lib/rsg-components/JsDoc';
import Markdown from 'react-styleguidist/lib/rsg-components/Markdown';
import Slot from 'react-styleguidist/lib/rsg-components/Slot';
import ReactComponentRenderer from './react-component-renderer';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes } from 'react-styleguidist/lib/consts';

const ExamplePlaceholder =
	process.env.STYLEGUIDIST_ENV !== 'production'
		? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder').default
		: () => <div />;

export default class ReactComponent extends Component {
	static propTypes = {
		component: PropTypes.object.isRequired,
		depth: PropTypes.number.isRequired
	};
	static contextTypes = {
		config: PropTypes.object.isRequired,
		displayMode: PropTypes.string
	};

	constructor(props, context) {
		super(props, context);
		const { showUsage } = context.config;

		this.handleTabChange = this.handleTabChange.bind(this);

		this.state = {
			activeTab: showUsage ? DOCS_TAB_USAGE : undefined,
		};
	}

	handleTabChange(name) {
		this.setState(state => ({
			activeTab: state.activeTab !== name ? name : undefined,
		}));
	}

	render() {
		const { activeTab } = this.state;
		const { displayMode } = this.context;
		const { component, depth } = this.props;
		const { name, slug, filepath, pathLine } = component;
		const { description, examples = [], tags = {} } = component.props;
		if (!name) {
			return null;
		}

		return (
			<ReactComponentRenderer
				name={name}
				slug={slug}
				filepath={filepath}
				pathLine={pathLine}
				docs={<JsDoc {...tags} />}
				description={description && <Markdown text={description} />}
				heading={
					<SectionHeading
						id={slug}
						deprecated={!!tags.deprecated}
						slotName='componentToolbar'
						slotProps={{
							...component,
							isolated: displayMode !== DisplayModes.all,
						}}
						depth={depth}
					>
						{name}
					</SectionHeading>
				}
				examples={
					examples.length > 0 ? (
						<Examples examples={examples} name={name} />
					) : (
						<ExamplePlaceholder name={name} />
					)
				}
				tabButtons={
					<Slot
						name='docsTabButtons'
						active={activeTab}
						props={{ ...component, onClick: this.handleTabChange }}
					/>
				}
				tabBody={<Slot name='docsTabs' active={activeTab} onlyActive props={component} />}
			/>
		);
	}
}
