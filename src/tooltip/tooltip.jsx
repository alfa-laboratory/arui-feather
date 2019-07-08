import React, { Fragment, PureComponent } from 'react';
import Type from 'prop-types';
import autobind from 'core-decorators/lib/autobind';
import cn from '../cn';
import Button from '../button';
import Link from '../link';
import Mq from '../mq';

export const BOTTOM = 'bottom';
export const TOP = 'top';
export const RIGHT = 'right';
export const LEFT = 'left';

export const TO_RIGHT = 'to-right';
export const TO_LEFT = 'to-left';
export const TO_TOP = 'to-top';
export const TO_BOTTOM = 'to-bottom';

export const CLICK = 'click';
export const HOVER = 'hover';

const DIRECTION_OFFSET = 20;
const BEFORE_AFTER_OFFSET = 3;
const BEFORE_WIDTH = 9;
const BORDER = 2;

const defaultSubDirections = {
    [BOTTOM]: TO_LEFT,
    [TOP]: TO_LEFT,
    [RIGHT]: TO_BOTTOM,
    [LEFT]: TO_BOTTOM
};

@cn('tooltip')
class Tooltip extends PureComponent {
    static propTypes = {
        /**
        *   Элемент на который вешается тултип
        */
        children: Type.element.isRequired,
        /**
        *  Содержимое тултипа
        */
        content: Type.element.isRequired,
        /**
        *  Направление выпадания тултипа на дэесктопе
        */
        direction: Type.oneOf([BOTTOM, TOP, RIGHT, LEFT]),
        /**
        *  Второстепенное направлениеи когда контент большой
        */
        subDirection: Type.oneOf([TO_RIGHT, TO_LEFT, TO_TOP, TO_BOTTOM]),
        /**
        *  Событие, по которому срабатывает тултип
        */
        trigger: Type.oneOf([CLICK, HOVER]),
        /**
        *  Имя кнопки на мобильном экране
        */
        mobileButtonText: Type.string,
        /**
        *  Не пересчитывать направление если не влазит
        */
        forceDirection: Type.bool,
        /**
        *  Уникальный ИД компонента
        */
        uniqID: Type.string
    };

    static defaultProps = {
        direction: BOTTOM,
        trigger: CLICK,
        forceDirection: false
    };

    childrenRef = null;

    desktopContentRef = null;

    mobileContentRef = null;

    tooltipRef = null;

    constructor(props) {
        super(props);

        this.state = {
            tooltipClicked: false,
            tooltipHovered: false
        };

        this.uniqID = props.uniqID || `ID-${(`${Math.random() * Date.now()}`).replace(/\./, '-')}`;
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        window.addEventListener('resize', this.handleDirUpdate);
        window.addEventListener('scroll', this.handleDirUpdate);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
        window.removeEventListener('resize', this.handleDirUpdate);
        window.removeEventListener('scroll', this.handleDirUpdate);
    }

    render(cn) {
        const { trigger, children } = this.props;

        return (
            <Fragment>
                <div
                    id={ this.uniqID }
                    className={ cn() }
                    ref={ (ref) => { this.tooltipRef = ref; } }
                >
                    <Link
                        pseudo={ true }
                        className={ cn('children') }
                        onClick={ () => this.toggleClick() }
                        ref={ (ref) => { this.childrenRef = ref; } }
                    >
                        {
                            trigger === HOVER
                                ? (
                                    <span
                                        onMouseEnter={ () => this.toggleHover(true) }
                                        onMouseLeave={ () => this.toggleHover(false) }
                                    >
                                        { children }
                                    </span>
                                )
                                : (<Fragment>{ children }</Fragment>)
                        }
                    </Link>
                    <Fragment>
                        <Mq query='--tablet-s'>
                            { this.renderDesktop(cn) }
                        </Mq>
                        <Mq query='--mobile'>
                            { this.renderMobile(cn) }
                        </Mq>
                    </Fragment>
                </div>
            </Fragment>
        );
    }

    renderDesktop(cn) {
        const {
            content,
            direction: directionFromProps,
            trigger,
            subDirection: subDirectionFromProps,
            forceDirection
        } = this.props;

        const {
            tooltipClicked,
            tooltipHovered,
            subDirection: subDirectionFromState,
            direction: directionFromState
        } = this.state;

        const direction = (
            forceDirection
                ? directionFromProps
                : directionFromState
        );

        const subDirection = (
            forceDirection
                ? subDirectionFromProps
                : subDirectionFromState
        ) || defaultSubDirections[direction];

        const computedStyles = (this.childrenRef && this.desktopContentRef)
            && computePropStyles(
                this.uniqID,
                this.childrenRef.getNode().getBoundingClientRect(),
                this.desktopContentRef.getBoundingClientRect()
            );

        // check correct position
        if (!forceDirection) {
            setTimeout(() => this.handleDirUpdate(true));
        }

        return (
            <div
                className={ cn('content', {
                    desktop: true,
                    direction,
                    trigger,
                    subDirection,
                    clicked: tooltipClicked,
                    hovered: tooltipHovered
                }) }
                ref={ ref => this.handleCreatingDesktopContent(ref) }
            >
                <div className={ cn('content-wrap') }>
                    { content }
                </div>
                { computedStyles }
            </div>
        );
    }

