/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';

/**
 * Компонент ссылки.
 */
@cn('link')
@performance()
class Link extends React.Component {
    static propTypes = {
        /** Иконка ссылки */
        icon: Type.node,
        /** Позиционирование иконки в ссылке */
        iconPosition: Type.oneOf(['left', 'right']),
        /** Текст ссылки */
        text: Type.node,
        /** href ссылки */
        url: Type.string,
        /** Указание на загрузку, вместо открытия и указание имени файла  */
        download: Type.oneOfType([Type.string, Type.bool]),
        /** target ссылки */
        target: Type.oneOf(['_self', '_blank', '_parent', '_top']),
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Управление возможностью клика по ссылке */
        disabled: Type.bool,
        /** Управление состоянием ссылки выбран/не выбран */
        checked: Type.bool,
        /** Псевдо-ссылка (border-bottom: dashed) */
        pseudo: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['xs', 's', 'm', 'l', 'xl']),
        /** Дочерние элементы `Link` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /**
         * Обработчик клика но ссылке
         * @param {React.MouseEvent} event
         */
        onClick: Type.func,
        /**
         * Обработчик фокуса компонента
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса компонента
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик события наведения курсора на ссылку
         * @param {React.MouseEvent} event
         */
        onMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с ссылки
         * @param {React.MouseEvent} event
         */
        onMouseLeave: Type.func
    };

    static defaultProps = {
        iconPosition: 'left',
        size: 'm',
        url: '#',
        tabIndex: 0,
        disabled: false,
        checked: false,
        pseudo: false
    };

    state = {
        hovered: false,
        focused: false
    };

    root;

    render(cn) {
        let linkElement = this.props.checked || this.props.disabled ? 'span' : 'a';
        const { iconPosition } = this.props;

        let linkProps = {
            ref: (root) => {
                this.root = root;
            },
            download: this.props.download,
            className: cn({
                disabled: this.props.disabled,
                checked: this.props.checked,
                pseudo: this.props.pseudo,
                size: this.props.size,
                focused: this.state.focused,
                hovered: this.state.hovered,
                flex: this.props.icon && iconPosition === 'left'
            }),
            id: this.props.id,
            tabIndex: this.props.tabIndex,
            onClick: this.handleClick,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave
        };

        if (this.props.target === '_blank') {
            linkProps.rel = 'noreferrer noopener';
        }

        if (!this.props.checked && !this.props.disabled) {
            linkProps.href = this.props.url;
            linkProps.target = this.props.target;
        }

        let linkContent = [this.props.children];
        let iconTemplate = this.props.icon && (
            <span key='icon' className={ cn('icon', { left: iconPosition === 'left' }) }>
                { this.props.icon }
            </span>
        );

        let textTemplate = this.props.text && (
            <span key='text' className={ cn('text-container') }>
                <span className={ cn('text') }>{ this.props.text }</span>
            </span>
        );

        if (iconPosition === 'left') {
            linkContent.push(iconTemplate, textTemplate);
        }
        if (iconPosition === 'right') {
            linkContent.push(textTemplate, iconTemplate);
        }

        return React.createElement(linkElement, linkProps, linkContent);
    }

    @autobind
    handleClick(event) {
        if (this.props.pseudo) {
            event.preventDefault();
        }
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    }

    @autobind
    handleFocus(event) {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    @autobind
    handleBlur(event) {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    }

    @autobind
    handleMouseEnter(event) {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    }

    @autobind
    handleMouseLeave(event) {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     *
     * @public
     * @returns {HTMLElement}
     */
    getNode() {
        return this.root;
    }

    /**
     * Ставит фокус на ссылку.
     *
     * @public
     */
    focus() {
        this.root.focus();
    }

    /**
     * Убирает фокус с ссылки.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }
}

export default Link;
