/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import React, { Component } from 'react';
import Type from 'prop-types';
import TableOfContents from 'react-styleguidist/lib/rsg-components/TableOfContents';
import Welcome from 'react-styleguidist/lib/rsg-components/Welcome';
import Error from 'react-styleguidist/lib/rsg-components/Error';
import { HOMEPAGE } from 'react-styleguidist/scripts/consts';
import { DisplayModes } from 'react-styleguidist/lib/consts';

import StyleGuideRenderer from './styleguide-renderer';
import Sections from '../sections';

export default class StyleGuide extends Component {
    static propTypes = {
        codeRevision: Type.number.isRequired,
        config: Type.object.isRequired,
        slots: Type.object.isRequired,
        sections: Type.array.isRequired,
        welcomeScreen: Type.bool,
        patterns: Type.array,
        displayMode: Type.string
    };

    static defaultProps = {
        displayMode: DisplayModes.all
    };

    static childContextTypes = {
        codeRevision: Type.number.isRequired,
        config: Type.object.isRequired,
        slots: Type.object.isRequired,
        displayMode: Type.string
    };

    state = {
        error: false,
        info: null
    };

    getChildContext() {
        return {
            codeRevision: this.props.codeRevision,
            config: this.props.config,
            slots: this.props.slots,
            displayMode: this.props.displayMode
        };
    }

    render() {
        const {
            config, sections, welcomeScreen, patterns, displayMode
        } = this.props;

        if (this.state.error) {
            return <Error error={ this.state.error } info={ this.state.info } />;
        }

        if (welcomeScreen) {
            return <Welcome patterns={ patterns } />;
        }

        return (
            <StyleGuideRenderer
                title={ config.title }
                homepageUrl={ HOMEPAGE }
                toc={ <TableOfContents sections={ sections } /> }
                hasSidebar={ config.showSidebar && displayMode === DisplayModes.all }
            >
                <Sections sections={ sections } depth={ 1 } />
            </StyleGuideRenderer>
        );
    }

    componentDidCatch(error, info) {
        this.setState({
            error,
            info
        });
    }
}
