/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import MaskedInput from '../masked-input/masked-input';
import ResizeSensor from '../resize-sensor/resize-sensor';

import cn from '../cn';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { INPUT_SIZE_CORRECTION_RATIO, SCROLL_TO_CORRECTION } from '../vars';

import './input_mode_link.css';
import './input_theme_alfa-on-color.css';
import './input_theme_alfa-on-white.css';
import './input.css';

/**
 * Компонент текстового поля ввода.
 */
@cn('input', MaskedInput)
@performance()
class Input extends React.Component {
    static propTypes = {
        /**
         * Тип поля.
         * Внимание, тип 'number' не умеет работать с масками, в том числе с 'selectionStart' и 'selectionEnd'.
         * Подробнее: http://w3c.github.io/html/sec-forms.html#does-not-apply
         */
        type: Type.oneOf(['number', 'card', 'email', 'file', 'hidden', 'money', 'password', 'tel', 'text']),
        /** Управление возможностью компонента занимать всю ширину родителя */
        width: Type.oneOf(['default', 'available']),
        /** Управление автозаполнением компонента */
        autocomplete: Type.bool,
        /** Управление возможностью изменения атрибута компонента, установка соответствующего класса-модификатора для оформления */
        disabled: Type.bool,
        /** Управление возможностью изменения атрибута компонента (без установки класса-модификатора для оформления) */
        disabledAttr: Type.bool,
        /** Управление возможностью изменения класса-модификатора компонента */
        focused: Type.bool,
        /** Максимальное число символов */
        maxLength: Type.number,
        /** Иконка компонента */
        icon: Type.node,
        /** Управление наличием крестика, сбрасывающего значение 'value' */
        clear: Type.bool,
        /** Уникальный идентификатор блока */
        id: Type.string,
        /** Уникальное имя блока */
        name: Type.string,
        /** Содержимое поля ввода, указанное по умолчанию */
        value: Type.string,
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Определяет маску для ввода значений. [Шаблон маски](https://github.com/insin/inputmask-core#pattern) */
        mask: Type.string,
        /** Кастомные форматтеры символов маски, использует формат formatCharacters из `inputmask-core` */
        maskFormatCharacters: Type.objectOf(
            Type.shape({
                validate: Type.func.isRequired,
                transform: Type.func
            })
        ),
        /** Стандартное ствойство HTMLInputElement 'pattern'. Может быть использовано для показа корректной клавиатуры на мобильных устройствах. */
        pattern: Type.string,
        /** Управление встроенной проверкой данных введённых пользователем в поле на корректность */
        noValidate: Type.bool,
        /** Добавление дополнительных элементов к инпуту слева */
        leftAddons: Type.node,
        /** Добавление дополнительных элементов к инпуту справа */
        rightAddons: Type.node,
        /** Подсказка в текстовом поле */
        placeholder: Type.string,
        /** Подсказка под полем */
        hint: Type.node,
        /** Отображение ошибки */
        error: Type.node,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Тултип, который появляется при наведении  */
        title: Type.string,
        /** Обработчик изменения значения 'value' */
        onChange: Type.func,
        /** Обработчик фокуса поля */
        onFocus: Type.func,
        /** Обработчик клика по полю */
        onClick: Type.func,
        /** Обработчик снятия фокуса с поля */
        onBlur: Type.func,
        /** Обработчик клика по крестику сбрасываещему значение 'value' */
        onClearClick: Type.func,
        /** Обработчик события нажатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyDown: Type.func,
        /** Обработчик события отжатия на клавишу клавиатуры в момент, когда фокус находится на компоненте */
        onKeyUp: Type.func,
        /** Обработчик события вставки текста в поле */
        onPaste: Type.func,
        /** Обработчик события касания по полю */
        onTouchStart: Type.func,
        /** Обработчик события прекращения касания по полю */
        onTouchEnd: Type.func,
        /** Обработчик события перемещения при касании по полю */
        onTouchMove: Type.func,
        /** Обработчик события прерывания касания по полю */
        onTouchCancel: Type.func,
        /** Обработчик, вызываемый перед началом ввода в маскированное поле */
        onProcessMaskInputEvent: Type.func
    };

    static defaultProps = {
        noValidate: false,
        size: 'm',
        type: 'text'
    };

    state = {
        focused: false,
        subWidth: '100%',
        value: ''
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

    componentDidMount() {
        this.updateSubWidth();
    }

    componentDidUpdate() {
        this.updateSubWidth();
    }

    render(cn, MaskedInput) {
        let hasAddons = !!this.props.rightAddons || !!this.props.leftAddons;

        let content = this.renderContent(cn, MaskedInput);
        if (hasAddons) {
            content = <span className={ cn('addons-layout') }>{ content }</span>;
        }

        let focused = this.getFocused();

        return (
            <span
                className={ cn({
                    type: this.props.type,
                    disabled: this.props.disabled,
                    focused,
                    width: this.props.width,
                    size: this.props.size,
                    'has-icon': !!this.props.icon,
                    'has-clear': !!this.props.clear,
                    'has-addons': hasAddons,
                    invalid: !!this.props.error
                }) }
                ref={ (root) => { this.root = root; } }
            >
                { content }
                {
                    (this.props.error || this.props.hint) &&
                    <span
                        className={ cn('sub') }
                        style={ { maxWidth: this.state.subWidth } }
                    >
                        <ResizeSensor onResize={ this.updateSubWidth } />
                        { this.props.error || this.props.hint }
                    </span>
                }
            </span>
        );
    }

    renderContent(cn, MaskedInput) {
        return ([
            this.props.leftAddons &&
                <span className={ cn('addons', { left: true }) } key='left-addons'>
                    { this.props.leftAddons }
                </span>,
            this.renderInput(cn, MaskedInput),
            this.props.rightAddons &&
                <span className={ cn('addons', { right: true }) } key='right-addons'>
                    { this.props.rightAddons }
                </span>
        ]);
    }

    renderInput(cn, MaskedInput) {
        let isMaskedInput = this.props.mask !== undefined;
        let value = this.props.value !== undefined
            ? this.props.value
            : this.state.value;

        let inputProps = {
            className: cn('control'),
            type: this.props.type,
            noValidate: this.props.noValidate,
            autoComplete: this.props.autocomplete === false ? 'off' : 'on',
            disabled: this.props.disabled || this.props.disabledAttr,
            maxLength: this.props.maxLength,
            id: this.props.id,
            name: this.props.name,
            value,
            tabIndex: this.props.tabIndex,
            placeholder: this.props.placeholder,
            pattern: this.props.pattern,
            ref: (control) => { this.control = control; },
            size: this.getOptimalSize(),
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
                className={ cn('box') }
                key='input-wrapper'
                ref={ (box) => { this.box = box; } }
            >
                {
                    !isMaskedInput
                        ? <input { ...inputProps } />
                        : <MaskedInput
                            { ...inputProps }
                            mask={ this.props.mask }
                            formatCharacters={ this.props.maskFormatCharacters }
                            onProcessInputEvent={ this.props.onProcessMaskInputEvent }
                        />
                }
                {
                    this.props.clear && value &&
                    <button
                        className={ cn('clear') }
                        onClick={ this.handleClearClick }
                    />
                }
                {
                    this.props.icon &&
                    <span className={ cn('icon') }>
                        { this.props.icon }
                    </span>
                }
            </span>
        );
    }

    @autobind
    handleFocus(event) {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    }

    @autobind
    handleClick(event) {
        if (this.props.onClick) {
            this.props.onClick(event);
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
        this.changeValue(event.target.value);
    }

    @autobind
    handleClearClick() {
        this.changeValue('');

        if (this.props.onClearClick) {
            this.props.onClearClick();
        }

        this.focus();
    }

    @autobind
    handleKeyDown(event) {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    }

    @autobind
    handleKeyUp(event) {
        if (this.props.onKeyUp) {
            this.props.onKeyUp(event);
        }
    }

    @autobind
    handlePaste(event) {
        if (this.props.onPaste) {
            this.props.onPaste(event);
        }
    }

    @autobind
    handleTouchStart(event) {
        if (this.props.onTouchStart) {
            this.props.onTouchStart(event);
        }
    }

    @autobind
    handleTouchEnd(event) {
        if (this.props.onTouchEnd) {
            this.props.onTouchEnd(event);
        }
    }

    @autobind
    handleTouchMove(event) {
        if (this.props.onTouchMove) {
            this.props.onTouchMove(event);
        }
    }

    @autobind
    handleTouchCancel(event) {
        if (this.props.onTouchCancel) {
            this.props.onTouchCancel(event);
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
     * Возвращает ссылку на инстанс контейнера для контрола.
     *
     * @public
     * @returns {React.Component}
     */
    getBox() {
        return this.box;
    }

    /**
     * Возвращает ссылку на инстанс контрола.
     * Для полей ввода с маской ссылку на объект `MaskedInput`.
     *
     * @public
     * @returns {React.Component}
     */
    getControl() {
        return this.control;
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
     * Убирает фокус с поля ввода.
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
        scrollTo({
            targetY: (this.root.getBoundingClientRect().top + window.pageYOffset) - SCROLL_TO_CORRECTION
        });
    }

    /**
     * Устанавливает начальное и конечное положение выделения текста в элементе.
     *
     * @public
     * @param {Number} [start=0] Индекс первого выделенного символа.
     * @param {Number} [end=value.length] Индекс символа после последнего выделенного символа.
     */
    setSelectionRange(start = 0, end = this.control.value.length) {
        this.control.setSelectionRange(start, end);
    }

    /**
     * Изменяет текущение значение поля ввода и генерирует событие об этом.
     *
     * @param {String} value Новое значение
     */
    changeValue(value) {
        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    }

    /**
     * Возвращает состояние фокуса.
     *
     * @returns {Boolean}
     */
    getFocused() {
        return this.props.focused !== undefined ? this.props.focused : this.state.focused;
    }

    /**
     * Вычисляет оптимальную длину для атрибута `size` с корректировкой на использование пропорционального шрифта.
     * Для нормализации минимальной ширины поля ввода между браузерами и переопределения установленного
     * по-умолчанию в браузере значения атрибута `size` равному 20.
     * Коэффициент с корректировкой на пропорциональный шрифт необходим для переопределения вычисления браузером
     * итоговой ширины поля на основе значения `size` и ширины глифов моноширинного шрифта.
     * https://www.w3.org/TR/html4/interact/forms.html#adef-size-INPUT
     *
     * @returns {Number}
     */
    getOptimalSize() {
        let { mask, maxLength } = this.props;
        let length = mask !== undefined ? mask.length : maxLength || 1;

        return Math.floor(length * INPUT_SIZE_CORRECTION_RATIO);
    }

    /**
     * Задает максимальную ширину для sub элемента.
     */
    @autobind
    updateSubWidth() {
        if (this.control && this.props.width !== 'available') {
            this.setState({
                subWidth: `${this.control.offsetWidth}px`
            });
        }
    }
}

export default Input;
