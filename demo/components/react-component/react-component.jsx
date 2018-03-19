import React, { Component } from 'react';
import Type from 'prop-types';
import SectionHeading from '../section-heading';
import JsDoc from '../js-doc';
import Markdown from '../markdown';
import Slot from '../slot';
import ReactComponentRenderer from './react-component-renderer';
import { EXAMPLES_TAB } from '../slots';
import { DisplayModes } from 'react-styleguidist/lib/consts';

import Tabs from '../../../src/tabs';

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
            activeTab: EXAMPLES_TAB
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
                tabButton={
                    <Tabs>
                        {
                            [
                                'examplesTabButton',
                                'docsTabButton',
                                'usageTabButton'
                            ].map(item => ((
                                // <TabItem
                                //     checked={ activeTab }
                                //     onClick={ () => { this.handleTabChange(this, item); } }
                                // >
                                //     { item }
                                // </TabItem>
                                <Slot
                                    name={ item }
                                    active={ activeTab }
                                    props={ { ...component, onClick: this.handleTabChange } }
                                />
                            )))
                        }
                    </Tabs>
                }
                tabBody={
                    [
                        'examplesTab',
                        'docsTab',
                        'usageTab'
                    ].map(item => ((
                        <Slot
                            name={ item }
                            active={ activeTab }
                            onlyActive={ true }
                            props={ {
                                ...component,
                                examples,
                                name
                            } }
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
