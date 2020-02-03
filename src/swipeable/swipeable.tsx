import React from 'react';

// TODO: функция вызывается на TouchEvent и PointerEvent хотя больше от этого путанницы
// Тут надо отдельно рефачить и типы и имплементацию чтоб ничего не сломать
export const getCoordinates = ({
    touches, changedTouches, clientX, clientY
}: Partial<TouchEvent & PointerEvent>) => (
    (touches && changedTouches)
        ? { clientX: (touches[0] || changedTouches[0]).clientX, clientY: (touches[0] || changedTouches[0]).clientY }
        : { clientX, clientY }
);

export type SwipeableProps = {

    /**
     * Число пикселей, на которое нужно сместиться, чтобы запустить функцию по свайпу
     */
    delta?: number;

    /**
     * Функция запускаемая по свайпу.
     */
    onSwipe: (direction: 'top' | 'right' | 'bottom' |'left') => void;

    /**
     * Дочерний компонент представленный в виде единичного элемента
     * TODO: // тут должны быть такие children что у ниъ есть onMouseDown onTouchStart
     */
    children: any;
};

class Swipeable extends React.PureComponent<SwipeableProps> {

    static defaultProps: Partial<SwipeableProps> = {
        delta: 100
    };

    swipeStartX = 0;
    swipeStartY = 0;
    deltaX = 0;
    deltaY = 0;

    componentWillUnmount() {
        this.removeListeners();
    }

    render() {
        return React.cloneElement(this.props.children, {
            onMouseDown: this.handleMouseDown,
            onTouchStart: this.handleTouchStart
        });
    }

    private handleMouseDown = (event) => {
        if (this.props.children.props.onMouseDown) {
            this.props.children.props.onMouseDown(event);
        }

        this.handleSwipeStart(event);

        document.addEventListener('mouseup', this.handleSwipeEnd);
        document.addEventListener('mouseup', this.removeListeners);
    };

    private handleTouchStart = (event) => {
        if (event.touches && event.touches.length > 1) {
            return;
        }

        if (this.props.children.props.onTouchStart) {
            this.props.children.props.onTouchStart(event);
        }

        this.handleSwipeStart(event);

        document.addEventListener('touchend', this.handleSwipeEnd);
        document.addEventListener('touchend', this.removeListeners);
        document.addEventListener('touchcancel', this.removeListeners);
    };

    private handleSwipeStart = (event) => {
        const { clientX, clientY } = getCoordinates(event);

        this.swipeStartX = clientX;
        this.swipeStartY = clientY;
    };

    private handleSwipeEnd = (event) => {
        const { props: { delta, onSwipe } } = this;
        const { clientX, clientY } = getCoordinates(event);

        this.deltaX = this.swipeStartX - clientX;
        this.deltaY = this.swipeStartY - clientY;

        if (typeof onSwipe === 'function') {
            if (this.deltaX > delta) {
                onSwipe('left');
            } else if (this.deltaX < -delta) {
                onSwipe('right');
            } else if (this.deltaY > delta) {
                onSwipe('top');
            } else if (this.deltaY < -delta) {
                onSwipe('bottom');
            }
        }
    };

    private removeListeners = () => {
        document.removeEventListener('mouseup', this.handleSwipeEnd);
        document.removeEventListener('mouseup', this.removeListeners);
        document.removeEventListener('touchend', this.handleSwipeEnd);
        document.removeEventListener('touchend', this.removeListeners);
        document.removeEventListener('touchcancel', this.removeListeners);
        this.swipeStartX = 0;
        this.swipeStartY = 0;
        this.deltaX = 0;
        this.deltaY = 0;
    };
}

export default Swipeable;
