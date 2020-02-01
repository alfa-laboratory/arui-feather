/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint-disable max-len */

import debounce from 'lodash.debounce';
import React from 'react';
import Type from 'prop-types';
import ReactDOM from 'react-dom';
import { createCn } from 'bem-react-classname';
import { withTheme } from '../cn';
import { ResizeSensor } from '../resize-sensor/resize-sensor';

import { calcBestDrawingParams, calcTargetDimensions, calcFitContainerDimensions } from './calc-drawing-params';
import { HtmlElement } from '../lib/prop-types';
import { isNodeOutsideElement } from '../lib/window';
import performance from '../performance';

// TODO: решить че с этим делать потому что вроде как отдельная структура не нужна
/**
 * @typedef {Object} Point
 * @property {Number} left Координата по оси x
 * @property {Number} top Координата по оси y
 */

/**
 * @typedef {Object} PopupOffsetCollection
 * @property {Number} main Смещение в пикселях всплывающего окна относительно основного направления
 * @property {Number} second Смещение в пикселях всплывающего окна относительно второстепенного направления
 * @property {Number} viewport Минимально допустимое смещение в пикселях всплывающего окна от края окна браузера
 */

/**
 * @typedef {Object} PopupHash
 * @property {Array.<String>} directions Список возмножных расположений попапа
 * @property {String} bestDirection Приоритетное расположение
 * @property {Boolean} isHeightAdaptive Подстраивается ли высота попапа под край окна
 * @property {Boolean} isHeightAvailable Занимает ли попап всю возможную высоту
 * @property {Boolean} isTargetAnchor Привязан ли попап к другому элементу
 * @property {Boolean} isHaveTooltip Имеет ли попап тип "tooltip"
 * @property {Number} width Ширина попапа
 * @property {Number} height Высота попапа
 * @property {Number} contentWidth Ширина контента в попапе
 * @property {Number} contentHeight Высота контента в попапе
 * @property {PopupOffsetCollection} offset Список смещений попапа
 * @property {Point} targetPosition Координаты точки привязки попапа
 * @property {HTMLElement} targetAnchor Объект элемента, к которому привязан попап, в DOM дереве
 */

export type PopupDirectionsFieldType = 'anchor' | 'top-left' | 'top-center' | 'top-right' | 'left-top' | 'left-center' | 'left-bottom' | 'right-top' | 'right-center' | 'right-bottom' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type PopupProps = {

    /**
     * Дополнительный класс
     */
    className?: string;

    /**
     * Идентификатор компонента в DOM
     */
    id?: string;

    /**
     * Дочерние элементы `Popup`
     */
    children?: ReadonlyArray<React.ReactNode> | React.ReactNode;

    /**
     * Тип попапа
     */
    type?: 'default' | 'tooltip';

    /**
     * Подстраивание высоты попапа под край окна ('adaptive'), занятие попапом всей возможной высоты ('available'), 'default'
     */
    height?: 'default' | 'available' | 'adaptive';

    /**
     * Только для target='anchor', расположение (в порядке приоритета) относительно точки открытия. Первым указывается главное направление, через дефис - второстепенное направление
     */
    directions?: ReadonlyArray<PopupDirectionsFieldType>;

    /**
     * Привязка компонента к другому элементу на странице, или его расположение независимо от остальных: 'anchor', 'position', 'screen'
     */
    target?: 'anchor' | 'position' | 'screen';

    /**
     * Только для target='anchor'. Смещение в пикселях всплывающего окна относительно основного направления
     */
    mainOffset?: number;

    /**
     * Только для target='anchor'. Смещение в пикселях всплывающего окна относительно второстепенного направления
     */
    secondaryOffset?: number;

    /**
     * Только для target='anchor'. Минимально допустимое смещение в пикселях всплывающего окна от края его контейнера
     */
    fitContaiterOffset?: number;

    /**
     * Управление видимостью компонента
     */
    visible?: boolean;

    /**
     * Управление выставлением модификатора для добавления внутренних отступов в стилях
     */
    padded?: boolean;

    /**
     * Элемент закреплённого заголовка для компонента
     */
    header?: React.ReactNode;

    /**
     * Размер компонента
     */
    size?: 's' | 'm' | 'l' | 'xl';

    /**
     * Тема компонента
     */
    theme?: 'alfa-on-color' | 'alfa-on-white';

    /**
     * Обработчик события наведения курсора на попап
     */
    onMouseEnter?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик события снятия курсора с попапа
     */
    onMouseLeave?: (event?: React.MouseEvent<any>) => void;

    /**
     * Обработчик клика вне компонента
     */
    onClickOutside?: (event?: React.MouseEvent<any>) => void;

    /**
     * Минимальная ширина попапа
     */
    minWidth?: number;

    /**
     * Максимальная ширина попапа
     */
    maxWidth?: number;

    /**
     * Максимальная высота попапа
     */
    maxHeight?: number;

    /**
     * Указатель на родительский элемент
     */
    for?: string;

    /**
     * Идентификатор для систем автоматизированного тестирования
     */
    'data-test-id'?: string;
};

