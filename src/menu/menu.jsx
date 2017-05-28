/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import { autobind } from 'core-decorators';
import React from 'react';
import styleType from 'react-style-proptype';
import Type from 'prop-types';

import MenuItem from '../menu-item/menu-item';

import cn from '../cn';
import { isNodeOutsideElement } from '../lib/window';
import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';

import './menu.css';
import './menu_theme_alfa-on-white.css';
import './menu_theme_alfa-on-color.css';

/**
 * Компонент меню.
 */
@cn('menu')
@performance(true)
class Menu extends React.Component {
    static propTypes = {
        /** Тип расположения меню: 'horizontal' */
        view: Type.string,
        /** Тип списка вариантов меню */
        mode: Type.oneOf(['basic', 'check', 'radio', 'radio-check']),
        /** Управление возможностью изменения значения */
        disabled: Type.bool,
        /** Управление состоянием фокуса элемента */
        focused: Type.bool,
        /** Управление автоматическим фокусом на первом элементе при вызове публичного метода focus */
        autoFocusFirstItem: Type.bool,
        /** Элемент меню, на котором стоит выделение */
        highlightedItem: Type.shape({
            /** Уникальный идентификатор */
            ref: Type.oneOfType([Type.number, Type.string]),
            /** Элемент списка типа ContentItem */
            item: Type.any
        }),
        /** Список объектов ContentItem */
        content: Type.arrayOf(Type.shape({
            /** Тип элемента */
            type: Type.oneOf(['item', 'group']),
            /** Только для type='item', свойство для компонента [MenuItem](../menu-item/) */
            value: Type.oneOfType([Type.string, Type.number]),
            /** Содержание элемента */
            content: Type.oneOfType([Type.node, Type.array]),
            /** Только для type='item': свойства для компонента [MenuItem](../menu-item/) */
            props: Type.object
        })),
        /** Список значений выбранных элементов */
        checkedItems: Type.arrayOf(Type.oneOfType([
            Type.string,
            Type.number
        ])),
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Объект со стилями */
        style: styleType,
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик клика по варианту меню */
        onItemClick: Type.func,
        /** Обработчик выбора варианта меню */
        onItemCheck: Type.func,
        /** Обработчик события наведения курсора на меню */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с меню */
        onMouseLeave: Type.func,
        /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyDown: Type.func,
        /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyUp: Type.func,
        /** Обработчик фокуса */
        onFocus: Type.func,
        /** Обработчик снятия фокуса */
        onBlur: Type.func,
        /** Обработчик события выделения элемента меню, принимает на вход переменную типа HighlightedItem */
        onHighlightItem: Type.func
    };

    static defaultProps = {
        size: 'm',
        mode: 'basic',
        autoFocusFirstItem: false
    };

    state = {
        highlightedItem: null,
        checkedItems: [],
        hovered: false
    };

    root;
    menuItemList = [];
    blurTimeoutId = null;

    componentDidMount() {
        if (!!this.props.content && this.props.content.length > 0
            && (!this.props.checkedItems || this.props.checkedItems.length === 0)
            && this.props.mode === 'radio') {
            let firstItem = this.getFirstItem(this.props.content);

            this.changeCheckedItems([firstItem.value]);
        }
    }

    componentWillUpdate() {
        this.menuItemList = [];
    }

