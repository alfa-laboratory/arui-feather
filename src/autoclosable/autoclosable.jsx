/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import { Component } from 'react';
import Type from 'prop-types';

import keyboardCode from '../lib/keyboard-code';
import { isNodeOutsideElement } from '../lib/window';
import performance from '../performance';

/**
 * Компонент автозакрытия дочернего элемента.
 */
@performance()
class Autoclosable extends Component {
    static propTypes = {
        /** Управление активностью компонента */
        active: Type.bool,
        /** Дочерние элементы `Autoclosable` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Обработчик клика вне компонента */
        onClickOutside: Type.func,
        /** Обработчик нажатия на клавишу Esc */
        onEscapeKeyDown: Type.func
    }

    static defaultProps = {
        active: true
    }

    root;

    componentDidMount() {
        this.ensureClickEvent();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.onClickOutside !== this.props.onClickOutside) {
            this.ensureClickEvent();
        } else if (prevProps.active !== this.props.active) {
            this.ensureClickEvent(!this.props.active);
        }
    }

    componentWillUnmount() {
        this.ensureClickEvent(true);
    }

    render() {
        return (
            <div
                ref={ (root) => { this.root = root; } }
                role='presentation'
                tabIndex='-1'
                onKeyDown={ this.handleKeyDown }
            >
                { this.props.children }
            </div>
        );
    }

    @autobind
    handleKeyDown(event) {
        if (event.which === keyboardCode.ESCAPE) {
            if (document.activeElement) {
                document.activeElement.blur();
            }

            if (this.props.onEscapeKeyDown) {
                this.props.onEscapeKeyDown(event);
            }
        }
    }

    @autobind
    handleWindowClick(event) {
        if (!!this.root && isNodeOutsideElement(event.target, this.root)) {
            if (this.props.onClickOutside) {
                this.props.onClickOutside(event);
            }
        }
    }

    ensureClickEvent(isDestroy) {
        let isNeedBindEvent = isDestroy !== undefined ? !isDestroy : this.props.active;

        // We need timeouts to not to catch the event that causes
        // popup opening (because it propagates to the `window`).
        if (this.clickEventBindTimeout) {
            clearTimeout(this.clickEventBindTimeout);
            this.clickEventBindTimeout = null;
        }

        this.clickEventBindTimeout = setTimeout(() => {
            if (!this.isWindowClickBinded && isNeedBindEvent) {
                window.addEventListener('click', this.handleWindowClick);
                window.addEventListener('touchend', this.handleWindowClick);
                this.isWindowClickBinded = true;
            } else if (this.isWindowClickBinded && !isNeedBindEvent) {
                window.removeEventListener('click', this.handleWindowClick);
                window.removeEventListener('touchend', this.handleWindowClick);
                this.isWindowClickBinded = false;
            }
        }, 0);
    }
}

export default Autoclosable;
