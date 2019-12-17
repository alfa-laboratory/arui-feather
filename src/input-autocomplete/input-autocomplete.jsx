/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

import React from 'react';
import Type from 'prop-types';

import Input from '../input/input';
import Menu from '../menu/menu';
import Popup from '../popup/popup';
import ResizeSensor from '../resize-sensor/resize-sensor';

import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import keyboardCode from '../lib/keyboard-code';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_NORMAL_DURATION } from '../vars';

/**
 * Компонент поля для ввода с автокомплитом.
 *
 * @extends Input
 */
class InputAutocomplete extends React.PureComponent {
    cn = createCn('input');
    static propTypes = {
        ...Input.propTypes,
        /** Список вариантов выбора */
        options: Type.arrayOf(Type.shape({
            /** Тип списка вариантов */
            type: Type.oneOf(['item', 'group']),
            /** Уникальное значение, которое будет отправлено на сервер, если вариант выбран */
            value: Type.string,
            /** Отображение варианта */
            description: Type.node,
            /** Текст, который должен быть записан в текстовое поле при выборе варианта */
            text: Type.string,
            /** Список вариантов, только для type='group' */
            content: Type.array,
            /** Только для type='item': свойства для компонента [MenuItem](#!/MenuItem) */
            props: Type.object
        })),
        /**
         * Управление возможностью изменения атрибута компонента, установка
         * соответствующего класса-модификатора для оформления
         */
        disabled: Type.bool,
        /** Управление видимостью выпадающего списка */
        opened: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Ширинa выпадающего списка равна ширине инпута */
        equalPopupWidth: Type.bool,
        /** Определяет нужно или нет обновлять значение текстового поля при выборе варианта */
        updateValueOnItemSelect: Type.bool,
        /** Направления, в которые может открываться попап компонента */
        directions: Type.arrayOf(Type.oneOf([
            'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top',
            'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'
        ])),
        /** Вставляет попап со списком только если элемент активен */
        renderPopupOnFocus: Type.bool,
        /**
         * Обработчик выбора пункта в выпадающем меню
         * @param checkedItem
         */
        onItemSelect: Type.func,
        /** Закрытие выпадающего списка в случае, если произошел выбор элемента */
        closeOnSelect: Type.bool,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string,
        /** Максимальная высота выпадающего списка опций */
        popupMaxHeight: Type.number,
        /** Название класса попапа с опциями */
        popupClassName: Type.string
    };

    static defaultProps = {
        disabled: false,
        size: 'm',
        width: 'default',
        options: [],
        updateValueOnItemSelect: true,
        directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
        equalPopupWidth: false,
        closeOnSelect: false,
        renderPopupOnFocus: false
    };

    state = {
        value: this.props.defaultValue || '',
        inputFocused: false,
        menuFocused: false,
        popupStyles: {},
        highlightedItem: null
    };

    /**
     * @type {Input}
     */
    input;

    /**
     * @type {Popup}
     */
    popup;

    /**
     * @type {Menu}
     */
    menu;

    /**
     * @type {Number}
     */
    blurTimeout = null;

    /**
     * @type {Number}
     */
    inputFocusTimeout = null;

    componentDidMount() {
        this.updatePopupTarget();
        this.updatePopupStyles();
    }

    componentDidUpdate() {
        this.updatePopupTarget();
        this.updatePopupStyles();
    }

    componentWillUnmount() {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
            this.blurTimeout = null;
        }

        if (this.inputBlurTimeout) {
            clearTimeout(this.inputBlurTimeout);
            this.inputBlurTimeout = null;
        }

