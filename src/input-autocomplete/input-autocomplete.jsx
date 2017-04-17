/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint react/prop-types: 0 */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Input from '../input/input';
import Menu from '../menu/menu';
import Popup from '../popup/popup';
import ResizeSensor from '../resize-sensor/resize-sensor';

import cn from '../cn';
import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_NORMAL_DURATION } from '../vars';

import './input-autocomplete.css';

/**
 * Компонент поля для ввода с автокомплитом.
 *
 * @extends Input
 */
@cn('input', Input)
@performance(true)
class InputAutocomplete extends React.Component {
    static propTypes = {
        /** Список вариантов выбора */
        options: Type.arrayOf(Type.shape({
            /** Тип списка вариантов */
            type: Type.oneOf(['item', 'group']),
            /** Уникальное значение, которое будет отправлено на сервер, если вариант выбран */
            value: Type.string,
            /** Отображение варианта */
            description: Type.node,
            /** Список вариантов, только для type='group' */
            content: Type.array
        })),
        /** Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления */
        disabled: Type.bool,
        /** Управление видимостью выпадающего списка */
        opened: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Обработчик выбора пункта в выпадающем меню */
        onItemSelect: Type.func
    };

    static defaultProps = {
        disabled: false,
        size: 'm',
        width: 'default',
        options: []
    };

    state = {
        value: '',
        opened: false,
        inputFocused: false,
        menuFocused: false,
        popupStyles: {},
        highlightedItem: null
    };

    input;
    popup;
    menu;

    componentDidMount() {
        this.popup.setTarget(this.input.getNode());
        this.updatePopupStyles();
    }

    componentWillReceiveProps(nextProps) {
        // Если у компонента появились опции и фокус стоит на нем,
        // то проявляем попап со списком опций.
        if (nextProps.options.length > 0 &&
            (this.state.inputFocused || this.state.menuFocused) &&
            !this.state.opened
        ) {
            this.setState({ opened: true });
        }
    }

    render(cn, Input) {
        let value = this.props.value !== undefined ? this.props.value : this.state.value;

        let props = {
            ...this.props,
            ref: (input) => { this.input = input; },
            className: cn({
                focused: this.state.inputFocused || this.state.menuFocused,
                'has-autocomplete': true
            }),
            value,
            onChange: this.handleChange,
            onFocus: this.handleInputFocus,
            onBlur: this.handleInputBlur,
            onKeyDown: this.handleKeyDown
        };

        return (
            <div
                className={ cn('autocomplete-case', { width: this.props.width }) }
            >
                <Input { ...props } />
                { this.renderPopup(cn) }
            </div>
        );
    }

