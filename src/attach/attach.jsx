/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import Type from 'prop-types';
import { createCn } from 'bem-react-classname';

import Button from '../button/button';
import IconAttachment from '../icon/action/attachment';
import ProgressBar from '../progress-bar';

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
    let endingIndex;

    number %= 100;

    if (number >= 11 && number <= 19) {
        endingIndex = 2;
    } else {
        switch (number % 10) {
            case 1:
                endingIndex = 0;
                break;
            case 2:
            case 3:
            case 4:
                endingIndex = 1;
                break;
            default:
                endingIndex = 2;
        }
    }

    return endingList[endingIndex];
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

    return array1 &&
        array2 &&
        array1.length === array2.length &&
        array1.every((item, index) => item === array2[index]);
}

/**
 * Компонент прикрепления файлов.
 */
@performance()
class Attach extends React.Component {
    cn = createCn('attach');
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
            view: Type.oneOf(['default', 'action', 'extra']),
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
            className: Type.string,
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
        /** Управление возможностью выбора нескольких файлов */
        multiple: Type.bool,
        /** Процент выполнения загрузки файла */
        progressBarPercent: Type.number,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Дополнительный класс */
        className: Type.string,
        /**
         * Обработчик клика по компоненту кнопки
         * @param {React.MouseEvent} event
         */
        onClick: Type.func,
        /**
         * Обработчик изменения значения 'value'
         * @param {File[]} value
         */
        onChange: Type.func,
        /**
         * Обработчик фокуса компонента
         * @param {React.FocusEvent} event
         */
        onFocus: Type.func,
        /**
         * Обработчик снятия фокуса компонента
         * @param {React.FocusEvent} event
         */
        onBlur: Type.func,
        /**
         * Обработчик события наведения курсора на кнопку
         * @param {React.MouseEvent} event
         */
        onMouseEnter: Type.func,
        /**
         * Обработчик события снятия курсора с кнопки
         * @param {React.MouseEvent} event
         */
        onMouseLeave: Type.func,
        /** Идентификатор для систем автоматизированного тестирования */
        'data-test-id': Type.string
    };

    static defaultProps = {
        buttonContent: 'Выберите файл',
        size: 'm',
        disabled: false,
        multiple: false,
        tabIndex: 0,
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

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        const nextValue = nextProps.value || [];

        if (!isEqualArray(nextValue, this.state.value)) {
            this.input.value = '';
            this.setState({ value: nextValue });
        }
    }

    render() {
        return (
            <span
                className={ this.cn({
                    size: this.props.size,
                    disabled: this.props.disabled,
                    hovered: this.state.hovered,
                    focused: this.state.focused
                }) }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                ref={ (root) => {
                    this.root = root;
                } }
                data-test-id={ this.props['data-test-id'] }
            >
                { this.renderButton() }
                { this.renderStatusText() }
            </span>
        );
    }

    renderButton() {
        const buttonProps = {
            ...this.props.buttonProps,
            className: this.cn('button'),
            disabled: this.props.disabled,
            size: this.props.size,
            icon: this.props.icon ? this.props.icon : <IconAttachment size={ this.props.size } />,
            focused: this.state.focused
        };

        return (
            <Button
                { ...buttonProps }
                tag='span'
                leftAddons={
                    <label
                        className={ this.cn('label') }
                        htmlFor={ this.props.id }
                    >
                        <input
                            ref={ (input) => {
                                this.input = input;
                            } }
                            className={ this.cn('control') }
                            accept={ this.props.accept }
                            disabled={ this.props.disabled }
                            id={ this.props.id }
                            multiple={ this.props.multiple }
                            name={ this.props.name }
                            size={ this.props.size }
                            tabIndex='-1'
                            type='file'
                            onChange={ this.handleInputChange }
                        />
                    </label>
                }
                tabIndex={ this.props.tabIndex }
                onClick={ this.handleButtonClick }
                onFocus={ this.handleFocus }
                onBlur={ this.handleBlur }
            >
                { this.props.buttonContent }
            </Button>
        );
    }

    renderStatusText() {
        const files = this.props.value === undefined ? this.state.value : (this.props.value || []);

        if (files && files.length > 0) {
            const content = (files.length === 1)
                ? files[0].name
                : (
                    <abbr
                        title={ files.map(file => file.name).join() }
                    >
                        { files.length } { getDeclension(files.length, MULTIPLE_TEXTS) }
                    </abbr>
                );

            return (
                <span className={ this.cn('file') }>
                    <span className={ this.cn('text') }>
                        { content }
                    </span>
                    <button
                        type='button'
                        className={ this.cn('clear') }
                        onClick={ this.handleClearClick }
                    />
                    { typeof this.props.progressBarPercent !== 'undefined' && (
                        <ProgressBar
                            percent={ this.props.progressBarPercent }
                            className={ this.cn('progress-bar') }
                        />
                    ) }
                </span>
            );
        }

        return (
            <span className={ this.cn('no-file') }>
                { this.props.noFileText }
            </span>
        );
    }

    handleInputChange = (event) => {
        this.performChange(Array.from(event.target.files));
    };

    handleClearClick = () => {
        this.input.value = '';
        this.performChange([]);
    };

    handleButtonClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    handleFocus = (event) => {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    handleBlur = (event) => {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    handleMouseEnter = (event) => {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    handleMouseLeave = (event) => {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

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
        const shouldFireChange = !isEqualArray(value, this.state.value);

        this.setState({ value }, () => {
            if (this.props.onChange && shouldFireChange) {
                this.props.onChange(value.length ? value : null);
            }
        });
    }
}

export default Attach;
