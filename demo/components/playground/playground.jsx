import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import Preview from 'react-styleguidist/lib/rsg-components/Preview';
import { DisplayModes } from 'react-styleguidist/lib/consts';

import Paragraph from '../../../src/paragraph';

import PlaygroundRenderer from './playground-renderer';

import Slot from '../slot';
import { EXAMPLE_TAB_CODE_EDITOR } from '../slots';


export default class Playground extends Component {
    static propTypes = {
        code: PropTypes.string.isRequired,
        evalInContext: PropTypes.func.isRequired,
        index: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        settings: PropTypes.object
    };

    static contextTypes = {
        config: PropTypes.object.isRequired,
        displayMode: PropTypes.string
    };

    constructor(props, context) {
        super(props, context);
        const { code, settings } = props;
        const { config } = context;
        const showCode = settings.showcode !== undefined ? settings.showcode : config.showCode;

        this.state = {
            code,
            activeTab: showCode ? EXAMPLE_TAB_CODE_EDITOR : undefined,
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleChange = debounce(this.handleChange.bind(this), config.previewDelay);
    }

    componentWillReceiveProps(nextProps) {
        const { code } = nextProps;
        this.setState({
            code,
        });
    }

    componentWillUnmount() {
        // Clear pending changes
        this.handleChange.cancel();
    }

    render() {
        const { code, activeTab } = this.state;
        const { evalInContext, index, name, settings } = this.props;
        const { displayMode } = this.context;
        const preview = <Preview code={code} evalInContext={evalInContext} />;
        if (settings.noeditor) {
            return <Paragraph>{ preview }</Paragraph>;
        }

        return (
            <PlaygroundRenderer
                name={name}
                preview={preview}
                previewProps={settings.props || {}}
                tabButtons={
                    <Slot
                        name='examplesTabButton'
                        active={activeTab}
                        props={{ onClick: this.handleTabChange }}
                    />
                }
                tabBody={
                    <Slot
                        name='examplesTab'
                        active={activeTab}
                        onlyActive
                        props={{ code, onChange: this.handleChange }}
                    />
                }
                toolbar={
                    <Slot
                        name='examplesToolbar'
                        props={{ name, isolated: displayMode === DisplayModes.example, example: index }}
                    />
                }
            />
        );
    }

    handleChange(code) {
        this.setState({
            code
        });
    }

    handleTabChange(name) {
        this.setState(state => ({
            activeTab: state.activeTab !== name ? name : undefined,
        }));
    }
}
