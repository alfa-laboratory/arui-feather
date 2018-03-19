import { Component } from 'react';
import Type from 'prop-types';

import PreviewWithThemeSwitcher from '../preview-with-theme-switcher';

export default class Wrapper extends Component {
    static propTypes = {
        children: Type.node.isRequired,
        onError: Type.func.isRequired
    };

    componentDidCatch(error) {
        this.props.onError(error);
    }

    render() {
        return (
            <PreviewWithThemeSwitcher>
                { this.props.children }
            </PreviewWithThemeSwitcher>
        );
    }
}