    renderMobile(cn) {
        const {
            content,
            mobileButtonText
        } = this.props;

        const { tooltipClicked } = this.state;
        const dontScrollBody = 'body { overflow: hidden }';

        return (
            <Fragment>
                <Link
                    pseudo={ true }
                    onClick={ () => this.toggleClick() }
                    className={ cn('mobile-overlay', {
                        clicked: tooltipClicked
                    }) }
                />
                <div
                    className={ cn('content', {
                        mobile: true,
                        clicked: tooltipClicked
                    }) }
                    ref={ (ref) => { this.mobileContentRef = ref; } }
                >
                    <div className={ cn('scrollable-mobile-content', { clicked: tooltipClicked }) }>
                        <div className={ cn('scrollable-mobile-content-wrap') }>
                            <div className={ cn('content-wrap') }>
                                { content }
                            </div>
                            <div className={ cn('mobile-button') }>
                                <Button
                                    text={ mobileButtonText }
                                    width='available'
                                    onClick={ () => this.toggleClick() }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {
                    tooltipClicked && <style>{ dontScrollBody }</style>
                }
            </Fragment>
        );
    }

    @autobind
    handleClickOutside({ target }) {
        if (this.tooltipRef && !this.tooltipRef.contains(target)) {
            const { tooltipClicked } = this.state;

            if (tooltipClicked) {
                this.toggleClick();
            }
        }
    }

    // check - param not from scroll or resize event
    @autobind
    handleDirUpdate(check) {
        clearTimeout(this.resetTimer);
        const { tooltipClicked, tooltipHovered } = this.state;

        // reset directions after hide, or scroll or resize event
        if (!check || (!tooltipClicked && !tooltipHovered)) {
            this.resetTimer = setTimeout(() => this.setState({
                subDirection: undefined,
                direction: undefined
            }), 300);

            return;
        }

        clearTimeout(this.resizeTimeout);

        this.resizeTimeout = setTimeout(() => {
            const direction = this.calcDir(this.desktopContentRef);
            const subDirection = this.calcSubDir(this.desktopContentRef, direction);

            this.setState({
                subDirection,
                direction
            });
        }, 300);
    }

    handleCreatingDesktopContent(ref) {
        if (!ref || ref.clientHeight === 0) return;

        this.desktopContentRef = ref;
    }

    calcSubDir(ref, dirFromState) {
        if (!ref || !dirFromState) return '';

        const { subDirection: subDirFromState } = this.state;
        const { direction: dirFromProps, subDirection: subDireFromProps } = this.props;

        const direction = dirFromState || dirFromProps;
        const subDirection = subDirFromState || subDireFromProps;

        switch (direction) {
            case BOTTOM:
            case TOP: {
                const { left, right } = ref.getBoundingClientRect();

                if (left < 0) {
                    return TO_RIGHT;
                }

                if (right > window.innerWidth) {
                    return TO_LEFT;
                }
            }
                break;
            case RIGHT:
            case LEFT: {
                const { top, bottom } = ref.getBoundingClientRect();

                if (top < 0) {
                    return TO_BOTTOM;
                }

                if (bottom > window.innerHeight) {
                    return TO_TOP;
                }
            }
        }

        return subDirection;
    }

    calcDir(ref) {
        if (!ref) return '';

        const { direction: dirFromState } = this.state;
        const { direction: dirFromProps } = this.props;

        const direction = dirFromState || dirFromProps;

        switch (direction) {
            case RIGHT:
            case LEFT: {
                const { left, right } = ref.getBoundingClientRect();

                if (left < 0) {
                    return RIGHT;
                }

                if (right > window.innerWidth) {
                    return LEFT;
                }
            }
                break;
            case BOTTOM:
            case TOP: {
                const { top, bottom } = ref.getBoundingClientRect();

                if (top < 0) {
                    return BOTTOM;
                }

                if (bottom > window.innerHeight) {
                    return TOP;
                }
            }
        }

        return direction;
    }

    toggleClick() {
        const { tooltipClicked } = this.state;

        const direction = this.calcDir(this.desktopContentRef);

        this.setState({
            tooltipClicked: !tooltipClicked,
            subDirection: this.calcSubDir(this.desktopContentRef, direction),
            direction
        });

        if (!tooltipClicked && this.mobileContentRef) {
            this.mobileContentRef.scrollTop = 0;
        }
    }

    toggleHover(tooltipHovered) {
        const direction = this.calcDir(this.desktopContentRef);

        this.setState({
            tooltipHovered,
            subDirection: this.calcSubDir(this.desktopContentRef, direction),
            direction
        });

        if (tooltipHovered && this.mobileContentRef) {
            this.mobileContentRef.scrollTop = 0;
        }
    }
}

