/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import ResizeSensor from '../resize-sensor/resize-sensor';

import cn from '../cn';
import performance from '../performance';

import './collapsible.css';

/**
 * Компонент, способный находиться в свёрнутом и развёрнутом состоянии
 */
@cn('collapsible')
@performance()
class Collapsible extends React.Component {
    static propTypes = {
        /** Управление состоянием `expand`/`collapse` компонента */
        isExpanded: Type.bool,
        /** Дочерние элементы `Collapse` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string])
    };

    static defaultProps = {
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
        const expanded = this.props.isExpanded;

        return (
            <div
                ref={ (content) => { this.content = content; } }
                className={ cn({
                    expanded
                }) }
            >
                <div ref={ (contentCase) => { this.contentCase = contentCase; } }>
                    { this.props.children }
                </div>
                <ResizeSensor onResize={ this.updateContentHeight } />
            </div>
        );
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

export default Collapsible;
