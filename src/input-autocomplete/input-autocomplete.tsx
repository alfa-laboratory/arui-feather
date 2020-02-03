/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

// @ts-nocheck

/* eslint react/prop-types: 0 */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import { FormatCharacters } from '../masked-input/mask';

import Menu from '../menu/menu';
import Popup from '../popup/popup';
import { ResizeSensor } from '../resize-sensor/resize-sensor';

import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_NORMAL_DURATION } from '../vars';

import { MenuItem } from '../menu-item/menu-item';
import Input, { InputProps } from '../input/input';

export type InputAutocompleteProps = InputProps & {

    /**
     * Тип поля.
     * Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
     * Подробнее: <a href="http://w3c.github.io/html/sec-forms.html#does-not-apply" target="_blank">http://w3c.github.io/html/sec-forms.html#does-not-apply</a>
     */
    type?: 'number' | 'card' | 'email' | 'file' | 'hidden' | 'money' | 'password' | 'tel' | 'text';

    /**
     * Тип инпута (filled только на белом фоне в размере m)
     */
    view?: 'default' | 'filled';

    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Управление автозаполнением компонента. В случае передачи `true` или `false` подставляет `on` или `off`.
     * Строка подставляется как есть.
     */
    autocomplete?: boolean | string;

    /**
     * Управление возможностью изменения атрибута компонента, установка
     * соответствующего класса-модификатора для оформления
     */
    disabled?: boolean;

    /**
     * Управление возможностью изменения атрибута компонента (без установки класса-модификатора для оформления)
     */
    disabledAttr?: boolean;

    /**
     * Управление возможностью изменения класса-модификатора компонента
     */
    focused?: boolean;

    /**
     * Максимальное число символов
     */
    maxLength?: number;

    /**
     * Иконка компонента
     */
    icon?: React.ReactNode;

    /**
     * Управление наличием крестика, сбрасывающего значение 'value'
     */
    clear?: boolean;

    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Содержимое поля ввода
     */
    value?: string;

    /**
     * Содержимое поля ввода, указанное по умолчанию
     */
    defaultValue?: string;

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

    /**
     * Определяет маску для ввода значений. <a href="https://github.com/insin/inputmask-core#pattern" target="_blank">Шаблон маски</a>
     */
    mask?: string;

    /**
     * Позволяет использовать пробелы в маске
     */
    useWhitespacesInMask?: boolean;

    /**
     * Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core`
     */
    maskFormatCharacters?: FormatCharacters;

    /**
     * Стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах.
     */
    pattern?: string;

    /**
     * Управление встроенной проверкой данных введённых пользователем в поле на корректность
     */
    formNoValidate?: boolean;

    /**
     * Добавление дополнительных элементов к инпуту слева
     */
    leftAddons?: React.ReactNode;

    /**
     * Добавление дополнительных элементов к инпуту справа
     */
    rightAddons?: React.ReactNode;

    /**
     * Лейбл для поля
     */
    label?: React.ReactNode;

    /**
     * Подсказка в поле
     */
    placeholder?: string;

    /**
     * Подсказка под полем
     */
    hint?: React.ReactNode;

    /**
     * Отображение ошибки
     */
    error?: React.ReactNode;

    /**
     * Сброс ошибки при установке фокуса
     */
    resetError?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Тултип, который появляется при наведении
     */
    title?: string;

    /**
     * Обработчик изменения значения 'value'
     */
    onChange?: (value?: string) => void;

    /**
     * Обработчик фокуса поля
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик клика по полю
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик снятия фокуса с поля
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик клика по крестику сбрасываещему значение 'value'
     */
    onClearClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте
     */
    onKeyUp?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события вставки текста в поле
     */
    onPaste?: (event?: React.ClipboardEvent<any>) => void;

    /**
     * Обработчик события касания по полю
     */
    onTouchStart?: (event?: React.TouchEvent<any>) => void;

    /**
     * Обработчик события прекращения касания по полю
     */
    onTouchEnd?: (event?: React.TouchEvent<any>) => void;

    /**
     * Обработчик события перемещения при касании по полю
     */
    onTouchMove?: (event?: React.TouchEvent<any>) => void;

    /**
     * Обработчик события прерывания касания по полю
     */
    onTouchCancel?: (event?: React.TouchEvent<any>) => void;

    /**
     * Обработчик, вызываемый перед началом ввода в маскированное поле
     */
    onProcessMaskInputEvent?: (event?: React.ChangeEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

    /**
     * Список вариантов выбора
     */
    options?: ReadonlyArray<{

        /**
         * Тип списка вариантов
         */
        type?: 'item' | 'group';

        /**
         * Уникальное значение, которое будет отправлено на сервер, если вариант выбран
         */
        value?: string;

        /**
         * Отображение варианта
         */
        description?: React.ReactNode;

        /**
         * Текст, который должен быть записан в текстовое поле при выборе варианта
         */
        text?: string;

        /**
         * Список вариантов, только для type='group'
         */
        content?: any[];

        /**
         * Только для type='item': свойства для компонента [MenuItem](#!/MenuItem)
         */
        props?: object;
    }>;

    /**
     * Управление видимостью выпадающего списка
     */
    opened?: boolean;

    /**
     * Ширинa выпадающего списка равна ширине инпута
     */
    equalPopupWidth?: boolean;

    /**
     * Определяет нужно или нет обновлять значение текстового поля при выборе варианта
     */
    updateValueOnItemSelect?: boolean;

    /**
     * Направления, в которые может открываться попап компонента
     */
    directions?: ReadonlyArray<'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right'>;

    /**
     * Вставляет попап со списком только если элемент активен
     */
    renderPopupOnFocus?: boolean;

    /**
     * Обработчик выбора пункта в выпадающем меню
     */
    onItemSelect?: (checkedItem?: any) => void;

    /**
     * Закрытие выпадающего списка в случае, если произошел выбор элемента
     */
    closeOnSelect?: boolean;

    /**
     * Максимальная высота выпадающего списка опций
     */
    popupMaxHeight?: number;

    /**
     * Название класса попапа с опциями
     */
    popupClassName?: string;
}

type InputAutocompleteState = {
    value: string;
    inputFocused: boolean;
    menuFocused: boolean;
    popupStyles: React.CSSProperties;
    highlightedItem: MenuItem | null;
}

/**
 * Компонент поля для ввода с автокомплитом.
 *
 * @extends Input
 */
@performance(true)
export class InputAutocomplete extends React.Component<InputAutocompleteProps, InputAutocompleteState> {
    cn = createCn('input');

    static defaultProps: Partial<InputAutocompleteProps> = {
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

    private input: Input;

    private popup: Popup;

    private menu: Menu;

    private blurTimeout: ReturnType<typeof setTimeout> = null;

    private inputFocusTimeout: ReturnType<typeof setTimeout> = null;

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

    render() {
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

    private renderPopup() {
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

    private handleItemCheck = (checkedItemsValues) => {
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

    private handleChange = (value) => {
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private handleInputFocus = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
            this.blurTimeout = null;
        }

        this.solveFocused(event);

        this.setState({
            highlightedItem: null
        });
    };

    private handleInputBlur = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }

        event.persist();

        this.blurTimeout = setTimeout(() => {
            this.solveFocused(event);
            this.blurTimeout = null;
        }, 0);
    };

    private handleMenuFocus = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
            this.blurTimeout = null;
        }

        this.solveFocused(event);
    };

    private handleMenuBlur = (event) => {
        if (this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }

        event.persist();

        this.blurTimeout = setTimeout(() => {
            this.solveFocused(event);
            this.blurTimeout = null;
        }, 0);
    };

    private handleClickOutside = () => {
        if (this.props.onClickOutside) {
            this.props.onClickOutside();
        }
    };

    private handleKeyDown = (event) => {
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

    private handleHighlightedItem = (highlightedItem) => {
        this.setState({
            highlightedItem
        });
    };

    private handleMenuKeyDown = (event, highlightedItem) => {
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
     */
    public focus() {
        this.input.focus();
    }

    /**
     * Убирает фокус с поля ввода.
     */
    public blur() {
        this.input.blur();
    }

    /**
     * Скроллит страницу до поля ввода.
     */
    public scrollTo() {
        this.input.scrollTo();
    }

    /**
     * Определяет является ли весь компонент в фокусе на событиях onFocus/onBlur.
     *
     * @param event Событие focus/blur, которое будет проброшено в обработчик onFocus/onBlur
     */
    private solveFocused(event: React.SyntheticEvent) {
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

    private formatOptionsList(options) {
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

    private getCheckedOption(options, value) {
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

    private updatePopupStyles = () => {
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

    private updatePopupTarget() {
        if (this.popup) {
            this.popup.setTarget(this.input.getBoxNode());
        }
    }

    /**
     * @param highlightedItem Выбранный пункт меню
     */
    private syncKeyboardNavigationWithScroll(highlightedItem: MenuItem) {
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