    componentWillUnmount() {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }
    }

    render(cn) {
        return (
            <div
                ref={ (root) => { this.root = root; } }
                style={ this.props.style }
                className={ cn({
                    size: this.props.size,
                    view: this.props.view,
                    hovered: this.state.hovered,
                    disabled: this.props.disabled,
                    mode: this.props.mode
                }) }
                tabIndex={ 0 }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                onKeyDown={ this.handleKeyDown }
                onKeyUp={ this.handleKeyUp }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
            >
                { !!this.props.content && this.renderMenuItemList(cn, this.props.content) }
            </div>
        );
    }

    renderMenuItemList(cn, content) {
        let result = [];
        let groupKey = 0;

        content.forEach((item) => {
            if (item.type === 'group') {
                result.push(
                    <div
                        className={ cn('group') }
                        key={ `group_${groupKey}` }
                    >
                        { !!item.title &&
                            <div className={ cn('group-title') }>
                                { item.title }
                            </div>
                        }
                        { this.renderMenuItemList(cn, item.content) }
                    </div>
                );
                groupKey += 1;
            } else {
                result.push(this.renderMenuItem(item));
            }
        });

        return result;
    }

    renderMenuItem(item) {
        let itemProps = item.props || {};
        let isItemDisabled = this.props.disabled || itemProps.disabled;
        let clickHandler = this.props.mode === 'basic' ? itemProps.onClick : () => this.handleMenuItemClick(item);
        let menuItem = {
            item,
            ref: item.value
        };
        let menuItemProps = {
            ...itemProps,
            disabled: isItemDisabled,
            value: item.value,
            size: this.props.size || itemProps.size,
            onClick: !isItemDisabled ? clickHandler : undefined
        };
        let highlightedItem = this.props.highlightedItem === undefined
            ? this.state.highlightedItem
            : this.props.highlightedItem;

        this.menuItemList.push(menuItem);

        return (
            <MenuItem
                { ...menuItemProps }
                ref={ (instance) => { menuItem.instance = instance; } }
                key={ item.value }
                checked={ this.props.mode !== 'basic' && this.getIndexInCheckedItemsList(item.value) !== -1 }
                type={ this.props.mode !== 'basic' ? 'block' : itemProps.type }
                onMouseEnter={ () => this.handleMenuItemMouseEnter(menuItem) }
                onMouseLeave={ this.handleMenuItemMouseLeave }
                hovered={ highlightedItem && highlightedItem.ref === menuItem.ref }
            >
                { item.content }
            </MenuItem>
        );
    }

    @autobind
    handleMenuItemClick(item) {
        this.setNewCheckedItems(item);
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

    @autobind
    handleKeyUp(event) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    }

    @autobind
    handleKeyDown(event) {
        let highlightedItem = null;
        let highlightedMenuItem = null;
        let menuIteListLength = this.menuItemList.length;

        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();

                if (this.state.highlightedItem) {
                    this.menuItemList.forEach((item, index, menuItemList) => {
                        if (item.ref === this.state.highlightedItem.ref) {
                            if (index + 1 === menuIteListLength) {
                                highlightedItem = menuItemList[0];
                            } else {
                                highlightedItem = menuItemList[index + 1];
                            }
                        }
                    });
                } else {
                    highlightedItem = this.menuItemList[0];
                }

                this.setState({
                    highlightedItem
                });

                if (this.props.onHighlightItem) {
                    this.props.onHighlightItem(highlightedItem);
                }

                break;
            }
            case keyboardCode.UP_ARROW: {
                event.preventDefault();

                if (this.state.highlightedItem) {
                    this.menuItemList.forEach((item, index, menuItemList) => {
                        if (item.ref === this.state.highlightedItem.ref) {
                            if (index - 1 < 0) {
                                highlightedItem = menuItemList[menuIteListLength - 1];
                            } else {
                                highlightedItem = menuItemList[index - 1];
                            }
                        }
                    });
                } else {
                    highlightedItem = this.menuItemList[menuIteListLength - 1];
                }

                this.setState({
                    highlightedItem
                });

                if (this.props.onHighlightItem) {
                    this.props.onHighlightItem(highlightedItem);
                }

                break;
            }
            case keyboardCode.ENTER:
            case keyboardCode.SPACE: {
                event.preventDefault();

                highlightedItem = this.props.highlightedItem === undefined
                    ? this.state.highlightedItem
                    : this.props.highlightedItem;

                if (highlightedItem) {
                    this.setNewCheckedItems(highlightedItem.item);
                }

                break;
            }
        }

        if (highlightedItem) {
            highlightedMenuItem = highlightedItem.instance;
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event, highlightedMenuItem);
        }
    }

    @autobind
    handleFocus(event) {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    @autobind
    handleBlur(event) {
        event.persist();
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
        }

        this.blurTimeoutId = setTimeout(() => {
            if (isNodeOutsideElement(document.activeElement, this.root) && this.props.onBlur) {
                this.props.onBlur(event);
            }
            this.blurTimeoutId = null;
        }, 0);
    }

    handleMenuItemMouseEnter(menuItem) {
        this.setState({
            highlightedItem: menuItem
        });

        if (this.props.onHighlightItem) {
            this.props.onHighlightItem(menuItem);
        }
    }

    @autobind
    handleMenuItemMouseLeave() {
        this.setState({
            highlightedItem: null
        });

        if (this.props.onHighlightItem) {
            this.props.onHighlightItem(null);
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
     * Устанавливает фокус на меню.
     *
     * @public
     */
    focus() {
        this.root.focus();

        if (this.props.autoFocusFirstItem) {
            let highlightedItem = this.menuItemList[0];
            this.setState({
                highlightedItem
            });

            if (this.props.onHighlightItem) {
                this.props.onHighlightItem(highlightedItem);
            }
        }
    }

    /**
     * Убирает фокус с меню.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }

    setNewCheckedItems(item) {
        let value = item.value;
        let checkedItems = this.props.checkedItems !== undefined
            ? Array.from(this.props.checkedItems)
            : Array.from(this.state.checkedItems);
        let indexInCheckedItemsList = this.getIndexInCheckedItemsList(value);

        switch (this.props.mode) {
            case 'check':
                if (indexInCheckedItemsList === -1) {
                    checkedItems.push(value);
                } else {
                    checkedItems.splice(indexInCheckedItemsList, 1);
                }
                break;
            case 'radio':
                if (indexInCheckedItemsList === -1) {
                    checkedItems = [value];
                }
                break;
            case 'radio-check':
                if (indexInCheckedItemsList === -1) {
                    checkedItems = [value];
                } else {
                    checkedItems = [];
                }
                break;
            default:
                break;
        }

        if (this.props.onItemClick) {
            this.props.onItemClick(item);
        }

        this.changeCheckedItems(checkedItems);
        this.focus();
    }

    /**
     * Изменяет выбранные значения.
     *
     * @param {Array.<String|Number>} checkedItems Список выбранных значений
     */
    changeCheckedItems(checkedItems) {
        this.setState({
            checkedItems
        });

        if (this.props.onItemCheck) {
            this.props.onItemCheck(checkedItems);
        }
    }

    @autobind
    getIndexInCheckedItemsList(value) {
        let checkedItems = this.props.checkedItems ? this.props.checkedItems : this.state.checkedItems;
        return checkedItems.indexOf(value);
    }

    getFirstItem(content) {
        let firstItem = content[0];

        return firstItem.type === 'group' ? this.getFirstItem(firstItem.content) : firstItem;
    }
}

export default Menu;
