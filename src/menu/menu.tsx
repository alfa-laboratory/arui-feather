/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint jsx-a11y/no-static-element-interactions: 0 */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import IconCheck from '../icon/ui/tick';
import MenuItem, { MenuItemProps } from '../menu-item/menu-item';

import { isNodeOutsideElement } from '../lib/window';
import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';

export type MenuHighlightedItemShapeType = {

    /**
     * Уникальный идентификатор
     */
    ref?: number | string;

    /**
     * Элемент списка типа ContentItem
     */
    item?: any;
}

// TODO: тут надо переделать типы, и сделать условными сейчас не очевидно
export type MenuContentType = {

    /**
     * Тип элемента
     */
    type?: 'item' | 'group';

    /**
     * Ключ для перечисления
     */
    key?: React.Key;

    /**
     * Название группы
     */
    title?: string;

    /**
     * Только для type='item', свойство для компонента [MenuItem](#!/MenuItem)
     */
    value?: string | number;

    /**
     * Содержание элемента
     */
    content?: React.ReactNode | any[];

    /**
     * Только для type='item': свойства для компонента [MenuItem](#!/MenuItem)
     */
    props?: MenuItemProps;
};

export type MenuProps = {

    /**
     * Тип расположения меню: 'horizontal'
     */
    view?: string;

    /**
     * Размещение заголовка групп: обычное или в одну строку с первым элементом группы
     */
    groupView?: 'default' | 'line';

    /**
     * Тип списка вариантов меню
     */
    mode?: 'basic' | 'check' | 'radio' | 'radio-check';

    /**
     * Управление возможностью изменения значения
     */
    disabled?: boolean;

    /**
     * Управление состоянием фокуса элемента
     */
    focused?: boolean;

    /**
     * Управление автоматическим фокусом на первом элементе при вызове публичного метода focus
     */
    autoFocusFirstItem?: boolean;

    /**
     * Элемент меню, на котором стоит выделение
     */
    highlightedItem?: MenuHighlightedItemShapeType;

    /**
     * Список объектов ContentItem
     */
    content?: Array<MenuContentType>;

    /**
     * Список значений выбранных элементов
     */
    checkedItems?: ReadonlyArray<string | number>;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Объект со стилями
     */
    style?: React.CSSProperties;
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
     * Обработчик клика по варианту меню
     */
    onItemClick?: (item?: any) => void;

    /**
     * Обработчик выбора варианта меню
     */
    onItemCheck?: (checkedItems?: any[]) => void;

    /**
     * Обработчик события наведения курсора на меню
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с меню
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>, item?) => void;

    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик фокуса
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события выделения элемента меню, принимает на вход переменную типа HighlightedItem
     */
    onHighlightItem?: (highlightedItem?: any) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент меню.
 */
@performance(true)
export class Menu extends React.Component<MenuProps> {
    cn = createCn('menu');

    static defaultProps: Partial<MenuProps> = {
        size: 'm',
        mode: 'basic',
        groupView: 'default',
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
        if (!!this.props.content && this.props.content.length > 0 &&
            (!this.props.checkedItems || this.props.checkedItems.length === 0) &&
            this.props.mode === 'radio') {
            const firstItem = this.getFirstItem(this.props.content);

            this.changeCheckedItems([firstItem.value]);
        }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.mode !== 'check' && this.state.checkedItems[0] &&
            nextProps.checkedItems[0] !== this.state.checkedItems[0]) {
            let highlightedItem;

            this.menuItemList.forEach((item, index, menuItemList) => {
                if (item.ref === nextProps.checkedItems[0]) {
                    highlightedItem = menuItemList[index].instance;
                }
            });

            if (this.props.onHighlightItem) {
                this.props.onHighlightItem(highlightedItem);
            }
        }
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillUpdate() {
        this.menuItemList = [];
    }

    componentWillUnmount() {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }
    }

    render() {
        /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
        return (
            <div
                ref={ (root) => {
                    this.root = root;
                } }
                style={ this.props.style }
                className={ this.cn({
                    size: this.props.size,
                    view: this.props.view,
                    'group-view': this.props.groupView,
                    hovered: this.state.hovered,
                    disabled: this.props.disabled,
                    mode: this.props.mode
                }) }
                id={ this.props.id }
                tabIndex={ 0 }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                onKeyDown={ this.handleKeyDown }
                onKeyUp={ this.handleKeyUp }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
                data-test-id={ this.props['data-test-id'] }
            >
                { !!this.props.content && this.renderMenuItemList(this.props.content) }
            </div>
        );
        /* eslint-enable jsx-a11y/no-noninteractive-tabindex */
    }

    renderMenuItemList(content) {
        const result = [];
        let groupKey = 0;

        content.forEach((item) => {
            if (item.type === 'group') {
                result.push(
                    <div
                        className={ this.cn('group') }
                        key={ `group_${groupKey}` }
                    >
                        { !!item.title &&
                            <div className={ this.cn('group-title') }>
                                { item.title }
                            </div>
                        }
                        { this.renderMenuItemList(item.content) }
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
        const itemProps = item.props || {};
        const isItemChecked = this.getIndexInCheckedItemsList(item.value) !== -1;
        const isItemDisabled = this.props.disabled || itemProps.disabled;
        const clickHandler = this.props.mode === 'basic' ? itemProps.onClick : () => this.handleMenuItemClick(item);
        const menuItem: { item; ref; instance? } = {
            item,
            ref: item.value
        };
        const menuItemProps = {
            ...itemProps,
            disabled: isItemDisabled,
            value: item.value,
            size: this.props.size || itemProps.size,
            onClick: isItemDisabled ? undefined : clickHandler
        };
        const highlightedItem = this.props.highlightedItem === undefined
            ? this.state.highlightedItem
            : this.props.highlightedItem;
        let iconSize;

        switch (this.props.size) {
            case 's': case 'm': iconSize = 's'; break;
            case 'l': case 'xl': iconSize = 'm'; break;
        }

        this.menuItemList.push(menuItem);

        return (
            <MenuItem
                { ...menuItemProps }
                ref={ (instance) => {
                    menuItem.instance = instance;
                } }
                key={ item.key || item.value }
                checked={ isItemChecked }
                type={ this.props.mode === 'basic' ? itemProps.type : 'block' }
                onMouseEnter={ () => this.handleMenuItemMouseEnter(menuItem) }
                onMouseLeave={ this.handleMenuItemMouseLeave }
                hovered={ highlightedItem && highlightedItem.ref === menuItem.ref }
            >
                {
                    this.props.mode === 'check' && isItemChecked &&
                    <IconCheck
                        size={ iconSize }
                    />
                }
                { item.content }
            </MenuItem>
        );
    }

    private handleMenuItemClick = (item) => {
        this.setNewCheckedItems(item);

        if (this.props.onItemClick) {
            this.props.onItemClick(item);
        }
    };

    private handleMouseEnter = (event) => {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    private handleMouseLeave = (event) => {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    private handleKeyUp = (event) => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    private handleKeyDown = (event) => {
        let highlightedItem = null;
        let highlightedMenuItem = null;
        const menuIteListLength = this.menuItemList.length;

        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();

                if (this.state.highlightedItem) {
                    this.menuItemList.forEach((item, index, menuItemList) => {
                        if (item.ref === this.state.highlightedItem.ref) {
                            if (index + 1 === menuIteListLength) {
                                [highlightedItem] = menuItemList;
                            } else {
                                highlightedItem = menuItemList[index + 1];
                            }
                        }
                    });
                } else {
                    [highlightedItem] = this.menuItemList;
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
    };

    private handleFocus = (event) => {
        if (this.blurTimeoutId) {
            clearTimeout(this.blurTimeoutId);
            this.blurTimeoutId = null;
        }

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleBlur = (event) => {
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
    };

    private handleMenuItemMouseEnter(menuItem) {
        this.setState({
            highlightedItem: menuItem
        });

        if (this.props.onHighlightItem) {
            this.props.onHighlightItem(menuItem);
        }
    }

    private handleMenuItemMouseLeave = () => {
        this.setState({
            highlightedItem: null
        });

        if (this.props.onHighlightItem) {
            this.props.onHighlightItem(null);
        }
    };

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.root;
    }

    /**
     * Устанавливает фокус на меню.
     */
    public focus() {
        this.root.focus();

        if (this.props.autoFocusFirstItem) {
            const highlightedItem = this.menuItemList[0];

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
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }

    private setNewCheckedItems(item) {
        const { value } = item;
        let checkedItems = this.props.checkedItems === undefined
            ? Array.from(this.state.checkedItems)
            : Array.from(this.props.checkedItems);
        const indexInCheckedItemsList = this.getIndexInCheckedItemsList(value);

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

        this.changeCheckedItems(checkedItems);
        this.focus();
    }

    /**
     * Изменяет выбранные значения.
     *
     * @param {Array.<String|Number>} checkedItems Список выбранных значений
     */
    private changeCheckedItems(checkedItems) {
        this.setState({
            checkedItems
        });

        if (this.props.onItemCheck) {
            this.props.onItemCheck(checkedItems);
        }
    }

    private getIndexInCheckedItemsList = (value) => {
        const checkedItems = this.props.checkedItems ? this.props.checkedItems : this.state.checkedItems;

        return checkedItems.indexOf(value);
    };

    private getFirstItem(content) {
        const firstItem = content[0];

        return firstItem.type === 'group' ? this.getFirstItem(firstItem.content) : firstItem;
    }
}

export default withTheme(Menu);
