/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Link from '../link/link';
import ResizeSensor from '../resize-sensor/resize-sensor';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент "подката": позволяет спрятать кусок текста за ссылку "Еще...".
 */
@cn('collapse')
@performance()
class Collapse extends React.Component {
    static propTypes = {
        /** Управление состоянием `expand`/`collapse` компонента */
        isExpanded: Type.bool,
        /** Текст ссылки в `expand` состоянии */
        collapsedLabel: Type.string,
        /** Текст ссылки в `collapse` состоянии */
        expandedLabel: Type.string,
        /** Дочерние элементы `Collapse` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик смены состояния `expand`/`collapse` */
        onExpandedChange: Type.func
    };

    static defaultProps = {
        expandedLabel: 'Collapse',
        collapsedLabel: 'Expand'
    };

    state = {
        isExpanded: false
    };

    content;
    contentCase;

    componentDidMount() {
        this.updateContentHeight();
    }

    componentDidUpdate() {
        this.updateContentHeight();
    }

    render(cn) {
        let expanded = this.props.isExpanded !== undefined
            ? this.props.isExpanded
            : this.state.isExpanded;

        return (
            <div
                className={ cn({
                    expanded
                }) }
            >
                <div
                    ref={ (content) => { this.content = content; } }
                    className={ cn('content') }
                >
                    <div ref={ (contentCase) => { this.contentCase = contentCase; } }>
                        { this.props.children }
                    </div>
                    <ResizeSensor onResize={ this.updateContentHeight } />
                </div>
                <Link
                    className={ cn('link') }
                    pseudo={ true }
                    onClick={ this.handleExpandedChange }
                    text={
                        expanded
                        ? this.props.expandedLabel
                        : this.props.collapsedLabel
                    }
                />
            </div>
        );
    }

    @autobind
    handleExpandedChange() {
        let newExpandedValue = this.props.isExpanded !== undefined
            ? !this.props.isExpanded
            : !this.state.isExpanded;

        this.setState({
            isExpanded: newExpandedValue
        });

        if (this.props.onExpandedChange) {
            this.props.onExpandedChange(newExpandedValue);
        }
    }

    @autobind
    updateContentHeight() {
        let expanded = this.props.isExpanded !== undefined
            ? this.props.isExpanded
            : this.state.isExpanded;

        let contentHeight;

        if (expanded) {
            contentHeight = this.contentCase.offsetHeight;
        } else {
            contentHeight = 0;
        }

        if (this.content) {
            this.content.style.height = `${contentHeight}px`;
        }
    }
}

export default Collapse;
