import React, { Component } from 'react';
import Type from 'prop-types';
import Examples from '../examples';
import SectionHeading from '../section-heading';
import JsDoc from '../js-doc';
import Markdown from '../markdown';
import Slot from '../slot';
import ReactComponentRenderer from './react-component-renderer';
import { DOCS_TAB_USAGE } from '../slots';
import { DisplayModes } from 'react-styleguidist/lib/consts';

import Tabs from '../../../src/tabs';

const ExamplePlaceholder = process.env.STYLEGUIDIST_ENV !== 'production'
    ? require('react-styleguidist/lib/rsg-components/ExamplePlaceholder').default
    : () => <div />;

export default class ReactComponent extends Component {
    static propTypes = {
        component: Type.object.isRequired,
        depth: Type.number.isRequired
    };

    static contextTypes = {
        displayMode: Type.string
    };

    constructor(props, context) {
        super(props, context);

        this.handleTabChange = this.handleTabChange.bind(this);

        this.state = {
            activeTab: undefined
        };
    }

    render() {
        const { activeTab } = this.state;
        const { displayMode } = this.context;
        const { component, depth } = this.props;
        const {
            name, slug, filepath, pathLine
        } = component;
        const { description, examples = [], tags = {} } = component.props;

        if (!name) {
            return null;
        }

        return (
            <ReactComponentRenderer
                name={ name }
                slug={ slug }
                filepath={ filepath }
                pathLine={ pathLine }
                docs={ <JsDoc { ...tags } /> }
                description={ description && <Markdown text={ description } /> }
                heading={
                    <SectionHeading
                        id={ slug }
                        deprecated={ !!tags.deprecated }
                        slotName='componentToolbar'
                        slotProps={ {
                            ...component,
                            isolated: displayMode !== DisplayModes.all
                        } }
                        depth={ depth }
                    >
                        { name }
                    </SectionHeading>
                }
                examples={
                    examples.length > 0 ? (
                        <Examples examples={ examples } name={ name } />
                    ) : (
                        <ExamplePlaceholder name={ name } />
                    )
                }
                tabButtons={
                    <Tabs>
                        {
                            [
                                'examplesTabButton',
                                'docsTabButton',
                                'usageTabButton'
                            ].map(item => ((
                                <Slot
                                    name={ item }
                                    active={ activeTab }
                                    props={ { ...component, onClick: this.handleTabChange } }
                                />
                            )))
                        }
                    </Tabs>
                }
                tabBodies={
                    [
                        'examplesTab',
                        'docsTab',
                        'usageTab'
                    ].map(item => ((
                        <Slot
                            name={ item }
                            active={ activeTab }
                            onlyActive={ true }
                            props={ component }
                        />
                    )))
                }
            />
        );
    }

    handleTabChange(name) {
        this.setState(state => ({
            activeTab: state.activeTab !== name ? name : undefined
        }));
    }
}
