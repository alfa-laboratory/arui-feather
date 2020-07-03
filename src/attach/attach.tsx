/* eslint-disable jsx-a11y/control-has-associated-label */
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
 * @param number Количество
 * @param endingList Варианты слов, например: 'день', 'дня', 'дней'
 */
function getDeclension(number: number, endingList: string[]): string {
    let endingIndex: number;

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
 * @param array1 Первый массив
 * @param array2 Второй массив
 */
function isEqualArray(array1: any[], array2: any[]): boolean {
    if (array1 === array2) {
        return true;
    }

    return array1
        && array2
        && array1.length === array2.length
        && array1.every((item, index) => item === array2[index]);
}

function isEmptyArray(value: any) {
    return Array.isArray(value) && !value.length;
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
     * Число символов, после которого имя файла будет обрезаться
     */
    maxFilenameLength?: number;

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
    onChange?: (value?: any[], event?: React.ChangeEvent<any>) => void;

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

type AttachState = {
    focused: boolean;
    hovered: boolean;
    value: any[];
};

/**
 * Компонент прикрепления файлов.
 */
export class Attach extends React.PureComponent<AttachProps, AttachState> {
    protected cn = createCn('attach');

    static defaultProps: Partial<AttachProps> = {
        buttonContent: 'Выберите файл',
        size: 'm',
        disabled: false,
        multiple: false,
        tabIndex: 0,
        noFileText: 'Нет файла',
    };

    state: AttachState = {
        focused: false,
        hovered: false,
        value: [],
    };

    private input: HTMLInputElement;

    static getDerivedStateFromProps(nextProps: AttachProps, prevState: AttachState) {
        const nextValue = nextProps.value || [];

        if (
            !isEmptyArray(nextValue)
            && !isEqualArray(nextValue as any[], prevState.value)
        ) {
            return {
                value: nextValue,
            };
        }

        return null;
    }

    componentDidUpdate(_: AttachProps, prevState: AttachState) {
        const nextValue = this.props.value || [];

        if (!isEqualArray(nextValue as any[], prevState.value)) {
            this.input.value = '';
        }
    }

    render() {
        return (
            <span
                className={ this.cn({
                    size: this.props.size,
                    disabled: this.props.disabled,
                    hovered: this.state.hovered,
                    focused: this.state.focused,
                }) }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
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
            focused: this.state.focused,
        };

        return (
            <Button
                { ...buttonProps }
                tag="span"
                leftAddons={ (
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
                            type="file"
                            onChange={ this.handleInputChange }
                        />
                    </label>
                ) }
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
                ? this.truncateFilename(files[0].name)
                : (
                    <abbr
                        title={ files.map((file) => file.name).join() }
                    >
                        { files.length }
                        { ' ' }
                        { getDeclension(files.length, MULTIPLE_TEXTS) }
                    </abbr>
                );

            return (
                <span className={ this.cn('file') }>
                    <span className={ this.cn('text') }>
                        { content }
                    </span>
                    <button
                        type="button"
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

    private truncateFilename = (filename: string): string => {
        const { maxFilenameLength } = this.props;

        if (maxFilenameLength && filename.length > maxFilenameLength) {
            const lengthOfPart: number = Math.round(maxFilenameLength / 2) - 1;

            return `${filename.substr(0, lengthOfPart)}…${filename.substr(filename.length - lengthOfPart)}`;
        }

        return filename;
    };

    private handleInputChange = (event) => {
        this.performChange(Array.from(event.target.files), event);
    };

    private handleClearClick = (event) => {
        this.input.value = '';
        this.performChange([], event);
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

    private performChange(value, event) {
        const shouldFireChange = !isEqualArray(value, this.state.value);

        this.setState({ value }, () => {
            if (this.props.onChange && shouldFireChange) {
                this.props.onChange(value.length ? value : null, event);
            }
        });
    }
}

export default withTheme<AttachProps, Attach>(Attach);