        if (this.inputFocusTimeout) {
            clearTimeout(this.inputFocusTimeout);
            this.inputFocusTimeout = null;
        }
    }

    render(Input) {
        const value = this.props.value === undefined ? this.state.value : this.props.value;

        const props = {
            ...this.props,
            ref: (input) => {
                this.input = input;
            },
            className: this.cn({
                focused: this.state.inputFocused || this.state.menuFocused,
                'has-autocomplete': true
            }),
            autocomplete: this.props.autocomplete || false,
            value,
            onChange: this.handleChange,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            onKeyDown: this.handleKeyDown
        };

        return (
            <div
                className={ this.cn('autocomplete-case', { width: this.props.width }) }
            >
                <Input { ...props } />
                { this.renderPopup() }
            </div>
        );
    }

    renderPopup() {
        const formattedOptionsList = this.props.options
            ? this.formatOptionsList(this.props.options)
            : [];

        const opened = this.props.opened === undefined
            ? (this.state.inputFocused || this.state.menuFocused)
            : this.props.opened;

        if (this.props.options.length === 0) {
            this.popup = null;

            return null;
        }

        if (this.props.renderPopupOnFocus && !opened) {
            return null;
        }

        return [
            <ResizeSensor onResize={ this.updatePopupStyles } key='popup-sensor' />,
            <Popup
                className={ this.cn('popup', { custom: this.props.popupClassName }) }
                size={ this.props.size }
                ref={ (popup) => {
                    this.popup = popup;
                } }
                for={ this.props.name }
                visible={ opened }
                onClickOutside={ this.handleClickOutside }
                target='anchor'
                directions={ this.props.directions }
                height={ this.props.popupMaxHeight ? 'default' : 'adaptive' }
                padded={ false }
                minWidth={ this.state.popupStyles.minWidth }
                maxWidth={ this.state.popupStyles.maxWidth }
                key='popup'
                maxHeight={ this.props.popupMaxHeight }
            >
                <Menu
                    ref={ (menu) => {
                        this.menu = menu;
                    } }
                    className={ this.cn('menu') }
                    size={ this.props.size }
                    mode='radio-check'
                    content={ formattedOptionsList }
                    checkedItems={ [] }
                    onItemCheck={ this.handleItemCheck }
                    autoFocusFirstItem={ true }
                    highlightedItem={ this.state.highlightedItem }
                    onHighlightItem={ this.handleHighlightedItem }
                    onFocus={ this.handleMenuFocus }
                    onBlur={ this.handleMenuBlur }
                    onKeyDown={ this.handleMenuKeyDown }
                />
            </Popup>
        ];
    }

    handleItemCheck = (checkedItemsValues) => {
        const checkedItemValue = checkedItemsValues.length ? checkedItemsValues[0] : this.state.checkedItemValue;
        const checkedItem = this.getCheckedOption(this.props.options, checkedItemValue);

        const newValue = checkedItem
            ? (checkedItem.text || checkedItem.value)
            : this.state.value;

        if (this.props.onItemSelect) {
            this.props.onItemSelect(checkedItem);
        }

        if (this.props.updateValueOnItemSelect) {
            this.setState({ value: newValue });

            if (this.props.onChange) {
                this.props.onChange(newValue);
            }
        }

        if (this.inputFocusTimeout) {
            clearTimeout(this.inputFocusTimeout);
        }

        if (this.inputBlurTimeout) {
            clearTimeout(this.inputBlurTimeout);
        }

        if (this.props.closeOnSelect) {
            this.inputBlurTimeout = setTimeout(() => this.input.blur(), 0);
        } else {
            this.inputFocusTimeout = setTimeout(() => {
                this.input.focus();
                this.input.setSelectionRange(newValue.length);
            }, 0);
        }
    };

    handleChange = (value) => {
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    handleInputFocus = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
            this.blurTimeout = null;
        }

        this.solveFocused(event);

        this.setState({
            highlightedItem: null
        });
    };

    handleInputBlur = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }

        event.persist();

        this.blurTimeout = setTimeout(() => {
            this.solveFocused(event);
            this.blurTimeout = null;
        }, 0);
    };

    handleMenuFocus = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
            this.blurTimeout = null;
        }

        this.solveFocused(event);
    };

    handleMenuBlur = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }

        event.persist();

        this.blurTimeout = setTimeout(() => {
            this.solveFocused(event);
            this.blurTimeout = null;
        }, 0);
    };

    handleClickOutside = () => {
        if (this.props.onClickOutside) {
            this.props.onClickOutside();
        }
    };

    handleKeyDown = (event) => {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();

                const posX = window.pageXOffset;
                const posY = window.pageYOffset;

                if (this.menu) {
                    this.menu.focus();
                }

                window.scrollTo(posX, posY);

                break;
            }

            case keyboardCode.ESCAPE: {
                this.input.blur();
                break;
            }
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    handleHighlightedItem = (highlightedItem) => {
        this.setState({
            highlightedItem
        });
    };

    handleMenuKeyDown = (event, highlightedItem) => {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW:
            case keyboardCode.UP_ARROW:
                event.preventDefault();
                this.syncKeyboardNavigationWithScroll(highlightedItem);
                break;

            case keyboardCode.ESCAPE:
                this.input.focus();
                break;
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.input.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        this.input.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        this.input.scrollTo();
    }

    /**
     * Определяет является ли весь компонент в фокусе на событиях onFocus/onBlur.
     *
     * @param {SyntheticEvent} event Событие focus/blur, которое будет проброшено в обработчик onFocus/onBlur
     */
    solveFocused(event) {
        const currentFocused = this.state.inputFocused || this.state.menuFocused;

        const focusedElement = document.activeElement;

        const newState = {
            inputFocused: (focusedElement === this.input.getControl()),
            menuFocused: this.menu
                ? (this.menu.getNode() === focusedElement || this.menu.getNode().contains(focusedElement))
                : false
        };

        const newFocused = newState.inputFocused || newState.menuFocused;

        if (currentFocused !== newFocused) {
            if (newFocused) {
                if (this.props.onFocus) {
                    this.props.onFocus(event);
                }
            } else if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }

        this.setState(newState);
    }

    formatOptionsList(options) {
        return (
            options.map((option) => {
                if (option.type === 'group' && !!option.content) {
                    const content = this.formatOptionsList(option.content);

                    return ({
                        type: 'group',
                        title: option.title,
                        content
                    });
                }

                return ({
                    key: option.key || option.value,
                    value: option.value,
                    content: option.description || option.value,
                    props: option.props
                });
            })
        );
    }

    getCheckedOption(options, value) {
        let result = null;

        options.find((option) => {
            if (option.type === 'group' && !!option.content) {
                const findInGroup = this.getCheckedOption(option.content, value);

                if (findInGroup) {
                    result = findInGroup;

                    return true;
                }
            } else if (option.value === value) {
                result = option;

                return true;
            }

            return false;
        });

        return result;
    }

    updatePopupStyles = () => {
        const input = this.input.getNode();
        const inputWidth = input.getBoundingClientRect().width;
        const popupStyles = { minWidth: inputWidth };

        if (this.props.equalPopupWidth) {
            popupStyles.maxWidth = inputWidth;
        }

        this.setState({
            popupStyles
        });
    };

    updatePopupTarget() {
        if (this.popup) {
            this.popup.setTarget(this.input.getBoxNode());
        }
    }

    /**
     * @param {MenuItem} highlightedItem Выбранный пункт меню
     */
    syncKeyboardNavigationWithScroll(highlightedItem) {
        const element = highlightedItem.getNode();
        const container = this.popup.getInnerNode();
        const correction = element.offsetHeight;

        if (element.offsetTop + correction > container.scrollTop + container.offsetHeight) {
            scrollTo({
                container,
                targetY: element.offsetTop,
                duration: SCROLL_TO_NORMAL_DURATION
            });
        } else if (element.offsetTop < container.scrollTop) {
            scrollTo({
                container,
                targetY: (element.offsetTop - container.offsetHeight) + correction,
                duration: SCROLL_TO_NORMAL_DURATION
            });
        }
    }
}

export default withTheme(InputAutocomplete);
