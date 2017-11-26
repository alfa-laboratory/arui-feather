/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { autobind } from 'core-decorators';
import debounce from 'lodash.debounce';
import React from 'react';
import Type from 'prop-types';

import RenderInContainer from '../render-in-container/render-in-container';
import ResizeSensor from '../resize-sensor/resize-sensor';

import { calcBestDrawingParams, calcTargetDimensions, calcFitContainerDimensions } from './calc-drawing-params';
import cn from '../cn';
import getScrollbarWidth from '../lib/scrollbar-width';
import { HtmlElement } from '../lib/prop-types';
import { isNodeOutsideElement } from '../lib/window';
import performance from '../performance';

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

/**
 * Компонент popup'а.
 */
@cn('popup')
@performance(true)
class Popup extends React.Component {
    static propTypes = {
        /** Дополнительный класс */
        className: Type.string,
        /** Идентификатор компонента в DOM */
        id: Type.string,
        /** Дочерние элементы `Popup` */
        children: Type.oneOfType([Type.arrayOf(Type.node), Type.node]),
        /** Тип попапа */
        type: Type.oneOf(['default', 'tooltip']),
        /** Подстраивание высоты попапа под край окна ('adaptive'), занятие попапом всей возможной высоты ('available'), 'default' */
        height: Type.oneOf(['default', 'available', 'adaptive']),
        /** Только для target='anchor', расположение (в порядке приоритета) относительно точки открытия. Первым указывается главное направление, через дефис - второстепенное направление */
        directions: Type.arrayOf(Type.oneOf([
            'anchor', 'top-left', 'top-center', 'top-right', 'left-top', 'left-center', 'left-bottom', 'right-top',
            'right-center', 'right-bottom', 'bottom-left', 'bottom-center', 'bottom-right'
        ])),
        /** Привязка компонента к другому элементу на странице, или его расположение независимо от остальных: 'anchor', 'position', 'screen' */
        target: Type.oneOf(['anchor', 'position', 'screen']),
        /** Только для target='anchor'. Смещение в пикселях всплывающего окна относительно основного направления */
        mainOffset: Type.number,
        /** Только для target='anchor'. Смещение в пикселях всплывающего окна относительно второстепенного направления */
        secondaryOffset: Type.number,
        /** Только для target='anchor'. Минимально допустимое смещение в пикселях всплывающего окна от края его контейнера */
        fitContaiterOffset: Type.number,
        /** Управление видимостью компонента */
        visible: Type.bool,
        /** Управление возможностью автозакрытия компонента */
        autoclosable: Type.bool,
        /** Управление выставлением модификатора для добавления внутренних отступов в стилях */
        padded: Type.bool,
        /** Элемент закреплённого заголовка для компонента */
        header: Type.node,
        /** Размер компонента */
        size: Type.oneOf(['s', 'm', 'l', 'xl']),
        /** Тема компонента */
        theme: Type.oneOf(['alfa-on-color', 'alfa-on-white']),
        /** Обработчик события наведения курсора на попап */
        onMouseEnter: Type.func,
        /** Обработчик события снятия курсора с попапа */
        onMouseLeave: Type.func,
        /** Обработчик клика вне компонента */
        onClickOutside: Type.func,
        /** Минимальная ширина попапа */
        minWidth: Type.number,
        /** Максимальная ширина попапа */
        maxWidth: Type.number,
        /** Указатель на родительский элемент */
        for: Type.string
    };

    static defaultProps = {
        visible: false,
        autoclosable: false,
        padded: true,
        secondaryOffset: 0,
        fitContaiterOffset: 0,
        target: 'anchor',
        size: 's'
    };

    static contextTypes = {
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
        gradientStyles: {
            right: 0
        }
    };

    anchor = null;
    clickEventBindTimeout = null;
    domElemPopup = null;
    domElemPopupInner = null;
    domElemPopupContent = null;
    isWindowClickBinded = false;
    position = null;

    popup;
    inner;
    content;

    handleWindowResize = debounce(() => {
        if (this.isPropsToPositionCorrect()) {
            this.redraw();
        }
    }, 200);

    componentWillMount() {
        if (this.context.isInCustomContainer
            && this.context.renderContainerElement
            && this.context.positioningContainerElement) {
            this.setState({
                receivedContainer: true
            });
        }
    }

    componentDidMount() {
        if (this.props.autoclosable) {
            this.ensureClickEvent();
        }

        if (this.props.height === 'adaptive' || this.props.target === 'screen') {
            this.setGradientStyles();
        }

        window.addEventListener('resize', this.handleWindowResize);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (!this.state.receivedContainer
            && nextContext.renderContainerElement
            && nextContext.positioningContainerElement) {
            this.setState({
                receivedContainer: true
            }, () => {
                if (this.props.visible) {
                    this.redraw();
                }
            });

            return;
        }

        if (nextProps.visible !== this.props.visible) {
            this.redraw();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.autoclosable) {
            if (prevProps.onClickOutside !== this.props.onClickOutside) {
                this.ensureClickEvent();
            } else if (prevProps.visible !== this.props.visible) {
                this.ensureClickEvent(!this.props.visible);
            }
        }
    }

    componentWillUnmount() {
        if (this.props.autoclosable) {
            this.ensureClickEvent(true);
        }

        // Cancel debouncing to avoid `this.setState()` invocation in unmounted component state
        this.handleWindowResize.cancel();
        window.removeEventListener('resize', this.handleWindowResize);
    }