    renderPopup(cn) {
        let formattedOptionsList = this.props.options
            ? this.formatOptionsList(this.props.options)
            : [];
        let opened = this.props.opened !== undefined ? this.props.opened : this.state.opened;

        return [
            <ResizeSensor onResize={ this.updatePopupStyles } key='popup-sensor' />,
            <Popup
                className={ cn('popup') }
                size={ this.props.size }
                ref={ (popup) => { this.popup = popup; } }
                visible={ opened }
                autoclosable={ true }
                onClickOutside={ this.handleClickOutside }
                target='anchor'
                directions={ ['bottom-left', 'bottom-right', 'top-left', 'top-right'] }
                height='adaptive'
                padded={ false }
                minWidth={ this.state.popupStyles.minWidth }
                key='popup'
            >
                <Menu
                    ref={ (menu) => { this.menu = menu; } }
                    className={ cn('menu') }
                    size={ this.props.size }
                    mode='radio-check'
                    content={ formattedOptionsList }
                    checkedItems={ [] }
                    onItemCheck={ this.handleItemCheck }
                    onMouseEnter={ this.handleMenuFocus }
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

    @autobind
    handleItemCheck(checkedItemsValues) {
        let checkedItemValue = checkedItemsValues.length ? checkedItemsValues[0] : this.state.checkedItemValue;
        let checkedItem = this.getCheckedOption(this.props.options, checkedItemValue);

        let newValue = checkedItem ? checkedItem.value : this.state.value;

        this.setState({
            value: newValue,
            opened: false
        });

        if (this.props.onItemSelect) {
            this.props.onItemSelect(checkedItem);
        }

        if (this.props.onChange) {
            this.props.onChange(newValue);
        }
    }

    @autobind
    handleChange(value) {
        this.setState({
            value
        }, () => {
            this.setState({
                opened: this.props.options.length > 0
            });
        });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    @autobind
    handleInputFocus(event) {
        this.changeFocused({
            inputFocused: true
        }, event);

        this.setState({
            highlightedItem: null
        });
    }

    @autobind
    handleInputBlur(event) {
        this.changeFocused({
            inputFocused: false
        }, event, () => {
            this.setState({
                opened: this.state.menuFocused
            });
        });
    }

    @autobind
    handleMenuFocus(event) {
        this.changeFocused({ menuFocused: true }, event);
    }

    @autobind
    handleMenuBlur(event) {
        this.changeFocused({
            menuFocused: false
        }, event, () => {
            this.setState({
                opened: this.state.inputFocused
            });
        });
    }

    @autobind
    handleClickOutside(event) {
        if (!this.state.inputFocused) {
            this.changeFocused({
                menuFocused: false,
                opened: false
            }, event);

            if (this.props.onClickOutside) {
                this.props.onClickOutside();
            }
        }
    }

    @autobind
    handleKeyDown(event) {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW: {
                event.preventDefault();

                let posX = window.pageXOffset;
                let posY = window.pageYOffset;

                this.menu.focus();

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
    }

    @autobind
    handleHighlightedItem(highlightedItem) {
        this.setState({
            highlightedItem
        });
    }

    @autobind
    handleMenuKeyDown(event, highlightedItem) {
        switch (event.which) {
            case keyboardCode.DOWN_ARROW:
            case keyboardCode.UP_ARROW:
                event.preventDefault();
                this.syncKeyboardNavigationWithScroll(highlightedItem);
                break;

            case keyboardCode.ESCAPE:
                this.input.focus();
                break;

            case keyboardCode.TAB:
                this.menu.blur();
                break;
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

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

    changeFocused(focusedState, event, done) {
        let currentFocused = this.state.inputFocused || this.state.menuFocused;

        let newState = {
            inputFocused: this.state.inputFocused,
            menuFocused: this.state.menuFocused,
            ...focusedState
        };

        let newFocused = newState.inputFocused || newState.menuFocused;

        if (currentFocused !== newFocused) {
            if (newFocused) {
                if (this.props.onFocus) {
                    this.props.onFocus(event);
                }
            } else if (this.props.onBlur) {
                this.props.onBlur(event);
            }
        }

        this.setState(focusedState, done);
    }

    formatOptionsList(options) {
        return (
            options.map((option) => {
                if (option.type === 'group' && !!option.content) {
                    let content = this.formatOptionsList(option.content);

                    return ({
                        type: 'group',
                        title: option.title,
                        content
                    });
                }

                return ({
                    value: option.value,
                    content: option.description || option.value
                });
            })
        );
    }

    getCheckedOption(options, value) {
        let result = null;

        options.find((option) => {
            if (option.type === 'group' && !!option.content) {
                let findInGroup = this.getCheckedOption(option.content, value);
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

    @autobind
    updatePopupStyles() {
        let input = this.input.getNode();
        let inputWidth = input.getBoundingClientRect().width;

        this.setState({
            popupStyles: {
                minWidth: inputWidth
            }
        });
    }

    /**
     * @param {MenuItem} highlightedItem Выбранный пункт меню
     */
    syncKeyboardNavigationWithScroll(highlightedItem) {
        let element = highlightedItem.getNode();
        let container = this.popup.getInnerNode();
        let correction = element.offsetHeight;

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

export default InputAutocomplete;
