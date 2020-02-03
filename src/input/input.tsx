/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import { FormatCharacters } from '../masked-input/mask';
import IconClose from '../icon/ui/close';
import IconButton from '../icon-button/icon-button';
import MaskedInput from '../masked-input/masked-input';

import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

export type InputProps = {

    /**
     * Тип поля.
     Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
     Подробнее: <a href="http://w3c.github.io/html/sec-forms.html#does-not-apply" target="_blank">http://w3c.github.io/html/sec-forms.html#does-not-apply</a>
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
     Строка подставляется как есть.
     */
    autocomplete?: boolean | string;

    /**
     * Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления
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
};

/**
 * Компонент текстового поля ввода.
 */
export class Input extends React.PureComponent<InputProps> {
    cn = createCn('input');

    static defaultProps: Partial<InputProps> = {
        formNoValidate: false,
        size: 'm',
        type: 'text',
        view: 'default',
        resetError: true
    };

    state = {
        focused: false,
        error: this.props.error || null,
        value: this.props.defaultValue || ''
    };

    /**
     * @type {HTMLSpanElement}
     */
    root;

    /**
     * @type {HTMLSpanElement}
     */
    box;

    /**
     * @type {HTMLInputElement}
     */
    control;

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            error: nextProps.error
        });
    }

    render() {
        const hasAddons = !!this.props.rightAddons || !!this.props.leftAddons;
        const hasLeftAddons = !!this.props.leftAddons;
        const value = this.props.value === undefined ? this.state.value : this.props.value;
        const focused = this.getFocused();

        return (
            <span
                className={ this.cn({
                    type: this.props.type,
                    view: this.props.view,
                    disabled: this.props.disabled,
                    focused,
                    size: this.props.size,
                    width: this.props.width,
                    'has-addons': hasAddons,
                    'has-left-addons': hasLeftAddons,
                    'has-clear': !!this.props.clear,
                    'has-icon': !!this.props.icon,
                    'has-label': !!this.props.label,
                    'has-value': !!value,
                    invalid: !!this.state.error
                }) }
                ref={ (root) => {
                    this.root = root;
                } }
                data-test-id={ this.props['data-test-id'] }
            >
                <span className={ this.cn('inner') }>
                    {
                        !!this.props.label &&
                        <span className={ this.cn('top') }>
                            { this.props.label }
                        </span>
                    }
                    { this.renderContent() }
                    {
                        (this.state.error || this.props.hint) &&
                        <span className={ this.cn('sub') }>
                            { this.state.error || this.props.hint }
                        </span>
                    }
                </span>
            </span>
        );
    }

    renderContent() {
        const isMaskedInput = this.props.mask !== undefined;
        const value = this.props.value === undefined ? this.state.value : this.props.value;

        const inputProps = {
            className: this.cn('control'),
            type: this.props.type,
            view: this.props.view,
            formNoValidate: this.props.formNoValidate,
            autoComplete: this.getAutoCompleteValue(),
            disabled: this.props.disabled || this.props.disabledAttr,
            maxLength: this.props.maxLength,
            id: this.props.id,
            name: this.props.name,
            value,
            tabIndex: this.props.tabIndex,
            placeholder: this.props.placeholder,
            pattern: this.props.pattern,
            ref: (control) => {
                this.control = control;
            },
            title: this.props.title,
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onClick: this.handleClick,
            onBlur: this.handleBlur,
            onKeyDown: this.handleKeyDown,
            onKeyUp: this.handleKeyUp,
            onPaste: this.handlePaste,
            onTouchStart: this.handleTouchStart,
            onTouchEnd: this.handleTouchEnd,
            onTouchMove: this.handleTouchMove,
            onTouchCancel: this.handleTouchCancel
        };

        return (
            <span
                className={ this.cn('box') }
                key='input-wrapper'
                ref={ (box) => {
                    this.box = box;
                } }
            >
                {
                    this.props.leftAddons &&
                    <span className={ this.cn('addons', { left: true }) } key='left-addons'>
                        { this.props.leftAddons }
                    </span>
                }
                {
                    isMaskedInput
                        ? <MaskedInput
                            { ...inputProps }
                            mask={ this.props.mask }
                            formatCharacters={ this.props.maskFormatCharacters }
                            onProcessInputEvent={ this.props.onProcessMaskInputEvent }
                            useWhitespaces={ this.props.useWhitespacesInMask }
                        />
                        : <input { ...inputProps } />
                }
                {
                    this.props.clear && value &&
                    <IconButton
                        className={ this.cn('clear') }
                        size={ this.props.size }
                        tabIndex={ -1 }
                        onClick={ this.handleClearClick }
                    >
                        <IconClose
                            size={ this.props.size }
                        />
                    </IconButton>
                }
                {
                    this.props.icon &&
                    <div className={ this.cn('icon') }>
                        { this.props.icon }
                    </div>
                }
                {
                    this.props.rightAddons &&
                    <span className={ this.cn('addons', { right: true }) } key='right-addons'>
                        { this.props.rightAddons }
                    </span>
                }
            </span>
        );
    }

    private handleFocus = (event) => {
        this.setState({ focused: true });
        this.enableMouseWheel();
        this.resetError();

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleBlur = (event) => {
        this.setState({ focused: false });
        this.disableMouseWheel();

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    private handleChange = (event) => {
        this.changeValue(event.target.value);
    };

    private handleClearClick = (event) => {
        this.changeValue('');

        if (this.props.onClearClick) {
            this.props.onClearClick(event);
        }

        this.focus();
    };

    private handleKeyDown = (event) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    private handleKeyUp = (event) => {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    };

    private handlePaste = (event) => {
        if (this.props.onPaste) {
            this.props.onPaste(event);
        }
    };

    private handleTouchStart = (event) => {
        if (this.props.onTouchStart) {
            this.props.onTouchStart(event);
        }
    };

    private handleTouchEnd = (event) => {
        if (this.props.onTouchEnd) {
            this.props.onTouchEnd(event);
        }
    };

    private handleTouchMove = (event) => {
        if (this.props.onTouchMove) {
            this.props.onTouchMove(event);
        }
    };

    private handleTouchCancel = (event) => {
        if (this.props.onTouchCancel) {
            this.props.onTouchCancel(event);
        }
    };

    private getAutoCompleteValue() {
        if (typeof this.props.autocomplete === 'string') {
            return this.props.autocomplete;
        }

        return this.props.autocomplete === false ? 'off' : 'on';
    }

    /**
     * Разблокирует возможность скролла в поле ввода
     *
     */
    public enableMouseWheel() {
        const input = this.control instanceof MaskedInput ? this.control.input : this.control;

        if (input) {
            input.onwheel = () => true;
        }
    }

    /**
     * Блокирует возможность скролла в поле ввода
     */
    public disableMouseWheel() {
        const input = this.control instanceof MaskedInput ? this.control.getControl() : this.control;

        if (input) {
            input.onwheel = () => false;
        }
    }

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.root;
    }

    /**
     * Возвращает ссылку на инстанс контейнера для контрола.
     */
    public getBoxNode() {
        return this.box;
    }

    /**
     * Возвращает ссылку на HTMLElement инпута.
     */
    public getControl(): HTMLInputElement {
        if (this.props.mask !== undefined) {
            return this.control.getControl();
        }

        return this.control;
    }

    /**
     * Возвращает ссылку на инстанс MaskedInput.
     * Если маска не была установлена, возвращает null.
     */
    public getMaskedInputInstance(): MaskedInput|null {
        if (this.props.mask !== undefined) {
            return this.control;
        }

        return null;
    }

    /**
     * Устанавливает фокус на поле ввода.
     */
    public focus() {
        this.control.focus();
        this.setSelectionRange(this.getControl().value.length);
    }

    /**
     * Убирает фокус с поля ввода.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }

    /**
     * Скроллит страницу до поля ввода.
     */
    public scrollTo() {
        scrollTo({
            targetY: (this.root.getBoundingClientRect().top + window.pageYOffset) - SCROLL_TO_CORRECTION
        });
    }

    /**
     * Устанавливает начальное и конечное положение выделения текста в элементе.
     * @param {Number} start=0 Индекс первого выделенного символа.
     * @param {Number} end=value.length Индекс символа после последнего выделенного символа.
     */
    public setSelectionRange(start = 0, end = this.getControl().value.length) {
        if (this.props.type !== 'email') {
            this.getControl().setSelectionRange(start, end);
        }
    }

    /**
     * Изменяет текущение значение поля ввода и генерирует событие об этом.
     *
     * @param value Новое значение
     */
    public changeValue(value: string) {
        if (this.props.value === undefined) {
            this.setState({ value });
        }

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    /**
     * Возвращает состояние фокуса.
     */
    private getFocused() {
        return this.props.focused === undefined ? this.state.focused : this.props.focused;
    }

    /**
     * Сбрасывает состояние ошибки.
     */
    private resetError() {
        if (this.props.resetError) {
            this.setState({
                error: null
            });
        }
    }
}

export default withTheme(Input);
