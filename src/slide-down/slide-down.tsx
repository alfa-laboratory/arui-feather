/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

export type SlideDownProps = {

    /**
     * Управление состоянием expand/collapse компонента
     */
    isExpanded?: boolean;

    /**
     * Контент компонента
     */
    children?: React.ReactNode;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Обработчик события начала анимации
     */
    onAnimationStart?: Function;

    /**
     * Обработчик события окончания анимации
     */
    onAnimationEnd?: Function;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};
/**
 * Компонент "расхлопа".
 * Позволяет скрывать и отображать контент.
 */
export class SlideDown extends React.PureComponent<SlideDownProps> {
    cn = createCn('slide-down');

    state = {
        height: this.props.isExpanded ? 'auto' : 0,
        isHeightAuto: this.props.isExpanded
    };

    slideDown;
    slideDownContent;

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.isExpanded !== nextProps.isExpanded) {
            if (nextProps.isExpanded) {
                this.setHeightToContentHeight();
            } else {
                this.setHeightToNull();
            }
            if (this.props.onAnimationStart) {
                this.props.onAnimationStart();
            }
        }
    }

    render() {
        return (
            <div
                className={ this.cn() }
                id={ this.props.id }
                style={
                    { height: this.getHeight() }
                }
                onTransitionEnd={ this.handleTransitionEnd }
                ref={ (slideDown) => {
                    this.slideDown = slideDown;
                } }
                data-test-id={ this.props['data-test-id'] }
            >
                <div
                    className={ this.cn('content', { expanded: this.state.isHeightAuto }) }
                    ref={ (slideDownContent) => {
                        this.slideDownContent = slideDownContent;
                    } }
                >
                    { this.props.children }
                </div>
            </div>
        );
    }

    private handleTransitionEnd = (event) => {
        if (event.propertyName === 'height' && this.props.isExpanded) {
            this.setAutoHeight();
        }
        if (this.props.onAnimationEnd) {
            this.props.onAnimationEnd();
        }
    };

    private getHeight() {
        return this.state.isHeightAuto
            ? 'auto'
            : this.state.height;
    }

    private setHeightToContentHeight() {
        this.setState({
            isHeightAuto: false,
            height: this.slideDownContent.offsetHeight
        });
    }

    private setHeightToNull() {
        this.setHeightToContentHeight();

        // Заставляем React перерисовать элемент
        this.forceUpdate(() => {
            // Заставляем браузер сделать reflow
            this.slideDown.getBoundingClientRect();
            this.setState({
                height: 0
            });
        });
    }

    private setAutoHeight() {
        this.setState({
            isHeightAuto: true
        });
    }
}

export default withTheme(SlideDown);
