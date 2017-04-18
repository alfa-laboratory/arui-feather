import React, { Component, PropTypes as Type } from 'react';
import ReactDOM from 'react-dom';
import { transform } from 'buble';
import Wrapper from 'react-styleguidist/lib/rsg-components/Wrapper';
import PlaygroundError from 'react-styleguidist/lib/rsg-components/PlaygroundError';
import PreviewComponent from './preview-component';
import PreviewWithThemeSwitcher from './preview-with-theme-switcher';

/* eslint-disable react/no-multi-comp */
const compileCode = code => transform(code, { objectAssign: 'Object.assign' }).code;

export default class Preview extends Component {
    static propTypes = {
        code: Type.string.isRequired,
        evalInContext: Type.func.isRequired
    };
    state = {
        error: null
    };

    componentDidMount() {
        this.executeCode();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.error !== nextState.error || nextState.theme !== this.state.theme ||
         this.props.code !== nextProps.code;
    }

    componentDidUpdate(prevProps) {
        if (this.props.code !== prevProps.code) {
            this.executeCode();
        }
    }

    executeCode() {
        this.setState({ error: null });

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
            <Wrapper>
                <PreviewWithThemeSwitcher>
                    <PreviewComponent component={ exampleComponent } />
                </PreviewWithThemeSwitcher>
            </Wrapper>
        );

        window.requestAnimationFrame(() => {
            try {
                ReactDOM.render(wrappedComponent, this.mountNode);
            } catch (err) {
                this.handleError(err);
            }
        });
    }

    compileCode(code) {
        try {
            return compileCode(code);
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

    handleError(err) {
        if (this.mountNode) {
            ReactDOM.unmountComponentAtNode(this.mountNode);
        }

        this.setState({ error: err.toString() });
    }

    changeTheme(theme) {
        this.setState({ theme });
    }

    render() {
        const { error } = this.state;
        return (
            <div>
                <div ref={ ref => (this.mountNode = ref) } /> {error && <PlaygroundError message={ error } />}
            </div>
        );
    }
}
