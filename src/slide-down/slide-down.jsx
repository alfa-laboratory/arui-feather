/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';

import { autobind } from 'core-decorators';

import cn from '../cn';
import performance from '../performance';

import './slide-down.css';

/**
 * Компонент "расхлопа".
 * Позволяет скрывать и отображать контент.
 */
@cn('slide-down')
@performance()
class SlideDown extends React.Component {
    static propTypes = {
        /** Управление состоянием expand/collapse компонента */
        isExpanded: Type.bool,
        /** Контент компонента */
        children: Type.node,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.string, Type.func])
    };

    state = {
        height: 0,
        isHeightAuto: false
    };

    slideDown;
    slideDownContent;

    componentDidMount() {
        if (this.props.isExpanded) {
            this.setAutoHeight();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isExpanded !== nextProps.isExpanded) {
            if (nextProps.isExpanded) {
                this.setHeightToContentHeight();
            } else {
                this.setHeightToNull();
            }
        }
    }

    render(cn) {
        return (
            <div
                className={ cn }
                style={
                    { height: this.getHeight() }
                }
                onTransitionEnd={ this.handleTransitionEnd }
                ref={ slideDown => (this.slideDown = slideDown) }
            >
                <div
                    className={ cn('content', { expanded: this.state.isHeightAuto }) }
                    ref={ slideDownContent => (this.slideDownContent = slideDownContent) }
                >
                    { this.props.children }
                </div>
            </div>
        );
    }

    @autobind
    handleTransitionEnd(event) {
        if (
            event.propertyName === 'height'
            && this.props.isExpanded
        ) {
            this.setAutoHeight();
        }
    }

    getHeight() {
        if (this.state.isHeightAuto) {
            return 'auto';
        }

        return this.state.height;
    }

    calculateHeight() {
        return this.slideDownContent.offsetHeight;
    }

    setHeightToContentHeight() {
        this.setState({
            isHeightAuto: false,
            height: this.calculateHeight()
        });
    }

    setHeightToNull() {
        this.setHeightToContentHeight();

        setTimeout(() => {
            this.setState({
                height: 0
            });
        }, 20);
    }

    setAutoHeight() {
        this.setState({
            isHeightAuto: true
        });
    }
}

export default SlideDown;
