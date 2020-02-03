/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import Button, { ButtonProps } from '../button/button';
import IconAttachment from '../icon/action/attachment';
import ProgressBar from '../progress-bar';

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

export type AttachProps = {

    /**
     * Содержимое поля ввода, указанное по умолчанию. Принимает массив объектов типа File или null.
     */
    value?: any[];

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Иконка
     */
    icon?: React.ReactNode;

    /**
     * Последовательность перехода между контролами при нажатии на Tab
     */
    tabIndex?: number;

    /**
     * Текст для случая, когда файл не загружен
     */
    noFileText?: string;

    /**
     * Содержимое кнопки для выбора файла
     */
    buttonContent?: React.ReactNode;

    /**
     * Свойства для кнопки
     */
    buttonProps?: ButtonProps;

    /**
     * Доступные для выбора MIME типы файлов
     */
    accept?: string;

    /**
     * Управление возможностью изменения значения компонента
     */
    disabled?: boolean;

    /**
     * Управление возможностью выбора нескольких файлов
     */
    multiple?: boolean;

    /**
     * Процент выполнения загрузки файла
     */
    progressBarPercent?: number;

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
     * Обработчик клика по компоненту кнопки
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик изменения значения 'value'
     */
    onChange?: (value?: any[]) => void;

    /**
     * Обработчик фокуса компонента
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик снятия фокуса компонента
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик события наведения курсора на кнопку
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с кнопки
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;

};

/**
 * Компонент прикрепления файлов.
 */
export class Attach extends React.PureComponent<AttachProps> {
    cn = createCn('attach');

    static defaultProps: Partial<AttachProps> = {
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

    input: HTMLInputElement;

    root: HTMLSpanElement;

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
                            tabIndex={ -1 }
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

    private handleInputChange = (event) => {
        this.performChange(Array.from(event.target.files));
    };

    private handleClearClick = () => {
        this.input.value = '';
        this.performChange([]);
    };

    private handleButtonClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };

    private handleFocus = (event) => {
        this.setState({ focused: true });

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }
    };

    private handleBlur = (event) => {
        this.setState({ focused: false });

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }
    };

    private handleMouseEnter = (event) => {
        this.setState({ hovered: true });

        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    private handleMouseLeave = (event) => {
        this.setState({ hovered: false });

        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    /**
     * Ставит фокус на контрол.
     */
    public focus() {
        this.input.focus();
    }

    /**
     * Убирает фокус с контрола.
     */
    public blur() {
        this.input.blur();
    }

    private performChange(value) {
        const shouldFireChange = !isEqualArray(value, this.state.value);

        this.setState({ value }, () => {
            if (this.props.onChange && shouldFireChange) {
                this.props.onChange(value.length ? value : null);
            }
        });
    }
}

export default withTheme(Attach);
