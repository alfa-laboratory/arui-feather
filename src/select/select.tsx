/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import createFragment from 'react-addons-create-fragment';
import React from 'react';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';

import { Button } from '../button/button';
import IconButton from '../icon-button/icon-button';
import IconArrowDown from '../icon/ui/arrow-down';
import IconArrowUp from '../icon/ui/arrow-up';
import Menu from '../menu/menu';
import Mq from '../mq/mq';
import ThemedPopup from '../popup/popup';
import PopupHeader from '../popup-header/popup-header';
import { ResizeSensor } from '../resize-sensor/resize-sensor';

import { HtmlElement } from '../lib/prop-types';
import keyboardCode from '../lib/keyboard-code';
import performance from '../performance';
import scrollTo from '../lib/scroll-to';
import { SCROLL_TO_CORRECTION, SCROLL_TO_NORMAL_DURATION } from '../vars';

const DEFAULT_TEXT_FALLBACK = 'Выберите:';

/**
 * Элемент кнопки для выпадающего списка.
 */
class NotThemedSelectButton extends Button {
    cn = createCn('select-button');
}

const SelectButton = withTheme(NotThemedSelectButton);

type CheckedOption = {
    /**
     * Уникальное значение, которое будет отправлено на сервер, если вариант выбран
     */
    value: string;
    /**
     * Текст варианта
     */
    text: string;
    /**
     * Текст, который будет отображаться при выборе
     */
    checkedText: string;
    /**
     * Иконка варианта
     */
    icon: React.ReactType;
}

type SelectDirectionsFieldType = 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type SelectOptionsShapeType = {

    /**
     * Тип списка вариантов
     */
    type?: 'item' | 'group';

    /**
     * Уникальное значение, которое будет отправлено на сервер, если вариант выбран
     */
    value?: string | number;

    /**
     * Текст варианта
     */
    text?: React.ReactNode;

    /**
     * Текст варианта для нативного режима
     */
    nativeText?: string;

    /**
     * Отображение варианта
     */
    description?: React.ReactNode;

    /**
     * Текст, который будет отображаться при выборе
     */
    checkedText?: string;

    /**
     * Иконка варианта
     */
    icon?: React.ReactNode;

    /**
     * Список вариантов, только для type='group'
     */
    content?: any[];

    /**
     * Только для type='item': свойства для компонента [MenuItem](#!/MenuItem)
     */
    props?: object;
};

