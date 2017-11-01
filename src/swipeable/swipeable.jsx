import React from 'react';
import Type from 'prop-types';

import { autobind } from 'core-decorators';

import performance from '../performance';

export const getCoordinates = ({ touches, clientX, clientY }) => (
    touches
        ? { clientX: touches[0].clientX, clientY: touches[0].clientY }
        : { clientX, clientY }
);

@performance()
export default class Swipeable extends React.Component {
    static propTypes = {
        /** Число пикселей, на которое нужно сместиться, чтобы запустить функцию по свайпу */
        delta: Type.number,
        /** Функция запускаемая по свайпу. Принимает в качестве аргумента направление свайпа ('top', 'right', 'bottom', 'left')  */
        onSwipe: Type.func.isRequired,
        /** Дочерний компонент представленный в виде единичного элемента */
        children: Type.shape({
            props: Type.shape({
                onMouseDown: Type.func,
                onTouchStart: Type.func
            })
        }).isRequired
    };

    static defaultProps = {
        delta: 100
    };

    swipeStartX = 0;
    swipeStartY = 0;
    deltaX = 0;
    deltaY = 0;

    componentWillUnmount() {
        this.handleSwipeEnd();
        this.removeListeners();
    }

    render() {
        return React.cloneElement(this.props.children, {
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleTouchStart
        });
    }

    @autobind
    handleMouseDown(event) {
        if (this.props.children.props.onMouseDown) {
            this.props.children.props.onMouseDown(event);
        }

        this.handleSwipeStart(event);

        document.addEventListener('mousemove', this.handleSwipeMove);
        document.addEventListener('mouseup', this.handleSwipeEnd);
        document.addEventListener('mouseup', this.removeListeners);
    }

    @autobind
    handleTouchStart(event) {
        if (event.touches && event.touches.length > 1) return;

        if (this.props.children.props.onTouchStart) {
            this.props.children.props.onTouchStart(event);
        }

        this.handleSwipeStart(event);

        document.addEventListener('touchmove', this.handleSwipeMove);
        document.addEventListener('touchend', this.handleSwipeEnd);
        document.addEventListener('touchend', this.removeListeners);
        document.addEventListener('touchcancel', this.removeListeners);
    }

    @autobind
    handleSwipeStart(event) {
        const { clientX, clientY } = getCoordinates(event);

        this.swipeStartX = clientX;
        this.swipeStartY = clientY;
    }

    @autobind
    handleSwipeMove(event) {
        const { clientX, clientY } = getCoordinates(event);

        this.deltaX = this.swipeStartX - clientX;
        this.deltaY = this.swipeStartY - clientY;
    }

    @autobind
    handleSwipeEnd() {
        const { deltaX, deltaY, props: { delta, onSwipe } } = this;

        if (typeof onSwipe === 'function') {
            if (deltaX > delta) {
                onSwipe('left');
            } else if (deltaX < -delta) {
                onSwipe('right');
            } else if (deltaY > delta) {
                onSwipe('top');
            } else if (deltaY < -delta) {
                onSwipe('bottom');
            }
        }
    }

    @autobind
    removeListeners() {
        document.removeEventListener('mousemove', this.handleSwipe);
        document.removeEventListener('mouseup', this.handleSwipeEnd);
        document.removeEventListener('mouseup', this.removeListeners);
        document.removeEventListener('touchmove', this.handleSwipe);
        document.removeEventListener('touchend', this.handleSwipeEnd);
        document.removeEventListener('touchend', this.removeListeners);
        document.removeEventListener('touchcancel', this.removeListeners);
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
    }
}