type PopupState = {
    direction: any;
    hasScrollbar: boolean;
    receivedContainer: boolean;
    styles: React.CSSProperties;
    topGradientStyles: React.CSSProperties;
    bottomGradientStyles: React.CSSProperties;
    canUseDOM: boolean;
    needRedrawAfterMount: boolean;
};

/**
 * Компонент popup'а.
 */
@performance(true)
export class Popup extends React.Component<PopupProps, PopupState> {
    cn = createCn('popup');

    static defaultProps: Partial<PopupProps> = {
        visible: false,
        padded: true,
        secondaryOffset: 0,
        fitContaiterOffset: 0,
        target: 'anchor',
        size: 's'
    };

    // TODO: не типизировал, сделаем потом
    static contextTypes: any = {
        isInCustomContainer: Type.bool,
        renderContainerElement: HtmlElement,
        positioningContainerElement: HtmlElement
    };

    state = {
        direction: null,
        hasScrollbar: false,
        receivedContainer: false,
        styles: {
            top: 0,
            left: 0,
            height: 'auto'
        },
        topGradientStyles: {
            width: '100%'
        },
        bottomGradientStyles: {
            width: '100%'
        },
        canUseDOM: false,
        /*
         * Переменная для отложенного вызова функции redraw(),
         * которая будет вызвана после вызова componentDidMount().
         */
        needRedrawAfterMount: false
    };

    anchor = null;
    clickEventBindTimeout = null;
    domElemPopup = null;
    domElemPopupInner: HTMLElement = null;
    domElemPopupContent = null;
    isWindowClickBinded = false;
    position = null;

    popup;
    inner;
    content;

    private handleWindowResize = debounce(() => {
        if (this.isPropsToPositionCorrect()) {
            this.redraw();
        }
    }, 200);

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillMount() {
        if (
            this.context.isInCustomContainer &&
            this.context.renderContainerElement &&
            this.context.positioningContainerElement
        ) {
            this.setState({
                receivedContainer: true
            });
        }
    }

