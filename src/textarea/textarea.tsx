/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

export type TextareaProps = {

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Тип поля (filled только на белом фоне в размере m)
     */
    view?: 'default' | 'filled';

    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Управление автозаполнением компонента
     */
    autocomplete?: boolean;

    /**
     * Управление возможностью изменения значения компонента
     */
    disabled?: boolean;

    /**
     * Управление возможностью подстраивать высоту компонента под высоту текста
     */
    autosize?: boolean;

    /**
     * Максимальное количество отображаемых строк (работает только вместе с autosize)
     */
    maxRows?: number;

    /**
     * Минимальное количество отображаемых строк (работает только вместе c autosize)
     */
    minRows?: number;

    /**
     * Максимальная высота элемента (работает только вместе с autosize)
     */
    maxHeight?: number;

    /**
     * Максимальное число символов
     */
    maxLength?: number;

    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Содержимое поля ввода, указанное по умолчанию (используйте это поле
     * если хотите использовать компонент как uncontrolled)
     */
    defaultValue?: string;

    /**
     * Содержимое поля ввода
     */
    value?: string;

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

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
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Управление возможностью изменения размеров компонента
     */
    resize?: 'both' | 'horizontal' | 'vertical' | 'none';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Обработчик изменения значения 'value'
     */
    onChange?: (value?: string) => void;

    /**
     * Обработчик фокуса поля
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса c поля
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события вставки текста в поле
     */
    onPaste?: (event?: React.ClipboardEvent<any>) => void;

    /**
     * Обработчик события изменения высоты компонента со значением параметра "autosize" = true
     */
    onHeightChange?: (height?: number) => void;

    /**
     * Обработчик события нажатия клавиши при фокусе на поле
     */
    onKeyPress?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Обработчик события keyDown
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

/**
 * Компонент многострочного текстового ввода.
 */
export class Textarea extends React.PureComponent<TextareaProps> {
    cn = createCn('textarea');

    static defaultProps: Partial<TextareaProps> = {
        view: 'default',
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

    render() {
        const value = this.props.value === undefined ? this.state.value : this.props.value;

        const textareaProps = {
            className: this.cn('control'),
            [this.props.autosize ? 'inputRef' : 'ref']: (control) => {
                this.control = control;
            },
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
            onPaste: this.handlePaste,
            onKeyPress: this.handleKeyPress,
            onKeyDown: this.handleKeyDown
        };

        return (
            <span
                className={ this.cn({
                    disabled: this.props.disabled,
                    focused: this.state.focused,
                    autosize: this.props.autosize,
                    size: this.props.size,
                    view: this.props.view,
                    width: this.props.width,
                    resize: this.props.resize,
                    invalid: !!this.props.error,
                    'has-label': !!this.props.label,
                    'has-value': !!value
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
                    {
                        this.props.autosize
                            ? <TextareaAutosize
                                { ...textareaProps }
                                maxRows={ this.props.maxRows }
                                minRows={ this.props.minRows }
                                style={ { maxHeight: this.props.maxHeight } }
                                onHeightChange={ this.handleHeightChange }
                            />
                            : <textarea { ...textareaProps } />
                    }
                    {
                        (this.props.error || this.props.hint) &&
                        <span className={ this.cn('sub') }>
                            { this.props.error || this.props.hint }
                        </span>
                    }
                </span>
            </span>
        );
    }

    private handleFocus = () => {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus();
        }
    };

    private handleBlur = (event) => {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    private handleChange = (event) => {
        const { value } = event.target;

        if (this.props.value === undefined) {
            this.setState({ value });
        }

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private handlePaste = (event) => {
        if (this.props.onPaste) {
            this.props.onPaste(event);
        }
    };

    private handleHeightChange = (height) => {
        if (this.props.onHeightChange) {
            this.props.onHeightChange(height);
        }
    };

    private handleKeyPress = (event) => {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(event);
        }
    };

    private handleKeyDown = (event) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    /**
     * Устанавливает фокус на поле ввода.
     */
    public focus() {
        this.control.focus();
    }

    /**
     * Снимает фокус с поля ввода.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement) {
            (document.activeElement as HTMLElement).blur();
        }
    }

    /**
     * Скроллит страницу до поля ввода.
     */
    public scrollTo() {
        const elementRect = this.root.getBoundingClientRect();

        scrollTo({
            targetY: (elementRect.top + window.pageYOffset) - SCROLL_TO_CORRECTION
        });
    }
}

export default withTheme(Textarea);
