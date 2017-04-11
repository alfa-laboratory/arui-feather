/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Type from 'prop-types';

import Popup from '../popup/popup';

import cn from '../cn';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION } from '../vars';

import './textarea.css';
import './textarea_theme_alfa-on-color.css';
import './textarea_theme_alfa-on-white.css';

/**
 * Компонент многострочного текстового ввода.
 */
@cn('textarea', Popup)
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
        /** Содержимое поля ввода, указанное по умолчанию */
        value: Type.string,
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Подсказка */
        placeholder: Type.string,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Управление возможностью изменения размеров компонента */
        resize: Type.oneOf(['both', 'horizontal', 'vertical', 'none']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Рисует попап с ошибкой в момент когда фокус находится в поле ввода */
        error: Type.node,
        /** Расположение попапа с ошибкой (в порядке приоритета) относительно точки открытия */
        errorDirections: Type.arrayOf(Type.string),
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
        autosize: false,
        size: 'm',
        errorDirections: ['right-top', 'right-center', 'right-bottom', 'bottom-left']
    };

    state = {
        focused: false,
        value: ''
    };

    /**
     * @type {HtmlSpanElement}
     */
    root;

    /**
     * @type {HTMLTextareaElement}
     */
    control;

    /**
     * @type {Popup}
     */
    errorPopup;

    componentDidMount() {
        this.ensureErrorPopupTarget();
    }

    componentDidUpdate() {
        this.ensureErrorPopupTarget();
    }

    render(cn, Popup) {
        let value = this.props.value !== undefined
            ? this.props.value
            : this.state.value;

        let textareaProps = {
            className: cn({
                disabled: this.props.disabled,
                focused: this.state.focused,
                autosize: this.props.autosize,
                size: this.props.size,
                width: this.props.width,
                resize: this.props.resize,
                invalid: !!this.props.error
            }),
            autoComplete: this.props.autocomplete === false ? 'off' : 'on',
            disabled: this.props.disabled,
            id: this.props.id,
            name: this.props.name,
            value,
            tabIndex: this.props.tabIndex,
            placeholder: this.props.placeholder,
            maxLength: this.props.maxLength,
            ref: (control) => { this.control = control; },
            onChange: this.handleChange,
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onPaste: this.handlePaste
        };
        return (
            <span ref={ (root) => { this.root = root; } }>
                { !this.props.autosize
                    ? <textarea { ...textareaProps } />
                    : <TextareaAutosize
                        { ...textareaProps }
                        onHeightChange={ this.handleHeightChange }
                    />
                }
                { this.props.error && this.state.focused
                    && <Popup
                        directions={ this.props.errorDirections }
                        ref={ (errorPopup) => { this.errorPopup = errorPopup; } }
                        size={ this.props.size }
                        type='tooltip'
                        mainOffset={ 13 }
                        visible={ true }
                        invalid={ true }
                    >
                        { this.props.error }
                    </Popup>
                }
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

    ensureErrorPopupTarget() {
        if (this.props.error && this.state.focused) {
            this.errorPopup.setTarget(this.root);
        }
    }
}

export default Textarea;
