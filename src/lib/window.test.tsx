/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this
* file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { isEventOusideBounds, isNodeOutsideElement, isEventOutsideClientBounds } from './window';

describe('isEventOusideBounds', () => {
    it.each`
      left  | right | top   | bottom | pageX | pageY | isOutside
      ${10} | ${20} | ${10} | ${20}  | ${15} | ${15} | ${false}
      ${10} | ${20} | ${10} | ${20}  | ${20} | ${20} | ${false}
      ${10} | ${20} | ${10} | ${20}  | ${15} | ${25} | ${true}
      ${10} | ${20} | ${10} | ${20}  | ${25} | ${15} | ${true}
      ${10} | ${20} | ${10} | ${20}  | ${5}  | ${15} | ${true}
      ${10} | ${20} | ${10} | ${20}  | ${15} | ${5}  | ${true}
    `(
    'returns $isOutside for the rect ($left, $top, $right, $bottom) and click to ($pageX, $pageY)',
    ({
        left, right, top, bottom, pageX, pageY, isOutside
    }) => {
        const element = document.createElement('div');

        element.getBoundingClientRect = jest.fn().mockReturnValue({
            left, right, top, bottom
        });

        const result = isEventOusideBounds({ pageX, pageY } as any, element);

        expect(result).toBe(isOutside);
    });
});

describe('isEventOutsideClientBounds', () => {
    it.each`
      left  | right | top   | bottom | clientX | clientY | isOutside
      ${10} | ${20} | ${10} | ${20}  | ${15}   | ${15}   | ${false}
      ${10} | ${20} | ${10} | ${20}  | ${20}   | ${20}   | ${false}
      ${10} | ${20} | ${10} | ${20}  | ${15}   | ${25}   | ${true}
      ${10} | ${20} | ${10} | ${20}  | ${25}   | ${15}   | ${true}
      ${10} | ${20} | ${10} | ${20}  | ${5}    | ${15}   | ${true}
      ${10} | ${20} | ${10} | ${20}  | ${15}   | ${5}    | ${true}
    `(
    'returns $isOutside for the rect ($left, $top, $right, $bottom) and click to ($clientX, $clientY)',
    ({
        left, right, top, bottom, clientX, clientY, isOutside
    }) => {
        const event = new MouseEvent('click', { clientX, clientY });
        const element = document.createElement('div');

        element.getBoundingClientRect = jest.fn().mockReturnValue({
            left, right, top, bottom
        });

        const result = isEventOutsideClientBounds(event, element);

        expect(result).toBe(isOutside);
    });
});

describe('isNodeOutsideElement', () => {
    it('should return `false` if node contains element', () => {
        const element = document.createElement('div');
        const node = document.createElement('div');

        element.contains = jest.fn().mockReturnValue(true);

        const result = isNodeOutsideElement(node, element);

        expect(result).toBe(false);
    });

    it('should return `false` if node equals element', () => {
        const element = document.createElement('div');

        element.contains = jest.fn().mockReturnValue(false);

        const result = isNodeOutsideElement(element, element);

        expect(result).toBe(false);
    });

    it('should return `true` if node doesn\'t contains element', () => {
        const element = document.createElement('div');
        const node = document.createElement('div');

        element.contains = jest.fn().mockReturnValue(false);

        const result = isNodeOutsideElement(node, element);

        expect(result).toBe(true);
    });
});
