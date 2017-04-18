import { Component, PropTypes as Type } from 'react';
import noop from 'lodash/noop';
/*
* Wrap everything in a React component to leverage the state management of this component
*/
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

    // Synchronously set initial state, so it will be ready before first render
    // Ignore all consequent calls
    setInitialState(initialState) {
        Object.assign(this.state, initialState);
        this.setInitialState = noop;
    }

    render() {
        return this.props.component(this.state, this.setState, this.setInitialState);
    }
}
export default PreviewComponent;