function computePropStyles(id, childrenRect, contentRect) {
    const { width: childrenWidth, height: childrenHeight } = childrenRect;
    const { height: contentHeight } = contentRect;


    /* CLASSES */

    const [bottomRightBefore, bottomRightAfter] = aggregateFor(BOTTOM, TO_RIGHT);
    const [bottomLeftBefore, bottomLeftAfter] = aggregateFor(BOTTOM, TO_LEFT);
    const [topRightBefore, topRightAfter] = aggregateFor(TOP, TO_RIGHT);
    const [topLeftBefore, topLeftAfter] = aggregateFor(TOP, TO_LEFT);

    const [rightBottomBefore, rightBottomAfter] = aggregateFor(RIGHT, TO_BOTTOM);
    const [rightTopBefore, rightTopAfter] = aggregateFor(RIGHT, TO_TOP);
    const [leftBottomBefore, leftBottomAfter] = aggregateFor(LEFT, TO_BOTTOM);
    const [leftTopBefore, leftTopAfter] = aggregateFor(LEFT, TO_TOP);

    /* CLASSES */


    /* STYLES */

    /* right content, half arrow, half content, border */
    const topBottomToRightBefore = calcFor('left', childrenWidth / 2);
    /* right content, half arrow, half content, border, after offset */
    const topBottomToRightAfter = calcFor('left', childrenWidth / 2, BEFORE_AFTER_OFFSET);
    /* left content, half arrow, half content, border */
    const topBottomToLeftBefore = calcFor('right', childrenWidth / 2);
    /* left content, half arrow, half content, border, after offset */
    const topBottomToLeftAfter = calcFor('right', childrenWidth / 2, BEFORE_AFTER_OFFSET);

    /* top offset, half arrow, half children, border */
    const rightLeftToBottomBefore = calcFor('top', childrenHeight / 2);
    /* top offset, half arrow, half children, border, after offset */
    const rightLeftToBottomAfter = calcFor('top', childrenHeight / 2, BEFORE_AFTER_OFFSET);
    /* bottom offset, half arrow, half children, border */
    const rightLeftToTopBefore = calcFor('bottom', childrenHeight / 2);
    /* bottom offset, half arrow, half children, border, after offset */
    const rightLeftToTopAfter = calcFor('bottom', childrenHeight / 2, BEFORE_AFTER_OFFSET);

    /* content height, children height, top offset */
    const rightLeftToTop = `top: calc(-${contentHeight}px + ${childrenHeight}px + ${DIRECTION_OFFSET}px);`;

    /* STYLES */

    return (
        <style>
            { `
            #${id} ${bottomRightBefore} {
                ${topBottomToRightBefore}
            }
            #${id} ${bottomRightAfter} {
                ${topBottomToRightAfter}
            }
            #${id} ${bottomLeftBefore} {
                ${topBottomToLeftBefore}
            }
            #${id} ${bottomLeftAfter} {
                ${topBottomToLeftAfter}
            }

            #${id} .tooltip__content_direction_top {
                top: calc(-${contentHeight}px - ${DIRECTION_OFFSET}px); /* content, padding */
            }
            #${id} ${topRightBefore} {
                ${topBottomToRightBefore}
            }
            #${id} ${topRightAfter} {
                ${topBottomToRightAfter}
            }
            #${id} ${topLeftBefore} {
                ${topBottomToLeftBefore}
            }
            #${id} ${topLeftAfter} {
                ${topBottomToLeftAfter}
            }

            #${id} ${rightBottomBefore} {
                ${rightLeftToBottomBefore}
            }
            #${id} ${rightBottomAfter} {
                ${rightLeftToBottomAfter}
            }
            #${id} .tooltip__content_direction_right.tooltip__content_subDirection_to-top {
                ${rightLeftToTop}
            }
            #${id} ${rightTopBefore} {
                ${rightLeftToTopBefore}
            }
            #${id} ${rightTopAfter} {
                ${rightLeftToTopAfter}
            }

            #${id} ${leftBottomBefore} {
                ${rightLeftToBottomBefore}
            }
            #${id} ${leftBottomAfter} {
                ${rightLeftToBottomAfter}
            }
            #${id} .tooltip__content_direction_left.tooltip__content_subDirection_to-top {
                ${rightLeftToTop}
            }
            #${id} ${leftTopBefore} {
                ${rightLeftToTopBefore}
            }
            #${id} ${leftTopAfter} {
                ${rightLeftToTopAfter}
            }
            ` }
        </style>
    );
}

export function combine(arr, base) {
    return arr.reduce((result, item) => `${result}.${base}_${item}`, '');
}

function aggregateFor(dir, subDir) {
    const direction = `direction_${dir}`;
    const subDirection = `subDirection_${subDir}`;

    return [
        combine(
            ['desktop', direction, `${subDirection}::before`],
            'tooltip__content'
        ),
        combine(
            ['desktop', direction, `${subDirection}::after`],
            'tooltip__content'
        )
    ];
}

function calcFor(direction, offset, beforeAfterOffset = 0) {
    return `
        ${direction}:
        calc(${DIRECTION_OFFSET}px - ${BEFORE_WIDTH}px + ${offset}px - ${BORDER}px + ${beforeAfterOffset}px);
    `;
}

export default Tooltip;