    componentDidMount() {
        if (this.props.onClickOutside) {
            this.ensureClickEvent();
        }

        if (this.inner && (this.props.height === 'adaptive' || this.props.target === 'screen')) {
            this.setGradientStyles();
        }

        window.addEventListener('resize', this.handleWindowResize);

        /* eslint-disable react/no-did-mount-set-state */
        this.setState(
            {
                canUseDOM: true
            },
            () => {
                if (this.state.needRedrawAfterMount) {
                    this.redraw();
                }
            }
        );
        /* eslint-enable */
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        if (
            !this.state.receivedContainer &&
            nextContext.renderContainerElement &&
            nextContext.positioningContainerElement
        ) {
            this.setState(
                {
                    receivedContainer: true
                },
                () => {
                    if (this.props.visible) {
                        this.redraw();
                    }
                }
            );

            return;
        }

        if (nextProps.visible !== this.props.visible) {
            this.redraw();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.onClickOutside) {
            if (prevProps.onClickOutside !== this.props.onClickOutside) {
                this.ensureClickEvent();
            } else if (prevProps.visible !== this.props.visible) {
                this.ensureClickEvent(!this.props.visible);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.onClickOutside) {
            this.ensureClickEvent(true);
        }

        // Cancel debouncing to avoid `this.setState()` invocation in unmounted component state
        this.handleWindowResize.cancel();
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render() {
        if (!this.state.canUseDOM || !this.isContainerReady()) {
            return null;
        }

        const template = (
            <div
                ref={ (popup) => {
                    this.popup = popup;
                } }
                data-for={ this.props.for }
                className={ this.cn({
                    direction: this.state.direction,
                    type: this.props.target === 'anchor' && this.props.type === 'tooltip' && this.props.type,
                    target: this.props.target,
                    size: this.props.size,
                    visible: this.props.visible,
                    height: this.props.height,
                    padded: this.props.padded,
                    overflow: !!this.props.maxHeight
                }) }
                id={ this.props.id }
                style={ {
                    ...this.state.styles,
                    minWidth: this.getMinWidth(),
                    maxWidth: this.getMaxWidth(),
                    maxHeight: this.getMaxHeight()
                } }
                onMouseEnter={ this.handleMouseEnter }
                onMouseLeave={ this.handleMouseLeave }
                data-test-id={ this.props['data-test-id'] }
            >
                <div className={ this.cn('container') }>
                    { this.props.header && <div className={ this.cn('header') }>{ this.props.header }</div> }
                    <div
                        ref={ (inner) => {
                            this.inner = inner;
                        } }
                        className={ this.cn('inner') }
                        onScroll={ this.handleInnerScroll }
                    >
                        <div
                            className={ this.cn('content') }
                            ref={ (content) => {
                                this.content = content;
                            } }
                        >
                            { this.props.children }
                            <ResizeSensor onResize={ this.handleResize } />
                        </div>
                    </div>
                    { this.state.hasScrollbar && (
                        <div>
                            <div className={ this.cn('gradient', { top: true }) } style={ this.state.topGradientStyles } />
                            <div
                                className={ this.cn('gradient', { bottom: true }) }
                                style={ this.state.bottomGradientStyles }
                            />
                        </div>
                    ) }
                </div>
            </div>
        );

        return ReactDOM.createPortal(template, this.getRenderContainer());
    }

    private handleInnerScroll = (event) => {
        const { scrollTop, offsetHeight, scrollHeight } = event.target;
        const isTopReached = Math.round(scrollTop) === 0;
        const isBottomReached = Math.round(scrollTop) + offsetHeight === scrollHeight;

        if (this.props.height === 'adaptive' || this.props.target === 'screen') {
            const topGradientStyles: {
                width: string;
                height?: number;
            } = {
                width: this.state.topGradientStyles.width
            };
            const bottomGradientStyles: {
                width: string;
                height?: number;
            } = {
                width: this.state.bottomGradientStyles.width
            };

            if (isTopReached) {
                topGradientStyles.height = 0;
            }

            if (isBottomReached) {
                bottomGradientStyles.height = 0;
            }

            this.setState({
                topGradientStyles,
                bottomGradientStyles
            });
        }
    };

    private handleMouseEnter = (event) => {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter(event);
        }
    };

    private handleMouseLeave = (event) => {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave(event);
        }
    };

    private handleWindowClick = (event) => {
        if (this.props.onClickOutside && !!this.domElemPopup && isNodeOutsideElement(event.target, this.domElemPopup)) {
            this.props.onClickOutside(event);
        }
    };

    private handleResize = () => {
        if (!this.props.visible) {
            return;
        }

        this.redraw();
    };

    /**
     * Задает элемент, к которому будет привязан popup.
     * @param target Элемент, к которому будет привязан popup
     */
    public setTarget(target: HTMLElement) {
        if (this.anchor === target) {
            return;
        }

        this.anchor = target;
        this.redraw();
    }

    /**
     * Задает положение popup.
     * @param left x-coordinate
     * @param top y-coordinate
     */
    public setPosition(left: number, top: number) {
        this.position = { left, top };
        this.redraw();
    }

    /**
     * Возвращает внутренний DOM узел.
     */
    public getInnerNode() {
        return this.domElemPopupInner;
    }

    /**
     * Возвращает контейнер, в котором отрендерится попап.
     *
     * @returns {HTMLElement}
     */
    private getRenderContainer() {
        if (!this.context.isInCustomContainer) {
            return document.body;
        }

        return this.context.renderContainerElement;
    }

    /**
     * Возвращает контейнер, внутрь которого надо вписать элемент.
     *
     * @returns {HTMLElement}
     */
    private getPositioningContainer() {
        if (!this.context.isInCustomContainer) {
            return null;
        }

        return this.context.positioningContainerElement;
    }

    /**
     * Возвращает `true`, если контейнер, в котором должен быть отрисован
     * `Popup` уже находится в DOM. Для `Popup` без кастомного контейнера
     * роль контейнера выполняет `document.body` и этот для них этот метод
     * всегда вернете `true`.
     */
    private isContainerReady() {
        if (!this.context.isInCustomContainer) {
            return true;
        }

        return this.context.isInCustomContainer && this.state.receivedContainer;
    }

    /**
     * Возвращает `true`, если все необходимые для расчета положения `Popup`
     * внешние props заданы.
     */
    isPropsToPositionCorrect(): boolean {
        return (
            (this.props.target === 'anchor' && this.anchor) ||
            (this.props.target === 'position' && this.position) ||
            this.props.target === 'screen'
        );
    }

