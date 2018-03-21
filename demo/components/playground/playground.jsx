/* eslint import/no-extraneous-dependencies: 0 */
/* eslint react/forbid-prop-types: 0 */

import React, { Component } from 'react';
import Type from 'prop-types';
import debounce from 'lodash/debounce'; // Via react-styleguidist package
import { DisplayModes } from 'react-styleguidist/lib/consts';
import Preview from '../preview';

import IconButton from '../../../src/icon-button';
import IconShare from '../../../src/icon/action/share-ios';
import Paragraph from '../../../src/paragraph';

import PlaygroundRenderer from './playground-renderer';

import Slot from '../slot';
import { CODE_VIEW } from '../slots';

export default class Playground extends Component {
    static propTypes = {
        code: Type.string.isRequired,
        evalInContext: Type.func.isRequired,
        index: Type.number.isRequired,
        name: Type.string.isRequired,
        settings: Type.object
    };

    static contextTypes = {
        config: Type.object.isRequired,
        displayMode: Type.string
    };

    constructor(props, context) {
        super(props, context);
        const { code, settings } = props;
        const { config } = context;
        const showCode = settings.showcode !== undefined ? settings.showcode : config.showCode;

        this.state = {
            code,
            activeTab: showCode ? CODE_VIEW : undefined
        };

        this.handleTabChange = this.handleTabChange.bind(this);
        this.handleChange = debounce(this.handleChange.bind(this), config.previewDelay);
        this.handleShareExampleClick = this.handleShareExampleClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { code } = nextProps;
        this.setState({
            code
        });
    }

    componentWillUnmount() {
        // Clear pending changes
        this.handleChange.cancel();
    }

    render() {
        const { code, activeTab } = this.state;
        const {
            evalInContext, index, name, settings
        } = this.props;
        const { displayMode } = this.context;
        const preview = <Preview code={ code } evalInContext={ evalInContext } />;
        if (settings.noeditor) {
            return <Paragraph>{ preview }</Paragraph>;
        }

        return (
            <PlaygroundRenderer
                name={ name }
                preview={ preview }
                previewProps={ settings.props || {} }
                tabButtons={
                    <div>
                        {
                            (activeTab || displayMode === 'component') &&
                            <IconButton
                                onClick={ this.handleShareExampleClick }
                                className='playground__share-button'
                                title='Ссылка на результат'
                            >
                                <IconShare />
                            </IconButton>
                        }
                        {
                            displayMode === 'all' &&
                            <Slot
                                name='codeButton'
                                active={ activeTab }
                                props={ {
                                    onClick: this.handleTabChange,
                                    className: 'playground__code-button',
                                    title: 'Показать код'
                                } }
                            />
                        }
                    </div>
                }
                tabBody={
                    <Slot
                        name='codeView'
                        active={ activeTab }
                        onlyActive={ displayMode === 'all' }
                        props={ { code, onChange: this.handleChange } }
                    />
                }
                toolbar={
                    <Slot
                        name='examplesToolbar'
                        props={ { name, isolated: displayMode === DisplayModes.example, example: index } }
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
            activeTab: state.activeTab !== name ? name : undefined
        }));
    }

    handleShareExampleClick() {
        const code = encodeURI(this.state.code);
        const { pathname } = window.location;
        window.open(`${pathname}#playground/code=${code}`, '_blank');
    }
}
