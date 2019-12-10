/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import autobind from 'core-decorators/lib/autobind';
import React from 'react';
import Type from 'prop-types';

import Button from '../button/button';
import Link from '../link/link';
import Popup from '../popup/popup';

import cn from '../cn';
import performance from '../performance';
import { POPUP_MAIN_OFFSET } from '../vars';

/**
 * Компонент «выпадашка»: ссылка или кнопка. По клику показывается Popup.
 */
@cn('dropdown')
@performance()
class Dropdown extends React.Component {
    static propTypes = {
        /** Тип компонента */
        switcherType: Type.oneOf(['link', 'button']),
        /** Текст кнопки компонента */
        switcherText: Type.node,
        /** Компонент [Popup](#!/Popup) */
        popupContent: Type.node,
        /** Свойства для компонента [Popup](#!/Popup) */
        popupProps: Type.shape({
            className: Type.string,
            type: Type.oneOf(['default', 'tooltip']),
            height: Type.oneOf(['default', 'available', 'adaptive']),
            directions: Type.arrayOf(Type.oneOf([
                'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top',
                'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'
            ])),
            target: Type.oneOf(['anchor', 'position', 'screen']),
            mainOffset: Type.number,
            secondaryOffset: Type.number,
            fitContaiterOffset: Type.number,
            invalid: Type.bool,
            visible: Type.bool,
            padded: Type.bool,
            size: Type.oneOf(['s', 'm', 'l', 'xl']),
            theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
            onMouseEnter: Type.func,
            onMouseLeave: Type.func,
            onClickOutside: Type.func,
            minWidth: Type.number,
            maxWidth: Type.number
        }),
        /** Управление возможностью отображать попап при наведении курсора */
        mode: Type.oneOf(['hover', 'normal']),
        /** Управление возможностью открытия попапа */
        disabled: Type.bool,
        /** Управление состоянием открыт/закрыт попапа */
        opened: Type.bool,
        /** Только для switcherType='button'. Тип переключателя для кнопки, 'check' */
        togglable: Type.oneOf(['button', 'check']),
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Дочерние элементы `Dropdown` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /**
         * Обработчик клика по кнопке компонента
         * @param {boolean} isOpened
         */
        onSwitcherClick: Type.func,
        /**
         * Обработчик события наведения курсора на кнопку компонента
         * @param {React.MouseEvent} event
         */
        onSwitcherMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с кнопки компонента
         * @param {React.MouseEvent} event
         */
        onSwitcherMouseLeave: Type.func,
        /**
         * Обработчик события наведения курсора на попап
         * @param {React.MouseEvent} event
         */
        onPopupMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с попапа
         * @param {React.MouseEvent} event
         */
        onPopupMouseLeave: Type.func,
        /**
         * Обработчик события клика попапа за пределами попапа
         * @param {React.MouseEvent} event
         */
        onPopupClickOutside: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        switcherType: 'link',
        switcherText: 'Switcher',
        disabled: false,
        popupProps: {
            target: 'anchor'
        },
        size: 'm'
    };

    state = {
        opened: false,
        switcherHovered: false,
        popupHovered: false
    };

    popup;
    switcher;

    componentDidMount() {
        this.popup.setTarget(this.switcher.getNode());
    }

    render(cn) {
        return (
            <div
                className={ cn() }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.renderSwitcher(cn) }
                { this.renderPopup(cn) }
            </div>
        );
    }

    renderSwitcher(cn) {
        const content = this.props.children || this.props.switcherText;
        const opened = this.props.opened !== undefined
            ? this.props.opened
            : this.state.opened;

        return this.props.switcherType === 'button'
            ? this.renderSwitcherButton(cn, content, opened)
            : this.renderSwitcherLink(cn, content);
    }

    renderSwitcherButton(cn, content, opened) {
        return (
            <Button
                className={ cn('switcher') }
                size={ this.props.size }
                ref={ (switcher) => {
                    this.switcher = switcher;
                } }
                disabled={ this.props.disabled }
                togglable={ this.props.togglable }
                checked={ this.props.togglable === 'check' && opened }
                onClick={ !this.props.disabled ? this.handleSwitcherClick : undefined }
                onMouseEnter={ this.handleSwitcherMouseEnter }
                onMouseLeave={ this.handleSwitcherMouseLeave }
            >
                { content }
            </Button>
        );
    }

    renderSwitcherLink(cn, content) {
        return (
            <Link
                className={ cn('switcher') }
                size={ this.props.size }
                ref={ (switcher) => {
                    this.switcher = switcher;
                } }
                disabled={ this.props.disabled }
                pseudo={ true }
                text={ content }
                onClick={ !this.props.disabled ? this.handleSwitcherClick : undefined }
                onMouseEnter={ this.handleSwitcherMouseEnter }
                onMouseLeave={ this.handleSwitcherMouseLeave }
            />
        );
    }

    renderPopup(cn) {
        let mainOffset;
        const opened = this.props.opened !== undefined
            ? this.props.opened
            : this.state.opened;

        if (this.props.popupProps === undefined || (
            this.props.popupProps && this.props.popupProps.type !== 'tooltip')) {
            switch (this.props.size) {
                case 's':
                case 'm': mainOffset = POPUP_MAIN_OFFSET / 2; break;
                case 'l':
                case 'xl': mainOffset = POPUP_MAIN_OFFSET; break;
            }
        }

        const popupProps = {
            className: cn('popup'),
            size: this.props.size,
            mainOffset,
            ...this.props.popupProps
        };

        return (
            <Popup
                { ...popupProps }
                ref={ (popup) => {
                    this.popup = popup;
                } }
                visible={
                    (!this.props.disabled && opened) ||
                    (this.props.mode === 'hover' && (this.state.switcherHovered || this.state.popupHovered))
                }
                onMouseEnter={ this.handlePopupMouseEnter }
                onMouseLeave={ this.handlePopupMouseLeave }
                onClickOutside={ this.handlePopupClickOutside }
            >
                { this.props.popupContent }
            </Popup>
        );
    }

    @autobind
    handleSwitcherClick() {
        const newOpenedStatusValue = this.props.opened !== undefined
            ? !this.props.opened
            : !this.state.opened;

        this.setState({
            opened: newOpenedStatusValue
        });

        if (this.props.onSwitcherClick) {
            this.props.onSwitcherClick(newOpenedStatusValue);
        }
    }

    @autobind
    handleSwitcherMouseEnter(event) {
        this.setState({ switcherHovered: true });

        if (this.props.onSwitcherMouseEnter) {
            this.props.onSwitcherMouseEnter(event);
        }
    }

    @autobind
    handleSwitcherMouseLeave(event) {
        this.setState({ switcherHovered: false });

        if (this.props.onSwitcherMouseLeave) {
            this.props.onSwitcherMouseLeave(event);
        }
    }

    @autobind
    handlePopupMouseEnter(event) {
        this.setState({ popupHovered: true });

        if (this.props.onPopupMouseEnter) {
            this.props.onPopupMouseEnter(event);
        }
    }

    @autobind
    handlePopupMouseLeave(event) {
        this.setState({ popupHovered: false });

        if (this.props.onPopupMouseLeave) {
            this.props.onPopupMouseLeave(event);
        }
    }

    @autobind
    handlePopupClickOutside(event) {
        this.setState({ opened: false });

        if (this.props.onPopupClickOutside) {
            this.props.onPopupClickOutside(event);
        }
    }
}

export default Dropdown;
