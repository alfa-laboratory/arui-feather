/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Swipeable, { getCoordinates } from './swipeable';

describe('swipeable', () => {
    it('should render without problems', () => {
        const swipeable = shallow(
            <Swipeable onSwipe={ () => {} }>
                <button>I&apos;m swipeable</button>
            </Swipeable>
        );

        expect(swipeable).toMatchSnapshot();
        expect(swipeable.text()).toContain("I'm swipeable");
    });

    it('should have initial data', () => {
        const swipeable = shallow<Swipeable>(
            <Swipeable onSwipe={ () => {} } delta={ 150 }>
                <button>I&apos;m swipeable</button>
            </Swipeable>
        ).instance();

        expect(swipeable.props.delta).toBe(150);
        expect(swipeable.swipeStartX).toBe(0);
        expect(swipeable.swipeStartY).toBe(0);
        expect(swipeable.deltaX).toBe(0);
        expect(swipeable.deltaY).toBe(0);
    });

    describe('handlers', () => {
        let spyHandler;
        let swipeable;

        beforeEach(() => {
            spyHandler = jest.fn();
            swipeable = shallow(
                <Swipeable onSwipe={ () => {} }>
                    <button onMouseDown={ spyHandler } onTouchStart={ spyHandler }>
                        I&apos;m swipeable
                    </button>
                </Swipeable>
            );
        });

        it('should call removeListeners when componentWillUnmount is called', () => {
            swipeable.instance().removeListeners = spyHandler;
            swipeable.instance().componentWillUnmount();
            expect(spyHandler).toHaveBeenCalledTimes(1);
        });

        it('should call handleSwipeStart and child onMouseDown when handleMouseDown is called', () => {
            swipeable.instance().handleSwipeStart = spyHandler;
            swipeable.instance().handleMouseDown({});
            expect(spyHandler).toHaveBeenCalledTimes(2);
        });

        it('should add document and mouseup listeners when handleMouseDown is called', () => {
            swipeable.instance().handleSwipeEnd = spyHandler;
            swipeable.instance().removeListeners = spyHandler;
            swipeable.instance().handleMouseDown({});
            document.dispatchEvent(new Event('mouseup'));
            expect(spyHandler).toHaveBeenCalledTimes(2);
        });

        it('shouldn\'t call handleSwipeStart when handleTouchStart is called with 2 or more touches', () => {
            swipeable.instance().handleSwipeStart = spyHandler;
            swipeable.instance().handleTouchStart({ touches: ['touch1', 'touch2'] });
            expect(spyHandler).not.toHaveBeenCalled();
        });

        it('should call handleSwipeStart and child onTouchStart when handleTouchStart is called', () => {
            swipeable.instance().handleSwipeStart = spyHandler;
            swipeable.instance().handleTouchStart({});
            expect(spyHandler).toHaveBeenCalledTimes(2);
        });

        it('should add document touchend and touchcancel listeners when handleTouchStart is called', () => {
            swipeable.instance().handleSwipeEnd = spyHandler;
            swipeable.instance().removeListeners = spyHandler;
            swipeable.instance().handleTouchStart({});
            document.dispatchEvent(new Event('touchend'));
            document.dispatchEvent(new Event('touchcancel'));
            expect(spyHandler).toHaveBeenCalledTimes(3);
        });

        it('should calculate swipeStartX and swipeStartY when handleSwipeStart is called', () => {
            swipeable.instance().handleSwipeStart({ clientX: 100, clientY: 50 });
            expect(swipeable.instance().swipeStartX).toBe(100);
            expect(swipeable.instance().swipeStartY).toBe(50);
        });

        it('should calculate deltaX and deltaY when handleSwipeEnd is called', () => {
            swipeable.instance().handleSwipeEnd({ clientX: 100, clientY: 50 });
            expect(swipeable.instance().deltaX).toBe(-100);
            expect(swipeable.instance().deltaY).toBe(-50);
        });
    });

    describe('swipe directions', () => {
        let swipeable;
        let onSwipe;
        const testData = [
            { direction: 'left', clientX: -151, clientY: 0 },
            { direction: 'top', clientX: 0, clientY: -151 },
            { direction: 'right', clientX: 151, clientY: 0 },
            { direction: 'bottom', clientX: 0, clientY: 151 }
        ];

        beforeEach(() => {
            onSwipe = jest.fn();
            swipeable = mount(
                <Swipeable delta={ 150 } onSwipe={ onSwipe }>
                    <button>I&apos;m swipeable</button>
                </Swipeable>
            );
        });

        testData.forEach(({ direction, clientX, clientY }) => (
            it(`should call onSwipe with '${direction}' when it swiped to ${direction}`, () => {
                swipeable.instance().handleSwipeStart({ clientX: 0, clientY: 0 });
                swipeable.instance().handleSwipeEnd({ clientX, clientY });
                expect(onSwipe).toHaveBeenCalledWith(direction);
            })
        ));
    });

    describe('getCoordinates', () => {
        const touch = { clientX: 100, clientY: 500 };

        it('should return clientX and clientY from first touch of event touches ', () => {
            expect(getCoordinates({ touches: [touch] as any, changedTouches: [] as any })).toEqual(touch);
        });

        it('should return clientX and clientY from first touch of event changedTouches', () => {
            expect(getCoordinates({ touches: [] as any, changedTouches: [touch] as any })).toEqual(touch);
        });

        it('should return clientX and clientY from mouse event', () => {
            expect(getCoordinates(touch)).toEqual(touch);
        });
    });
});