    private redraw = () => {
        /*
         * Если функция redraw() была вызвана до componentDidMount,
         * то нужно отложить её вызов до момента,
         * когда this.state.canUseDOM будет равен значению true.
         *
         * Это сделано для того, чтобы redraw() не вызывалась на серверной стороне.
         */
        this.setState({
            needRedrawAfterMount: true
        });

        if (!this.state.canUseDOM || !this.isContainerReady()) {
            return;
        }

        this.setState({
            needRedrawAfterMount: false
        });

        if (!this.isPropsToPositionCorrect()) {
            throw new Error('Cannot show popup without target or position');
        }

        if (!this.domElemPopup) {
            this.domElemPopup = this.popup;
            this.domElemPopupInner = this.inner;
            this.domElemPopupContent = this.content;
        }

        const popupHash = this.getPopupHash();
        let bestDrawingParams;

        switch (this.props.target) {
            case 'position':
                bestDrawingParams = { top: this.position.top, left: this.position.left };
                break;

            case 'screen':
                bestDrawingParams = {
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    overflow: this.inner.scrollHeight > this.inner.clientHeight
                };
                break;

            case 'anchor':
                bestDrawingParams = calcBestDrawingParams(
                    popupHash,
                    calcTargetDimensions(popupHash),
                    calcFitContainerDimensions(popupHash)
                );
                break;
        }

        this.setState({
            direction: bestDrawingParams.direction,
            hasScrollbar: bestDrawingParams.overflow,
            styles: this.getDrawingCss(bestDrawingParams)
        });

        this.setGradientStyles();
    };

    private ensureClickEvent(isDestroy?) {
        const isNeedBindEvent = isDestroy === undefined ? this.props.visible : !isDestroy;

        // We need timeouts to not to catch the event that causes
        // popup opening (because it propagates to the `window`).
        if (this.clickEventBindTimeout) {
            clearTimeout(this.clickEventBindTimeout);
            this.clickEventBindTimeout = null;
        }

        this.clickEventBindTimeout = setTimeout(() => {
            if (!this.isWindowClickBinded && isNeedBindEvent) {
                window.addEventListener('click', this.handleWindowClick);
                window.addEventListener('touchend', this.handleWindowClick);
                this.isWindowClickBinded = true;
            } else if (this.isWindowClickBinded && !isNeedBindEvent) {
                window.removeEventListener('click', this.handleWindowClick);
                window.removeEventListener('touchend', this.handleWindowClick);
                this.isWindowClickBinded = false;
            }
        }, 0);
    }

    private getDrawingCss(drawingParams) {
        return {
            top: drawingParams.top,
            left: drawingParams.left,
            right: drawingParams.right,
            bottom: drawingParams.bottom,
            height: this.props.height === 'adaptive' ? drawingParams.height : 'auto'
        };
    }

    private getMinWidth() {
        return this.props.minWidth === undefined ? 0 : this.props.minWidth;
    }

    private getMaxWidth() {
        return this.props.maxWidth === undefined ? 'none' : this.props.maxWidth;
    }

    private getMaxHeight() {
        return this.props.maxHeight === undefined ? 'none' : this.props.maxHeight;
    }

    /**
     * Get collection of popup properties.
     *
     */
    private getPopupHash() {
        return {
            directions: this.props.directions,
            bestDirection: this.state.direction,
            isHeightAdaptive: this.props.height === 'adaptive',
            isHeightAvailable: this.props.height === 'available',
            isTargetAnchor: this.props.target === 'anchor',
            isHaveTooltip: this.props.type === 'tooltip',
            width: this.domElemPopup.offsetWidth,
            height: this.domElemPopup.offsetHeight,
            contentWidth: this.domElemPopupContent.offsetWidth,
            contentHeight: this.domElemPopupContent.offsetHeight,
            offset: {
                main: this.props.mainOffset,
                second: this.props.secondaryOffset,
                fitContainer: this.props.fitContaiterOffset
            },
            targetPosition: this.position,
            targetAnchor: this.anchor,
            fitContainer: this.getPositioningContainer()
        };
    }

    private setGradientStyles() {
        const { clientWidth } = this.inner;

        this.setState({
            topGradientStyles: {
                width: clientWidth,
                height: 0
            },
            bottomGradientStyles: {
                width: clientWidth
            }
        });
    }
}

export default withTheme(Popup);
