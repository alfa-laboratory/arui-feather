/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Button from '../button/button';
import Link from '../link/link';
import Popup, { PopupProps } from '../popup/popup';

import { POPUP_MAIN_OFFSET } from '../vars';

export type DropdownProps = {

    /**
     * Тип компонента
     */
    switcherType?: 'link' | 'button';

    /**
     * Текст кнопки компонента
     */
    switcherText?: React.ReactNode;

    /**
     * Компонент [Popup](#!/Popup)
     */
    popupContent?: React.ReactNode;

    /**
     * Свойства для компонента [Popup](#!/Popup)
     */
    popupProps?: PopupProps;

    /**
     * Управление возможностью отображать попап при наведении курсора
     */
    mode?: 'hover' | 'normal';

    /**
     * Управление возможностью открытия попапа
     */
    disabled?: boolean;

    /**
     * Управление состоянием открыт/закрыт попапа
     */
    opened?: boolean;

    /**
     * Только для switcherType='button'. Тип переключателя для кнопки, 'check'
     */
    togglable?: 'button' | 'check';

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Дочерние элементы `Dropdown`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

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
     * Обработчик клика по кнопке компонента
     */
    onSwitcherClick?: (isOpened?: boolean) => void;

    /**
     * Обработчик события наведения курсора на кнопку компонента
     */
    onSwitcherMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с кнопки компонента
     */
    onSwitcherMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на попап
     */
    onPopupMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с попапа
     */
    onPopupMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события клика попапа за пределами попапа
     */
    onPopupClickOutside?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент «выпадашка»: ссылка или кнопка. По клику показывается Popup.
 */
export class Dropdown extends React.PureComponent<DropdownProps> {
    cn = createCn('dropdown');

    static defaultProps: Partial<DropdownProps> = {
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

    render() {
        return (
            <div
                className={ this.cn() }
                id={ this.props.id }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.renderSwitcher() }
                { this.renderPopup() }
            </div>
        );
    }

    renderSwitcher() {
        const content = this.props.children || this.props.switcherText;
        const opened = this.props.opened === undefined ? this.state.opened : this.props.opened;

        return this.props.switcherType === 'button'
            ? this.renderSwitcherButton(content, opened)
            : this.renderSwitcherLink(content);
    }

    renderSwitcherButton(content, opened) {
        return (
            <Button
                className={ this.cn('switcher') }
                size={ this.props.size }
                ref={ (switcher) => {
                    this.switcher = switcher;
                } }
                disabled={ this.props.disabled }
                togglable={ this.props.togglable as any /** TODO: разобраться детально */ }
                checked={ this.props.togglable === 'check' && opened }
                onClick={ this.props.disabled ? undefined : this.handleSwitcherClick }
                onMouseEnter={ this.handleSwitcherMouseEnter }
                onMouseLeave={ this.handleSwitcherMouseLeave }
            >
                { content }
            </Button>
        );
    }

    renderSwitcherLink(content) {
        return (
            <Link
                className={ this.cn('switcher') }
                size={ this.props.size }
                ref={ (switcher) => {
                    this.switcher = switcher;
                } }
                disabled={ this.props.disabled }
                pseudo={ true }
                text={ content }
                onClick={ this.props.disabled ? undefined : this.handleSwitcherClick }
                onMouseEnter={ this.handleSwitcherMouseEnter }
                onMouseLeave={ this.handleSwitcherMouseLeave }
            />
        );
    }

    renderPopup() {
        let mainOffset;
        const opened = this.props.opened === undefined ? this.state.opened : this.props.opened;

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
            className: this.cn('popup'),
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

    private handleSwitcherClick = () => {
        const newOpenedStatusValue = this.props.opened === undefined ? !this.state.opened : !this.props.opened;

        this.setState({
            opened: newOpenedStatusValue
        });

        if (this.props.onSwitcherClick) {
            this.props.onSwitcherClick(newOpenedStatusValue);
        }
    };

    private handleSwitcherMouseEnter = (event) => {
        this.setState({ switcherHovered: true });

        if (this.props.onSwitcherMouseEnter) {
            this.props.onSwitcherMouseEnter(event);
        }
    };

    private handleSwitcherMouseLeave = (event) => {
        this.setState({ switcherHovered: false });

        if (this.props.onSwitcherMouseLeave) {
            this.props.onSwitcherMouseLeave(event);
        }
    };

    private handlePopupMouseEnter = (event) => {
        this.setState({ popupHovered: true });

        if (this.props.onPopupMouseEnter) {
            this.props.onPopupMouseEnter(event);
        }
    };

    private handlePopupMouseLeave = (event) => {
        this.setState({ popupHovered: false });

        if (this.props.onPopupMouseLeave) {
            this.props.onPopupMouseLeave(event);
        }
    };

    private handlePopupClickOutside = (event) => {
        this.setState({ opened: false });

        if (this.props.onPopupClickOutside) {
            this.props.onPopupClickOutside(event);
        }
    }
}

export default withTheme(Dropdown);
