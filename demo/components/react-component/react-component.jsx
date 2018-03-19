/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */
/* eslint react/forbid-prop-types: 0 */

import React, { Component } from 'react';
import Type from 'prop-types';
import { DisplayModes } from 'react-styleguidist/lib/consts';
import SectionHeading from '../section-heading';
import JsDoc from '../js-doc';
import Markdown from '../markdown';
import Slot from '../slot';
import ReactComponentRenderer from './react-component-renderer';
import { EXAMPLES_TAB } from '../slots';

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

        let resultExamples = [];
        const RULES_PLACEHOLDER = /===RULES===/g;
        const rules = examples.reduce((acc, item) => {
            if (item.type === 'markdown' && RULES_PLACEHOLDER.test(item.content)) {
                acc.push({ ...item, content: item.content.replace(RULES_PLACEHOLDER, '') });
            } else {
                resultExamples.push(item);
            }
            return acc;
        }, []);

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
                                'rulesTabButton'
                            ].map(item => ((
                                <Slot
                                    key={ item }
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
                        'rulesTab'
                    ].map(item => ((
                        <Slot
                            key={ item }
                            name={ item }
                            active={ activeTab }
                            onlyActive={ true }
                            props={ {
                                ...component,
                                props: {
                                    ...component.props,
                                    examples: resultExamples,
                                    rules
                                }
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
