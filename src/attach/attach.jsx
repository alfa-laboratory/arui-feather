/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import React from 'react';
import Type from 'prop-types';

import Button from '../button/button';
import Icon from '../icon/icon';

import cn from '../cn';
import performance from '../performance';

const MULTIPLE_TEXTS = ['файл', 'файла', 'файлов'];

/**
 * Возвращает слово в нужном склонении.
 *
 * @param {Number} number Количество
 * @param {Array.<String>} endingList Варианты слов, например: 'день', 'дня', 'дней'
 * @returns {String}
 */
function getDeclension(number, endingList) {
    let ending;

    number %= 100;
    if (number >= 11 && number <= 19) {
        ending = endingList[2];
    } else {
        switch (number % 10) {
            case 1:
                ending = endingList[0];
                break;
            case 2:
            case 3:
            case 4:
                ending = endingList[1];
                break;
            default:
                ending = endingList[2];
        }
    }

    return ending;
}

/**
 * Производит поэлементное сравнение массивов.
 *
 * @param {Array} array1 Первый массив
 * @param {Array} array2 Второй массив
 * @returns {Boolean}
 */
function isEqualArray(array1, array2) {
    if (array1 === array2) {
        return true;
    }

    return array1
        && array2
        && array1.length === array2.length
        && array1.every((item, index) => item === array2[index]);
}

/**
 * Компонент прикрепления файлов
 */
@cn('attach')
@performance()
class Attach extends React.Component {
    static propTypes = {
        /** Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null. */
        value: Type.array, // eslint-disable-line react/forbid-prop-types
        /** Уникальное имя блока */
        name: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Иконка */
        icon: Type.node,
        /** Последовательность перехода между контролами при нажатии на Tab */
        tabIndex: Type.number,
        /** Текст для случая, когда файл не загружен */
        noFileText: Type.string,
        /** Содержимое кнопки для выбора файла */
        buttonContent: Type.node,
        /** Свойства для кнопки */
        buttonProps: Type.shape({
            text: Type.node,
            rightAddons: Type.node,
            leftAddons: Type.node,
            view: Type.oneOf(['default', 'action', 'extra', 'other']),
            type: Type.oneOf(['button', 'reset', 'submit']),
            tag: Type.oneOf(['button', 'span']),
            width: Type.oneOf(['default', 'available']),
            size: Type.oneOf(['s', 'm', 'l', 'xl']),
            disabled: Type.bool,
            pseudo: Type.bool,
            id: Type.string,
            name: Type.string,
            title: Type.string,
            tabIndex: Type.number,
            togglable: Type.oneOf(['check', 'radio']),
            checked: Type.bool,
            theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
            className: Type.oneOfType([Type.func, Type.string]),
            onClick: Type.func,
            onFocus: Type.func,
            onBlur: Type.func,
            onMouseEnter: Type.func,
            onMouseLeave: Type.func,
            onMouseDown: Type.func,
            onMouseUp: Type.func,
            onKeyDown: Type.func,
            onKeyUp: Type.func
        }),
        /** Доступные для выбора MIME типы файлов */
        accept: Type.string,
        /** Управление возможностью изменения значения компонента */
        disabled: Type.bool,
        /** Управляет возможностью выбора нескольких файлов */
        multiple: Type.bool,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.oneOfType([Type.func, Type.string]),
        /** Обработчик клика по компоненту кнопки */
        onClick: Type.func,
        /** Обработчик изменения значения 'value' */
        onChange: Type.func,
        /** Обработчик фокуса компонента */
        onFocus: Type.func,
        /** Обработчик снятия фокуса компонента */
        onBlur: Type.func,
        /** Обработчик события наведения курсора на кнопку */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с кнопки */
        onMouseLeave: Type.func
    };

    static defaultProps = {
        buttonContent: 'Выберите файл',
        size: 'm',
        disabled: false,
        multiple: false,
        noFileText: 'Нет файла'
    };

    state = {
        focused: false,
        hovered: false,
        value: []
    };

    /**
     * @type {HTMLInputElement}
     */
    input;

    componentWillReceiveProps(nextProps) {
        let nextValue = nextProps.value || [];

        if (!isEqualArray(nextValue, this.state.value)) {
            this.input.value = '';
            this.setState({ value: nextValue });
        }
    }

    render(cn) {
        return (
            <span
                className={ cn({
                    size: this.props.size,
                    disabled: this.props.disabled,
                    hovered: this.state.hovered,
                    focused: this.state.focused
                }) }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                ref={ (root) => { this.root = root; } }
            >
                { this.renderButton(cn) }
                { this.renderStatusText(cn) }
            </span>
        );
    }

    renderButton(cn) {
        let buttonProps = {
            ...this.props.buttonProps,
            className: cn('button'),
            disabled: this.props.disabled,
            size: this.props.size,
            icon: this.props.icon ? this.props.icon : <Icon size={ this.props.size } name='attachment' />,
            focused: this.state.focused
        };

        return (
            <Button
                { ...buttonProps }
                tag='span'
                leftAddons={
                    <label
                        className={ cn('label') }
                        htmlFor={ this.props.id }
                    >
                        <input
                            ref={ (input) => { this.input = input; } }
                            name={ this.props.name }
                            id={ this.props.id }
                            tabIndex={ this.props.tabIndex }
                            className={ cn('control') }
                            size={ this.props.size }
                            type='file'
                            multiple={ this.props.multiple }
                            disabled={ this.props.disabled }
                            onChange={ this.handleInputChange }
                            onFocus={ this.handleFocus }
                            onBlur={ this.handleBlur }
                            accept={ this.props.accept }
                        />
                    </label>
                }
                onClick={ this.handleButtonClick }
            >
                { this.props.buttonContent }
            </Button>
        );
    }

    renderStatusText(cn) {
        let files = this.props.value !== undefined
            ? this.props.value || []
            : this.state.value;

        if (files && files.length > 0) {
            let content = (files.length === 1)
                ? files[0].name
                : (
                    <abbr
                        title={ files.map(file => file.name).join() }
                    >
                        { files.length } { getDeclension(files.length, MULTIPLE_TEXTS) }
                    </abbr>
                );

            return (
                <div className={ cn('file') }>
                    <span className={ cn('text') }>
                        { content }
                    </span>
                    <button
                        type='button'
                        className={ cn('clear') }
                        onClick={ this.handleClearClick }
                    />
                </div>
            );
        }

        return (
            <div className={ cn('no-file') }>
                { this.props.noFileText }
            </div>
        );
    }

    @autobind
    handleInputChange(event) {
        this.performChange(Array.from(event.target.files));
    }

    @autobind
    handleClearClick() {
        this.input.value = '';
        this.performChange([]);
    }

    @autobind
    handleButtonClick() {
        if (this.props.onClick) {
            this.props.onClick();
        }
    }

    @autobind
    handleFocus() {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus();
        }
    }

    @autobind
    handleBlur() {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur();
        }
    }

    @autobind
    handleMouseEnter() {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter();
        }
    }

    @autobind
    handleMouseLeave() {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave();
        }
    }

    /**
     * Ставит фокус на контрол.
     *
     * @public
     */
    focus() {
        this.input.focus();
    }

    /**
     * Убирает фокус с контрола.
     *
     * @public
     */
    blur() {
        this.input.blur();
    }

    performChange(value) {
        let shouldFireChange = !isEqualArray(value, this.state.value);

        this.setState({ value }, () => {
            if (this.props.onChange && shouldFireChange) {
                this.props.onChange(value.length ? value : null);
            }
        });
    }
}

export default Attach;
