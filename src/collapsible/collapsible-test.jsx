/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Collapsible from './collapsible';

describe('collapsible', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let collapsible = render(<Collapsible>Collapsing text</Collapsible>);

        expect(collapsible.node).to.exist;
        expect(collapsible.node).to.have.class('collapsible');
    });

    it('should update component height', (done) => {
        function renderComponent(isExpanded) {
            return render(
                <Collapsible isExpanded={ isExpanded }>
                    <div
                        id='pusher'
                        style={ { width: '100%', height: '10px' } }
                    />
                </Collapsible>
            );
        }
        const HEIGHT_DELTA = 100;
        let collapsible = renderComponent(false);
        let collapsibleNode = collapsible.node;

        setTimeout(() => {
            document.getElementById('pusher').style.height = `${HEIGHT_DELTA}px`;

            renderComponent(true);

            setTimeout(() => {
                expect(collapsibleNode.style.height).to.equal(`${HEIGHT_DELTA}px`);
                done();
            }, 0);
        }, 0);
    });

    it('should not update component height when it is collapsed', (done) => {
        const HEIGHT_DELTA = 100;
        let collapsible = render(
            <Collapsible>
                <div
                    id='pusher'
                    style={ { width: '100%', height: '0px' } }
                />
            </Collapsible>
        );
        let initialComponentHeight = collapsible.node.offsetHeight;

        document.getElementById('pusher').style.height = `${HEIGHT_DELTA}px`;

        setTimeout(() => {
            expect(collapsible.node.offsetHeight).to.equal(initialComponentHeight);
            done();
        }, 1000);
    });
});