    render(cn) {
        if (!this.isContainerReady()) {
            return false;
        }

        return (
            <RenderInContainer container={ this.getRenderContainer() }>
                <div
                    ref={ (popup) => { this.popup = popup; } }
                    data-for={ this.props.for }
                    className={ cn({
                        direction: this.state.direction,
                        type: (this.props.target === 'anchor') && (this.props.type === 'tooltip') && this.props.type,
                        target: this.props.target,
                        size: this.props.size,
                        visible: this.props.visible,
                        height: this.props.height,
                        autoclosable: this.props.autoclosable,
                        padded: this.props.padded
                    }) }
                    id={ this.props.id }
                    style={ {
                        ...this.state.styles,
                        minWidth: this.getMinWidth(),
                        maxWidth: this.getMaxWidth()
                    } }
                    onMouseEnter={ this.handleMouseEnter }
                    onMouseLeave={ this.handleMouseLeave }
                >
                    <div className={ cn('container') }>
                        {
                            this.props.header && (
                                <div className={ cn('header') }>
                                    { this.props.header }
                                </div>
                            )
                        }
                        <div
                            ref={ (inner) => { this.inner = inner; } }
                            className={ cn('inner') }
                            onScroll={ this.handleInnerScroll }
                        >
                            <div className={ cn('content') } ref={ (content) => { this.content = content; } }>
                                { this.props.children }
                                <ResizeSensor onResize={ this.handleResize } />
                            </div>
                        </div>
                        {
                            this.state.hasScrollbar && (
                                <div className={ cn('gradient') } style={ this.state.gradientStyles } />
                            )
                        }
                    </div>
                </div>
            </RenderInContainer>
        );
    }

    @autobind
    handleInnerScroll(event) {
        let { scrollTop, offsetHeight, scrollHeight } = event.target;
        let isBottomReached = Math.round(scrollTop) + offsetHeight === scrollHeight;

        if (this.props.height === 'adaptive' || this.props.target === 'screen') {
            let gradientStyles = {
                right: this.state.gradientStyles.right
            };

            if (isBottomReached) {
                gradientStyles.height = 0;
            }

            this.setState({
                gradientStyles
            });
        }
    }

    @autobind
    handleMouseEnter() {
        if (this.props.onMouseEnter) {
            this.props.onMouseEnter();
        }
    }

    @autobind
    handleMouseLeave() {
        if (this.props.onMouseLeave) {
            this.props.onMouseLeave();
        }
    }

    @autobind
    handleWindowClick(event) {
        if (this.props.autoclosable && !!this.domElemPopup && isNodeOutsideElement(event.target, this.domElemPopup)) {
            if (this.props.onClickOutside) {
                this.props.onClickOutside(event);
            }
        }
    }

    @autobind
    handleResize() {
        if (!this.props.visible) {
            return;
        }

        this.redraw();
    }

    /**
     * Задает элемент, к которому будет привязан popup.
     *
     * @public
     * @param {HTMLElement} target Элемент, к которому будет привязан popup
     */
    setTarget(target) {
        if (this.anchor === target) {
            return;
        }

        this.anchor = target;
        this.redraw();
    }

    /**
     * Задает положение popup.
     *
     * @public
     * @param {Number} left x-coordinate
     * @param {Number} top y-coordinate
     */
    setPosition(left, top) {
        this.position = { left, top };
        this.redraw();
    }

    /**
     * Возвращает внутренний DOM узел.
     *
     * @public
     * @returns {HTMLElement}
     */
    getInnerNode() {
        return this.domElemPopupInner;
    }

    /**
     * Возвращает контейнер, в котором отрендерится попап.
     *
     * @returns {HTMLElement}
     */
    getRenderContainer() {
        if (!this.context.isInCustomContainer) {
            return null;
        }

        return this.context.renderContainerElement;
    }

    /**
     * Возвращает контейнер, внутрь которого надо вписать элемент.
     *
     * @returns {HTMLElement}
     */
    getPositioningContainer() {
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
     *
     * @returns {Boolean}
     */
    isContainerReady() {
        if (!this.context.isInCustomContainer) {
            return true;
        }

        return (
            this.context.isInCustomContainer && this.state.receivedContainer
        );
    }

    /**
     * Возвращает `true`, если все необходимые для расчета положения `Popup`
     * внешние props заданы.
     *
     * @returns {Boolean}
     */
    isPropsToPositionCorrect() {
        return (this.props.target === 'anchor' && this.anchor)
            || (this.props.target === 'position' && this.position)
            || (this.props.target === 'screen');
    }

    @autobind
    redraw() {
        if (!this.isContainerReady()) {
            return;
        }

        if (!this.isPropsToPositionCorrect()) {
            throw new Error('Cannot show popup without target or position');
        }

        if (!this.domElemPopup) {
            this.domElemPopup = this.popup;
            this.domElemPopupInner = this.inner;
            this.domElemPopupContent = this.content;
        }

        let popupHash = this.getPopupHash();
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
    }

    ensureClickEvent(isDestroy) {
        let isNeedBindEvent = isDestroy !== undefined ? !isDestroy : this.props.visible;

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

    getDrawingCss(drawingParams) {
        return {
            top: drawingParams.top,
            left: drawingParams.left,
            right: drawingParams.right,
            bottom: drawingParams.bottom,
            height: this.props.height === 'adaptive' ? drawingParams.height : 'auto'
        };
    }

    /**
     * @returns {Number}
     */
    getMinWidth() {
        return this.props.minWidth !== undefined ? this.props.minWidth : 0;
    }

    /**
     * @returns {Number}
     */
    getMaxWidth() {
        return this.props.maxWidth !== undefined ? this.props.maxWidth : 'none';
    }

    /**
     * Get collection of popup properties.
     *
     * @returns {PopupHash}
     */
    getPopupHash() {
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

    setGradientStyles() {
        this.setState({
            gradientStyles: {
                right: getScrollbarWidth()
            }
        });
    }
}

export default Popup;
