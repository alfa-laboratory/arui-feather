/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import scrollTo from './scroll-to';

function getContainer() {
    return document.getElementById('container');
}

function getScrollContainer() {
    return document.getElementById('scroll-container');
}

function getScrollContainerChild(n: number) {
    return getScrollContainer().children[n] as HTMLElement;
}

describe('scroll-to', () => {
    const originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        const domContainerNode = document.createElement('div');

        domContainerNode.setAttribute('id', 'container');
        domContainerNode.setAttribute('style', 'min-height: 9999px; margin: 0; padding: 0;');
        domContainerNode.innerHTML = `
            <div id='scroll-container' style='overflow: auto; width: 500px; height: 1000px;'>
                <div style='width: 100%; height: 300px;'></div>
                <div style='width: 100%; height: 300px;'></div>
                <div style='width: 100%; height: 300px;'></div>
                <div style='width: 100%; height: 300px;'></div>
                <div style='width: 100%; height: 300px;'></div>
            </div>
        `;
        document.body.appendChild(domContainerNode);

        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        const domContainerNode = getContainer();

        document.body.removeChild(domContainerNode);
        window.scrollTo = originalWindowScrollTo;
    });

    it('should scroll to Y in window', async () => {
        await scrollTo({
            targetY: 100,
            duration: 200
        });
        expect(window.scrollTo).toHaveBeenCalledWith(0, 100);
    });

    it('should scroll to Y in container', async () => {
        const container = getScrollContainer();

        await scrollTo({
            targetY: 100,
            container
        });

        expect(container.scrollTop).toBe(100);
    });

    it('should catch error with incorrect easing', () => {
        const fn = function () {
            scrollTo({
                targetY: 100,
                duration: 200,
                // @ts-ignore
                easing: 'incorrectEase'
            });
        };

        expect(fn).toThrow('Incorrect easing in options');
    });

    it('should catch error with incorrect duration', () => {
        const fn = function () {
            scrollTo({
                targetY: 100,
                duration: -200
            });
        };

        expect(fn).toThrow('Incorrect duration in options');
    });

    it('should scroll down to element in container', async () => {
        const element = getScrollContainerChild(3);
        const container = getScrollContainer();
        const correction = element.offsetHeight;

        if (element.offsetTop + correction > container.scrollTop + container.offsetHeight) {
            await scrollTo({ container, targetY: element.offsetTop });
            expect(container.scrollTop).toBe(500);
        }
    });

    it('should scroll up to element in container', async () => {
        const element = getScrollContainerChild(0);
        const container = getScrollContainer();
        const correction = element.offsetHeight;

        container.scrollTop = 500;

        if (element.offsetTop < container.scrollTop) {
            await scrollTo({ container, targetY: (element.offsetTop - container.offsetHeight) + correction });

            expect(container.scrollTop).toBe(0);
        }
    });
});