export type SelectProps = {

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Тип выпадающего списка
     */
    mode?: 'check' | 'radio' | 'radio-check';

    /**
     * Размещение заголовка групп: обычное или в одну строку с первым элементом группы
     */
    groupView?: 'default' | 'line';

    /**
     * Тип поля (filled только на белом фоне в размере m)
     */
    view?: 'default' | 'filled';

    /**
     * Управление возможностью компонента занимать всю ширину родителя
     */
    width?: 'default' | 'available';

    /**
     * Направления, в которые может открываться попап компонента
     */
    directions?: Array<SelectDirectionsFieldType>;

    /**
     * Управление возможностью редактирования значения
     */
    disabled?: boolean;

    /**
     * Управление видимостью выпадающего списка
     */
    opened?: boolean;

    /**
     * Ширинa выпадающего списка равна ширине кнопки
     */
    equalPopupWidth?: boolean;

    /**
     * Список выбранных значений
     */
    value?: Array<string | number>;

    /**
     * Список вариантов выбора
     */
    options?: Array<SelectOptionsShapeType>;

    /**
     * Вставляет попап со списком только если элемент активен
     */
    renderPopupOnFocus?: boolean;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Уникальный идентификатор блока
     */
    id?: string;

    /**
     * Уникальное имя блока
     */
    name?: string;

    /**
     * Лейбл для поля
     */
    label?: React.ReactNode;

    /**
     * Подсказка в поле
     */
    placeholder?: string;

    /**
     * Подсказка в качестве неактивного первого варианта выбора для нативного мобильного контрола
     */
    nativeOptionPlaceholder?: string;

    /**
     * Подсказка под полем
     */
    hint?: React.ReactNode;

    /**
     * Отображение ошибки
     */
    error?: React.ReactNode;

    /**
     * Управление нативным режимом на мобильных устройствах
     */
    mobileMenuMode?: 'native' | 'popup';

    /**
     * Подсказка над меню в мобильном режиме
     */
    mobileTitle?: React.ReactNode;

    /**
     * Смещение в пикселях всплывающего окна относительно основного направления (только на десктопе)
     */
    popupMainOffset?: number;

    /**
     * Смещение в пикселях всплывающего окна относительно второстепенного направления (только на десктопе)
     */
    popupSecondaryOffset?: number;

    /**
     * Скрытие галочки в правой части кнопки
     */
    hideTick?: boolean;

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Обработчик фокуса на компоненте
     */
    onFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик потери фокуса компонентом
     */
    onBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик фокуса на кнопке
     */
    onButtonFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик потери у кнопки
     */
    onButtonBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик фокуса на меню
     */
    onMenuFocus?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик потери фокуса у меню
     */
    onMenuBlur?: (event?: React.FocusEvent<any>) => void;

    /**
     * Обработчик клика по кнопке компонента
     */
    onClick?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика вне компонента
     */
    onClickOutside?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик изменения значения
     */
    onChange?: (value?: any[]) => void;

    /**
     * Обработчик нажатия на клавишу
     */
    onKeyDown?: (event?: React.KeyboardEvent<any>) => void;

    /**
     * Кастомный метод рендера содержимого кнопки, принимает на вход: массив элементов типа CheckedOption
     */
    renderButtonContent?: (checkedOptions: CheckedOption[]) => React.ReactNode;

    /**
     * Максимальная высота попапа
     */
    maxHeight?: number;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

type SelectState = {
    hasGroup: boolean;
    isMobile: boolean;
    opened: boolean;
    popupStyles: {
        minWidth?: number;
        maxWidth?: number;
    };
    value: Array<string | number>;
    popupIsReady?: boolean;
}

/**
 * Компонент выпадающего списка.
 */
@performance(true)
export class Select extends React.Component<SelectProps, SelectState> {
    cn = createCn('select');

    static defaultProps: Partial<SelectProps> = {
        mode: 'check',
        groupView: 'default',
        disabled: false,
        size: 'm',
        directions: ['bottom-left', 'bottom-right', 'top-left', 'top-right'],
        view: 'default',
        width: 'default',
        equalPopupWidth: false,
        options: [],
        mobileTitle: DEFAULT_TEXT_FALLBACK,
        nativeOptionPlaceholder: DEFAULT_TEXT_FALLBACK,
        mobileMenuMode: 'native',
        renderPopupOnFocus: false
    };

    static contextTypes: any = {
        positioningContainerElement: HtmlElement
    };

    state: SelectState = {
        hasGroup: false,
        isMobile: false,
        opened: !!this.props.opened,
        popupStyles: {},
        value: this.props.value || []
    };

    root: HTMLDivElement;

    button;

    popup;

    menu;

    nativeSelect: HTMLSelectElement;

    /**
     * При открытом меню, нажатие на Esc устанавливает значение этой переменной в true
     * Далее фокус переводится на кнопку. Далее вызывается обработчик handleMenuBlur.
     * В обработчике закрываем попап, если ожидаем закрытия(this.awaitClosing) или фокус за пределами селекта.
     * Это нужно, т.к. в случае в renderPopupOnFocus={true} меню исчезнет быстрее, чем сработает onMenuBlur
     */
    awaitClosing = false;

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        this.setState({
            hasGroup: this.props.options.some(option => !!(option.type === 'group' && !!option.content))
        });
    }

    componentDidMount() {
        if (this.isAutoSelectRequired()) {
            this.selectFirstOption();
        }

        this.setPopupTarget();
        this.updatePopupStyles();
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setPopupTarget();
        this.updatePopupStyles();

        if (this.state.opened && nextProps.disabled) {
            this.toggleOpened();
        }

        this.setState({
            hasGroup: this.props.options.some(option => !!(option.type === 'group' && !!option.content))
        });
    }

    componentDidUpdate() {
        if (this.state.opened) {
            this.updatePopupStyles();
        }
    }

    render() {
        const value = this.getValue();

        return (
            <div
                className={ this.cn({
                    mode: this.props.mode,
                    size: this.props.size,
                    view: this.props.view,
                    width: this.props.width,
                    checked: value.length > 0,
                    disabled: this.props.disabled,
                    'has-label': !!this.props.label,
                    'has-value': !!value.length,
                    'has-placeholder': !!this.props.placeholder,
                    invalid: !!this.props.error,
                    opened: this.getOpened(),
                    'no-tick': this.props.hideTick
                }) }
                ref={ (root) => {
                    this.root = root;
                } }
                data-test-id={ this.props['data-test-id'] }
            >
                <span className={ this.cn('inner') }>
                    <input id={ this.props.id } name={ this.props.name } type='hidden' value={ value as any /* TODO: разобраться что тут происходит */ } />
                    { !!this.props.label && <span className={ this.cn('top') }>{ this.props.label }</span> }
                    { this.renderButton() }

                    <Mq query='--small-only' touch={ true } onMatchChange={ this.handleMqMatchChange }>
                        { this.props.mobileMenuMode === 'native' && this.renderNativeSelect() }
                    </Mq>

                    { (this.props.error || this.props.hint) && (
                        // The <div /> wrapper is needed to fix Safari bug of "jumping" element with
                        // `display: table-caption`. See: https://github.com/alfa-laboratory/arui-feather/pull/656
                        <div className={ this.cn('sub-wrapper') }>
                            <span className={ this.cn('sub') }>{ this.props.error || this.props.hint }</span>
                        </div>
                    ) }

                    { (!this.state.isMobile || (this.state.isMobile && this.props.mobileMenuMode === 'popup')) &&
                        this.renderPopup() }
                </span>
            </div>
        );
    }

    renderButton() {
        let tickSize;
        let ToggledIcon;
        const opened = this.getOpened();

        switch (opened) {
            case true:
                ToggledIcon = IconArrowUp;
                break;
            case false:
                ToggledIcon = IconArrowDown;
                break;
        }

        switch (this.props.size) {
            case 's':
            case 'm':
                tickSize = this.props.view === 'filled' ? 'l' : 's';
                break;
            case 'l':
                tickSize = 'm';
                break;
            case 'xl':
                tickSize = 'l';
                break;
        }

        return (
            <SelectButton
                ref={ (button) => {
                    this.button = button;
                } }
                size={ this.props.size }
                disabled={ this.props.disabled }
                focused={ this.getOpened() }
                onClick={ this.handleButtonClick }
                onFocus={ this.handleButtonFocus }
                onBlur={ this.handleButtonBlur }
            >
                { this.renderButtonContent() }
                { !this.props.hideTick && (
                    <IconButton className={ this.cn('tick') } key='addon-icon' size={ this.props.size } tag='span'>
                        <ToggledIcon size={ tickSize } />
                    </IconButton>
                ) }

                { this.getOpened() && (
                    <ResizeSensor key='addon-sensor' onResize={ this.updatePopupStyles } />
                ) }
            </SelectButton>
        );
    }

    renderNativeSelect() {
        const isCheckMode = this.props.mode === 'check';
        const hasEmptyOptGroup = isCheckMode || this.state.hasGroup;
        const hasEmptyOption = !isCheckMode && !this.state.hasGroup;
        let value: any = this.getValue();

        if (!isCheckMode) {
            value = value.length ? value[0] : '';
        }

        return (
            <select
                ref={ (nativeSelect) => {
                    this.nativeSelect = nativeSelect;
                } }
                className={ this.cn('native-control') }
                disabled={ this.props.disabled }
                multiple={ isCheckMode && 'multiple' as any }
                value={ value }
                onChange={ this.handleNativeOptionCheck }
                onClick={ this.handleNativeClick }
                onFocus={ this.handleNativeFocus }
                onBlur={ this.handleNativeBlur }
            >
                { /*
                        Хак с пустым <optgroup> — для фикса странного поведения select с атрибутом multiple на iOS7+:
                        1. If no option is selected, it selects the first option in the list.
                        2. If one option is selected, it deselects that option.
                        3. If multiple options are selected, it deselects the last option to be tapped.
                        4. If an option previously selected is deselected, it reselects the option.
                        https://discussions.apple.com/message/23745665
                        https://discussions.apple.com/message/24694954
                    */
                    hasEmptyOptGroup && <optgroup disabled={ true } label={ this.props.nativeOptionPlaceholder } /> }
                { hasEmptyOption && (
                    <option disabled={ true } value=''>
                        { this.props.nativeOptionPlaceholder }
                    </option>
                ) }
                { this.renderNativeOptionsList(this.props.options) }
            </select>
        );
    }

    renderPopup() {
        const optionsList = this.renderOptionsList(this.props.options);
        const opened = this.getOpened();
        const value = this.getValue();
        const { popupIsReady } = this.state;
        const popupIsVisible = this.props.renderPopupOnFocus ? opened && popupIsReady : opened;

        if (!opened && this.props.renderPopupOnFocus) {
            return null;
        }

        return (
            <ThemedPopup
                key='popup'
                ref={ this.setPopupRef }
                for={ this.props.name }
                className={ this.cn('popup') }
                directions={ this.props.directions }
                height='adaptive'
                padded={ false }
                mainOffset={ this.props.popupMainOffset }
                secondaryOffset={ this.props.popupSecondaryOffset }
                size={ this.props.size }
                target={ this.state.isMobile ? 'screen' : 'anchor' }
                header={ this.state.isMobile && this.renderMobileHeader() }
                visible={ popupIsVisible }
                onClickOutside={ this.handleClickOutside }
                minWidth={ this.state.popupStyles.minWidth }
                maxWidth={ this.state.popupStyles.maxWidth }
                maxHeight={ this.props.maxHeight }
            >
                <Menu
                    ref={ this.setMenuRef }
                    className={ this.cn('menu') }
                    size={ this.props.size }
                    disabled={ this.props.disabled }
                    mode={ this.props.mode }
                    groupView={ this.props.groupView }
                    content={ optionsList }
                    onItemCheck={ this.handleOptionCheck }
                    checkedItems={ value }
                    onFocus={ this.handleMenuFocus }
                    onBlur={ this.handleMenuBlur }
                    onHighlightItem={ this.handleMenuHighlightItem }
                    onKeyDown={ this.handleMenuKeyDown }
                />
            </ThemedPopup>
        );
    }

    renderOptionsList(options) {
        return options.map((option) => {
            if (option.type === 'group' && !!option.content) {
                const content = this.renderOptionsList(option.content);

                return {
                    type: 'group',
                    title: option.title,
                    content
                };
            }

            const content = option.description || option.text;

            return {
                props: option.props,
                value: option.value,
                content: createFragment({ icon: option.icon, content })
            };
        });
    }

    renderNativeOptionsList(options) {
        let groupKey = 0;

        return options.map((option) => {
            if (option.type === 'group' && !!option.content) {
                const content = this.renderNativeOptionsList(option.content);

                groupKey += 1;

                return (
                    <optgroup key={ `group_${groupKey}` } label={ option.title }>
                        { content }
                    </optgroup>
                );
            }

            return (
                <option key={ option.value } value={ option.value }>
                    { option.nativeText || option.text }
                </option>
            );
        });
    }

    renderButtonContent() {
        const checkedItems = this.getCheckedItems(this.props.options);

        if (this.props.renderButtonContent) {
            return this.props.renderButtonContent(checkedItems);
        }

        const checkedItemsText = checkedItems.map(item => item.checkedText || item.text).join(', ');

        if (checkedItemsText) {
            return checkedItemsText;
        }

        // Если ничего не выбрано, то рендерим плейсхолдер
        // Если плейсхолдера нет, то рендерим текст лейбла. Но отрендерится он прозрачным - это нужно для того, чтобы
        // лейбл растягивал блок до нужной ширины, т. к. настоящий лейбл позиционируется абсолютно и не влияет на размер
        // Если нет ни плейсхолдера, ни лейбла, то рендерим "Выберите:" для обратной совместимости
        return (
            <span className={ this.cn('placeholder') }>
                { this.props.placeholder || this.props.label || DEFAULT_TEXT_FALLBACK }
            </span>
        );
    }

    renderMobileHeader() {
        return (
            <PopupHeader
                className={ this.cn('mobile-header') }
                size={ this.props.size }
                title={ this.props.mobileTitle }
                onCloserClick={ this.handlePopupCloserClick }
            />
        );
    }

    private handleButtonClick = (event) => {
        if (!this.props.disabled) {
            this.toggleOpened();
        }

        if (this.props.onClick) {
            this.props.onClick(event);
        }
    };
    // TODO: не сипользуется и вроде не публичный!!!!
    handleButtonKeyDown = (event) => {
        if (!this.props.disabled) {
            if (event.which === keyboardCode.ENTER || event.which === keyboardCode.SPACE) {
                this.toggleOpened();
            }
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    private handleButtonFocus = (event) => {
        if (this.props.onButtonFocus) {
            this.props.onButtonFocus(this.getRevisedEvent(event));
        }
    };

    private handleButtonBlur = (event) => {
        if (this.props.onButtonBlur) {
            this.props.onButtonBlur(this.getRevisedEvent(event));
        }
    };

    private handleMenuFocus = (event) => {
        event.target.value = this.getValue();

        if (this.props.onFocus) {
            this.props.onFocus(event);
        }

        if (this.props.onMenuFocus) {
            this.props.onMenuFocus(event);
        }
    };

    private handleMenuBlur = (event) => {
        event.target.value = this.getValue();

        if (this.awaitClosing || event.relatedTarget !== this.button.getNode()) {
            this.awaitClosing = false;
            this.setState({
                opened: false
            });
        }

        if (this.props.onBlur) {
            this.props.onBlur(event);
        }

        if (this.props.onMenuBlur) {
            this.props.onMenuBlur(event);
        }
    };

    private handleMenuHighlightItem = (highlightedItem) => {
        if (!this.getOpened() && highlightedItem && this.popup) {
            this.popup.getInnerNode().scrollTop = 0;
            this.scrollToHighlightedItem(highlightedItem);
        }
    };

    private handleOptionCheck = (value) => {
        const opened = this.getOpened();

        this.setState({ value, opened: this.props.mode === 'check' }, () => {
            // Если у Select-а закрылось выпадающее меню,
            // то возвращаем фокус на кнопку Select
            // после выбора опции.
            const newOpened = this.getOpened();

            if (!newOpened && opened !== newOpened) {
                this.button.focus();
            }
        });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private handleNativeOptionCheck = (event) => {
        function getFlattenedPropOptions(options) {
            let result = [];

            options.forEach((option) => {
                if (option.type === 'group' && !!option.content) {
                    const findInGroup = getFlattenedPropOptions(option.content);

                    result = result.concat(findInGroup);
                } else {
                    result.push(option);
                }
            });

            return result;
        }

        const hasEmptyOption = this.props.mode !== 'check' && !this.state.hasGroup;
        const domOptions = Array.from(event.currentTarget.options).filter(
            (option: any, index) => !(hasEmptyOption && option.disabled && index === 0)
        );
        const flattenedPropOptions = getFlattenedPropOptions(this.props.options);
        const value = domOptions.reduce((result: any[], item: any, index) => {
            if (item.selected) {
                result.push(flattenedPropOptions[index].value);
            }

            return result;
        }, []) as any;

        if (this.props.mode === 'radio' || this.props.mode === 'radio-check') {
            this.blur();
        }

        this.setState({ value });

        if (this.props.onChange) {
            this.props.onChange(value);
        }
    };

    private handleClickOutside = () => {
        this.setState({
            opened: false
        });

        if (this.props.onClickOutside) {
            this.props.onClickOutside();
        }
    };

    private handleMenuKeyDown = (event, highlightedItem) => {
        const opened = this.getOpened();

        switch (event.which) {
            case keyboardCode.DOWN_ARROW:
            case keyboardCode.UP_ARROW:
                event.preventDefault();
                this.scrollToHighlightedItem(highlightedItem);
                break;
            case keyboardCode.ENTER:
            case keyboardCode.SPACE:
                event.preventDefault();
                this.setState({
                    opened: this.props.mode === 'check' ? true : !opened
                });
                this.focusOnMenu();
                break;
            case keyboardCode.ESCAPE:
                event.preventDefault();
                this.awaitClosing = true;
                this.button.focus();
                break;
        }

        if (this.props.onKeyDown) {
            this.props.onKeyDown(event);
        }
    };

    private handleNativeFocus = (event) => {
        if (!this.props.disabled) {
            this.toggleOpened();
        }

        if (this.props.onFocus) {
            this.props.onFocus(this.getRevisedEvent(event));
        }
    };

    private handleNativeBlur = (event) => {
        if (!this.props.disabled) {
            this.toggleOpened();
        }

        if (this.props.onBlur) {
            this.props.onBlur(this.getRevisedEvent(event));
        }
    };

    private handleNativeClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(this.getRevisedEvent(event));
        }
    };

    private handleMqMatchChange = (isMatched) => {
        this.setState(
            {
                isMobile: isMatched
            },
            () => {
                this.setPopupTarget();
                this.updatePopupStyles();
            }
        );
    };

    private handlePopupCloserClick = () => {
        this.setState({
            opened: false
        });
    };

    private setPopupRef = (ref) => {
        this.popup = ref;

        if (this.popup) {
            this.popup.setTarget(this.button.getNode());
        }

        if (this.props.renderPopupOnFocus) {
            const popupIsReady = !!this.popup;

            this.setState({
                popupIsReady
            });

            if (popupIsReady) {
                setTimeout(() => {
                    this.focusOnMenu();
                }, 0);
            }
        }
    };

    private setMenuRef = (menu) => {
        this.menu = menu;
    };

    /**
     * Возвращает корневой `HTMLElement` компонента.
     */
    public getNode() {
        return this.root;
    }

    /**
     * Устанавливает фокус на компонент.
     */
    public focus() {
        if (this.nativeSelect) {
            this.nativeSelect.focus();
        } else {
            this.button.focus();

            this.setState(
                {
                    opened: true
                },
                () => {
                    this.focusOnMenu();
                }
            );
        }
    }

    /**
     * Убирает фокус с компонента.
     */
    // eslint-disable-next-line class-methods-use-this
    public blur() {
        if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
        }
    }

    /**
     * Скроллит страницу до компонента.
     */
    public scrollTo() {
        const elementRect = this.root.getBoundingClientRect();

        scrollTo({
            // eslint-disable-next-line no-mixed-operators
            targetY: elementRect.top + window.pageYOffset - SCROLL_TO_CORRECTION
        });
    }

    public focusOnMenu() {
        if (!this.menu) {
            return;
        }

        if (this.state.isMobile && this.props.mobileMenuMode === 'popup') {
            return;
        }

        const scrollContainer = this.getScrollContainer();

        const posX = scrollContainer.scrollTop;
        const posY = scrollContainer.scrollLeft;

        this.menu.focus();
        scrollContainer.scrollTop = posX;
        scrollContainer.scrollLeft = posY;
    }

    /**
     * @param {MenuItem} highlightedItem Выбранный в текущий момент пункт меню
     */
    private scrollToHighlightedItem(highlightedItem) {
        const element = highlightedItem.getNode();
        const container = this.popup.getInnerNode();
        const correction = element.offsetHeight;

        if (container) {
            if (element.offsetTop + correction > container.scrollTop + container.offsetHeight) {
                scrollTo({
                    container,
                    targetY: element.offsetTop,
                    duration: SCROLL_TO_NORMAL_DURATION
                });
            } else if (element.offsetTop < container.scrollTop) {
                scrollTo({
                    container,
                    // eslint-disable-next-line no-mixed-operators
                    targetY: element.offsetTop - container.offsetHeight + correction,
                    duration: SCROLL_TO_NORMAL_DURATION
                });
            }
        }
    }

    private toggleOpened() {
        const newOpenedState = !this.getOpened();

        this.setState(
            {
                opened: newOpenedState
            },
            () => {
                if (newOpenedState) {
                    this.focusOnMenu();
                }
            }
        );
    }

    private updatePopupStyles = () => {
        const buttonWidth = this.button.getNode().getBoundingClientRect().width;
        const popupStyles: { minWidth; maxWidth?} = { minWidth: buttonWidth };

        if (this.props.equalPopupWidth) {
            popupStyles.maxWidth = buttonWidth;
        }

        this.setState({ popupStyles });
    };

    private setPopupTarget = () => {
        if (this.popup) {
            this.popup.setTarget(this.button.getNode());
        }
    };

    private getCheckedItems(options) {
        const value = this.getValue();
        let result = [];

        options.forEach((option) => {
            if (option.type === 'group' && !!option.content) {
                const findInGroup = this.getCheckedItems(option.content);

                result = result.concat(findInGroup);
            } else if (value.indexOf(option.value) !== -1) {
                result.push(option);
            }
        });

        return result;
    }

    /**
     * @returns {Boolean}
     */
    private getOpened() {
        return this.props.opened === undefined ? this.state.opened : this.props.opened;
    }

    private getRevisedEvent(event) {
        return { ...event, target: { ...event.target, value: this.getValue() } };
    }

    private getValue() {
        return this.props.value || this.state.value;
    }

    getScrollContainer(): HTMLElement {
        return this.context.positioningContainerElement || document.body;
    }

    private isAutoSelectRequired() {
        const { mode, options, renderPopupOnFocus } = this.props;

        return renderPopupOnFocus && mode === 'radio' && options.length > 0 && !this.hasCheckedItems();
    }

    private hasCheckedItems() {
        const { options } = this.props;
        const checkedItems = this.getCheckedItems(options);

        return checkedItems.length > 0;
    }

    private selectFirstOption() {
        const firstOption = this.getFirstOption(this.props.options);

        this.handleOptionCheck([firstOption.value]);
    }

    private getFirstOption(options) {
        const firstOption = options[0];

        if (firstOption.type === 'group') {
            return this.getFirstOption(firstOption.content);
        }

        return firstOption;
    }
}

export default withTheme(Select);
