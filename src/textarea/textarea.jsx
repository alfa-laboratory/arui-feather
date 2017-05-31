/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Type from 'prop-types';

import cn from '../cn';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

/**
 * Компонент многострочного текстового ввода.
 */
@cn('textarea')
@performance()
class Textarea extends React.Component {
    static propTypes = {
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Управление автозаполнением компонента */
        autocomplete: Type.bool,
        /** Управление возможностью изменения значения компонента */
        disabled: Type.bool,
        /** Управление возможностью подстраивать высоту компонента под высоту текста  */
        autosize: Type.bool,
        /** Максимальное число символов */
        maxLength: Type.number,
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Уникальное имя блока */
        name: Type.string,
        /** Содержимое поля ввода, указанное по умолчанию (используйте это поле если хотите использовать компонент как uncontrolled) */
        defaultValue: Type.string,
        /** Содержимое поля ввода */
        value: Type.string,
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Лейбл для поля */
        label: Type.node,
        /** Подсказка в поле */
        placeholder: Type.string,
        /** Подсказка под полем */
        hint: Type.node,
        /** Отображение ошибки */
        error: Type.node,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Управление возможностью изменения размеров компонента */
        resize: Type.oneOf(['both', 'horizontal', 'vertical', 'none']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Обработчик изменения значения 'value' */
        onChange: Type.func,
        /** Обработчик фокуса поля */
        onFocus: Type.func,
        /** Обработчик снятия фокуса c поля */
        onBlur: Type.func,
        /** Обработчик события вставки текста в поле */
        onPaste: Type.func,
        /** Обработчик события изменения высоты компонента со значением параметра "autosize" = true */
        onHeightChange: Type.func
    };

    static defaultProps = {
        width: 'default',
        autocomplete: true,
        disabled: false,
        autosize: true,
        resize: 'none',
        size: 'm'
    };

    state = {
        focused: false,
        value: this.props.defaultValue || ''
    };

    /**
     * @type {HtmlSpanElement}
     */
    root;

    /**
     * @type {HTMLTextareaElement}
     */
    control;

    render(cn) {
        let value = this.props.value !== undefined
            ? this.props.value
            : this.state.value;

        let textareaProps = {
            className: cn('control'),
            ref: (control) => { this.control = control; },
            autoComplete: this.props.autocomplete === false ? 'off' : 'on',
            disabled: this.props.disabled,
            id: this.props.id,
            name: this.props.name,
            value,
            tabIndex: this.props.tabIndex,
            placeholder: this.props.placeholder,
            maxLength: this.props.maxLength,
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onPaste: this.handlePaste
        };
        return (
            <span
                className={ cn({
                    disabled: this.props.disabled,
                    focused: this.state.focused,
                    autosize: this.props.autosize,
                    size: this.props.size,
                    width: this.props.width,
                    resize: this.props.resize,
                    invalid: !!this.props.error,
                    'has-label': !!this.props.label,
                    'has-value': !!this.props.value || !!this.state.value
                }) }
                ref={ (root) => { this.root = root; } }
            >
                <span className={ cn('inner') }>
                    {
                        !!this.props.label &&
                        <span className={ cn('top') }>
                            { this.props.label }
                        </span>
                    }
                    {
                        !this.props.autosize
                        ? <textarea { ...textareaProps } />
                        : <TextareaAutosize
                            { ...textareaProps }
                            onHeightChange={ this.handleHeightChange }
                        />
                    }
                    {
                        (this.props.error || this.props.hint) &&
                        <span className={ cn('sub') }>
                            { this.props.error || this.props.hint }
                        </span>
                    }
                </span>
            </span>
        );
    }

    @autobind
    handleFocus() {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus();
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
    handleChange(event) {
        let value = event.target.value;
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    @autobind
    handlePaste(event) {
        if (this.props.onPaste) {
            this.props.onPaste(event);
        }
    }

    @autobind
    handleHeightChange(height) {
        if (this.props.onHeightChange) {
            this.props.onHeightChange(height);
        }
    }

    /**
     * Устанавливает фокус на поле ввода.
     *
     * @public
     */
    focus() {
        this.control.focus();
    }

    /**
     * Снимает фокус с поля ввода.
     *
     * @public
     */
    blur() {
        if (document.activeElement) {
            document.activeElement.blur();
        }
    }

    /**
     * Скроллит страницу до поля ввода.
     *
     * @public
     */
    scrollTo() {
        let elementRect = this.root.getBoundingClientRect();

        scrollTo({
            targetY: (elementRect.top + window.pageYOffset) - SCROLL_TO_CORRECTION
        });
    }
}

export default Textarea;
