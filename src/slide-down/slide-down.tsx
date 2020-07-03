/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { createRef } from 'react';
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
    onAnimationStart?: () => void;

    /**
     * Обработчик события окончания анимации
     */
    onAnimationEnd?: () => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

type SlideDownState = {
    height: number | string;
    isHeightAuto: boolean;
};

/**
 * Компонент "расхлопа".
 * Позволяет скрывать и отображать контент.
 */
export class SlideDown extends React.PureComponent<SlideDownProps, SlideDownState> {
    protected cn = createCn('slide-down');

    state = {
        height: this.props.isExpanded ? 'auto' : 0,
        isHeightAuto: this.props.isExpanded,
    };

    private slideDown = createRef<HTMLDivElement>();

    private slideDownContent = createRef<HTMLDivElement>()

    componentDidUpdate(prevProps: SlideDownProps) {
        const { isExpanded, onAnimationStart } = this.props;

        if (prevProps.isExpanded !== isExpanded) {
            if (isExpanded) {
                this.setHeightToContentHeight();
            } else {
                this.setHeightToNull();
            }

            if (onAnimationStart) {
                onAnimationStart();
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
                ref={ this.slideDown }
                data-test-id={ this.props['data-test-id'] }
            >
                <div
                    className={ this.cn('content', { expanded: this.state.isHeightAuto }) }
                    ref={ this.slideDownContent }
                >
                    { this.props.children }
                </div>
            </div>
        );
    }

    private handleTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
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
        if (this.slideDownContent.current) {
            this.setState({
                isHeightAuto: false,
                height: this.slideDownContent.current.offsetHeight,
            });
        }
    }

    private setHeightToNull() {
        this.setHeightToContentHeight();

        // Заставляем React перерисовать элемент
        this.forceUpdate(() => {
            // Заставляем браузер сделать reflow
            if (this.slideDown.current) {
                this.slideDown.current.getBoundingClientRect();
            }

            this.setState({ height: 0 });
        });
    }

    private setAutoHeight() {
        this.setState({
            isHeightAuto: true,
        });
    }
}

export default withTheme<SlideDownProps, SlideDown>(SlideDown);
