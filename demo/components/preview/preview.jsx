/* eslint import/no-extraneous-dependencies: 0 */

import React, { Component } from 'react';
import Type from 'prop-types';
import ReactDOM from 'react-dom';
import noop from 'lodash/noop'; // Via react-styleguidist package
import { transform } from 'buble'; // Via react-styleguidist package
import PlaygroundError from 'react-styleguidist/lib/rsg-components/PlaygroundError';

import PreviewWithThemeSwitcher from '../preview-with-theme-switcher'; // instead of <Wrapper />

import cn from '../../../src/cn';

/* eslint-disable react/no-multi-comp */

const compileCode = (code, config) => transform(code, config).code;

// Wrap everything in a React component to leverage the state management of this component
class PreviewComponent extends Component {
    static propTypes = {
        component: Type.func.isRequired
    };

    constructor() {
        super();
        this.state = {};
        this.setState = this.setState.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
    }

    render() {
        return this.props.component(this.state, this.setState, this.setInitialState);
    }

    // Synchronously set initial state, so it will be ready before first render
    // Ignore all consequent calls
    setInitialState(initialState) {
        Object.assign(this.state, initialState);
        this.setInitialState = noop;
    }
}

@cn('preview')
export default class Preview extends Component {
    static propTypes = {
        code: Type.string.isRequired,
        evalInContext: Type.func.isRequired
    };

    static contextTypes = {
        config: Type.object.isRequired,
        codeRevision: Type.number.isRequired
    };

    constructor() {
        super();

        this.state = {
            error: null
        };

        this.handleError = this.handleError.bind(this);
    }

    componentDidMount() {
        // Clear console after hot reload, do not clear on the first load to keep any warnings
        if (this.context.codeRevision > 0) {
            // eslint-disable-next-line no-console
            console.clear();
        }

        this.executeCode();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.error !== nextState.error || this.props.code !== nextProps.code;
    }

    componentDidUpdate(prevProps) {
        if (this.props.code !== prevProps.code) {
            this.executeCode();
        }
    }

    componentWillUnmount() {
        this.unmountPreview();
    }

    render(cn) {
        const { error } = this.state;
        return (
            <div className={ cn() }>
                <div ref={ (ref) => { this.mountNode = ref; } } />
                { error && <PlaygroundError message={ error } /> }
            </div>
        );
    }

    handleError(err) {
        this.unmountPreview();

        this.setState({
            error: err.toString()
        });

        console.error(err); // eslint-disable-line no-console
    }


    unmountPreview() {
        if (this.mountNode) {
            ReactDOM.unmountComponentAtNode(this.mountNode);
        }
    }

    executeCode() {
        this.setState({
            error: null
        });

        const { code } = this.props;
        if (!code) {
            return;
        }

        const compiledCode = this.compileCode(code);
        if (!compiledCode) {
            return;
        }

        const exampleComponent = this.evalInContext(compiledCode);
        const wrappedComponent = (
            <PreviewWithThemeSwitcher onError={ this.handleError }>
                <PreviewComponent component={ exampleComponent } />
            </PreviewWithThemeSwitcher>
        );

        window.requestAnimationFrame(() => {
            this.unmountPreview();
            try {
                ReactDOM.render(wrappedComponent, this.mountNode);
            } catch (err) {
                this.handleError(err);
            }
        });
    }

    compileCode(code) {
        try {
            return compileCode(code, this.context.config.compilerConfig);
        } catch (err) {
            this.handleError(err);
        }
        return false;
    }

    evalInContext(compiledCode) {
        // 1. Use setter/with to call our callback function when user write `initialState = {...}`
        // 2. Wrap code in JSON.stringify/eval to catch the component and return it
        const exampleComponentCode = `
        var stateWrapper = {
            set initialState(value) {
                __setInitialState(value)
            },
        }
        with (stateWrapper) {
            return eval(${JSON.stringify(compiledCode)})
        }
        `;

        return this.props.evalInContext(exampleComponentCode);
    }
}
