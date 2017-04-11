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

function getScrollContainerChild(n) {
    return getScrollContainer().children[n];
}

describe('scroll-to', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        let domContainerNode = document.createElement('div');
        domContainerNode.setAttribute('id', 'container');
        domContainerNode.setAttribute('style', 'min-width: 9999px; min-height: 9999px; margin: 0; padding: 0;');
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

        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        let domContainerNode = getContainer();
        document.body.removeChild(domContainerNode);
        window.scrollTo = originalWindowScrollTo;
    });

    it('should scroll to Y in window', (done) => {
        scrollTo({
            targetY: 100,
            duration: 200
        }).then(() => {
            expect(window.scrollTo).to.have.been.called.with(0, 100);
            done();
        }).catch(done);
    });

    it('should scroll to Y in container', (done) => {
        let container = getScrollContainer();

        scrollTo({
            targetY: 100,
            container
        }).then(() => {
            expect(container.scrollTop).to.be.equal(100);
            done();
        }).catch(done);
    });

    it('should catch error with incorrect easing', () => {
        let fn = function () {
            scrollTo({
                targetY: 100,
                duration: 200,
                easing: 'incorrectEase'
            });
        };

        expect(fn).to.throw('Incorrect easing in options');
    });

    it('should catch error with incorrect duration', () => {
        let fn = function () {
            scrollTo({
                targetY: 100,
                duration: -200
            });
        };

        expect(fn).to.throw('Incorrect duration in options');
    });

    it('should scroll down to element in container', (done) => {
        let element = getScrollContainerChild(3);
        let container = getScrollContainer();
        let correction = element.offsetHeight;

        if (element.offsetTop + correction > container.scrollTop + container.offsetHeight) {
            scrollTo({ container, targetY: element.offsetTop })
                .then(() => {
                    expect(container.scrollTop).to.be.equal(500);
                    done();
                })
                .catch(done);
        }
    });

    it('should scroll up to element in container', (done) => {
        let element = getScrollContainerChild(0);
        let container = getScrollContainer();
        let correction = element.offsetHeight;

        container.scrollTop = 500;

        if (element.offsetTop < container.scrollTop) {
            scrollTo({ container, targetY: (element.offsetTop - container.offsetHeight) + correction })
                .then(() => {
                    expect(container.scrollTop).to.be.equal(0);
                    done();
                })
                .catch(done);
        }
    });
});
