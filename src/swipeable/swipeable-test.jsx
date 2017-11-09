import { render, cleanUp } from '../test-utils';

import Swipeable, { getCoordinates } from './swipeable';

describe('swipeable', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        const swipeable = render(
            <Swipeable onSwipe={ () => {} }>
                <button>{ 'I\'m swipeable' }</button>
            </Swipeable>
        ).node;

        expect(swipeable).to.exist;
        expect(swipeable).to.have.text('I\'m swipeable');
    });

    it('should have initial data', () => {
        const swipeable = render(
            <Swipeable onSwipe={ () => {} } delta={ 150 }>
                <button>{ 'I\'m swipeable' }</button>
            </Swipeable>
        ).instance;

        expect(swipeable.props.delta).to.equal(150);
        expect(swipeable.swipeStartX).to.equal(0);
        expect(swipeable.swipeStartY).to.equal(0);
        expect(swipeable.deltaX).to.equal(0);
        expect(swipeable.deltaY).to.equal(0);
    });

    describe('handlers', () => {
        let spyHandler;
        let swipeable;

        beforeEach(() => {
            spyHandler = sinon.spy();
            swipeable = render(
                <Swipeable onSwipe={ () => {} }>
                    <button onMouseDown={ spyHandler } onTouchStart={ spyHandler }>
                        { 'I\'m swipeable' }
                    </button>
                </Swipeable>
            );
        });

        it('should call removeListeners when componentWillUnmount is called', () => {
            swipeable.instance.removeListeners = spyHandler;
            swipeable.instance.componentWillUnmount();
            expect(spyHandler).to.have.callCount(1);
        });

        it('should call handleSwipeStart and child onMouseDown when handleMouseDown is called', () => {
            swipeable.instance.handleSwipeStart = spyHandler;
            swipeable.instance.handleMouseDown({});
            expect(spyHandler).to.have.callCount(2);
        });

        it('should add document and mouseup listeners when handleMouseDown is called', () => {
            swipeable.instance.handleSwipeEnd = spyHandler;
            swipeable.instance.removeListeners = spyHandler;
            swipeable.instance.handleMouseDown({});
            document.dispatchEvent(new Event('mouseup'));
            expect(spyHandler).to.have.callCount(2);
        });

        it('shouldn\'t call handleSwipeStart when handleTouchStart is called with 2 or more touches', () => {
            swipeable.instance.handleSwipeStart = spyHandler;
            swipeable.instance.handleTouchStart({ touches: ['touch1', 'touch2'] });
            expect(spyHandler).to.have.callCount(0);
        });

        it('should call handleSwipeStart and child onTouchStart when handleTouchStart is called', () => {
            swipeable.instance.handleSwipeStart = spyHandler;
            swipeable.instance.handleTouchStart({});
            expect(spyHandler).to.have.callCount(2);
        });

        it('should add document touchend and touchcancel listeners when handleTouchStart is called', () => {
            swipeable.instance.handleSwipeEnd = spyHandler;
            swipeable.instance.removeListeners = spyHandler;
            swipeable.instance.handleTouchStart({});
            document.dispatchEvent(new Event('touchend'));
            document.dispatchEvent(new Event('touchcancel'));
            expect(spyHandler).to.have.callCount(3);
        });

        it('should calculate swipeStartX and swipeStartY when handleSwipeStart is called', () => {
            swipeable.instance.handleSwipeStart({ clientX: 100, clientY: 50 });
            expect(swipeable.instance.swipeStartX).to.equal(100);
            expect(swipeable.instance.swipeStartY).to.equal(50);
        });

        it('should calculate deltaX and deltaY when handleSwipeEnd is called', () => {
            swipeable.instance.handleSwipeEnd({ clientX: 100, clientY: 50 });
            expect(swipeable.instance.deltaX).to.equal(-100);
            expect(swipeable.instance.deltaY).to.equal(-50);
        });
    });

    describe('swipe directions', () => {
        let swipeable;
        const testData = [
            { direction: 'left', clientX: -151, clientY: 0 },
            { direction: 'top', clientX: 0, clientY: -151 },
            { direction: 'right', clientX: 151, clientY: 0 },
            { direction: 'bottom', clientX: 0, clientY: 151 }
        ];

        beforeEach(() => {
            swipeable = render(
                <Swipeable delta={ 150 } onSwipe={ sinon.spy() }>
                    <button>{ 'I\'m swipeable' }</button>
                </Swipeable>
            );
        });

        testData.forEach(({ direction, clientX, clientY }) => (
            it(`should call onSwipe with '${direction}' when it swiped to ${direction}`, () => {
                swipeable.instance.handleSwipeStart({ clientX: 0, clientY: 0 });
                swipeable.instance.handleSwipeEnd({ clientX, clientY });
                expect(swipeable.instance.props.onSwipe).to.have.been.calledWith(direction);
            })
        ));
    });

    describe('getCoordinates', () => {
        const touch = { clientX: 100, clientY: 500 };

        it('should return clientX and clientY from first touch of event touches ', () => {
            expect(getCoordinates({ touches: [touch], changedTouches: [] })).to.deep.equal(touch);
        });

        it('should return clientX and clientY from first touch of event changedTouches', () => {
            expect(getCoordinates({ touches: [], changedTouches: [touch] })).to.deep.equal(touch);
        });

        it('should return clientX and clientY from mouse event', () => {
            expect(getCoordinates(touch)).to.deep.equal(touch);
        });
    });
});
