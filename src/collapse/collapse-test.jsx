/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import Collapse from './collapse';

describe('collapse', () => {
    afterEach(cleanUp);

    it('should render without problem', () => {
        let collapse = render(<Collapse>Collapsing text</Collapse>);

        expect(collapse.node).to.exist;
        expect(collapse.node).to.have.class('collapse');
    });

    it('should call `onExpandedChange` callback after expand/collapse', () => {
        let onExpandedChange = sinon.spy();
        let collapse = render(
            <Collapse
                collapsedLabel='Expand'
                expandedLabel='Collapse'
                onExpandedChange={ onExpandedChange }
            >
                Collapsing text
            </Collapse>
        );
        let linkNode = collapse.node.querySelector('.link');

        linkNode.click();

        expect(onExpandedChange).to.have.been.calledOnce;
    });

    it('should update component height', (done) => {
        const HEIGHT_DELTA = 100;
        let collapse = render(
            <Collapse
                collapsedLabel='Expand'
                expandedLabel='Collapse'
            >
                <div
                    id='pusher'
                    style={ { width: '100%', height: '10px' } }
                />
            </Collapse>
        );
        let collapseContent = collapse.node.querySelector('.slide-down__content');
        let linkNode = collapse.node.querySelector('.link');

        setTimeout(() => {
            document.getElementById('pusher').style.height = `${HEIGHT_DELTA}px`;

            linkNode.click();

            setTimeout(() => {
                expect(collapseContent.clientHeight).to.equal(HEIGHT_DELTA);
                done();
            }, 0);
        }, 0);
    });

    it('should not update component height when it is collapsed', (done) => {
        const HEIGHT_DELTA = 100;
        let collapse = render(
            <Collapse
                collapsedLabel='Expand'
                expandedLabel='Collapse'
            >
                <div
                    id='pusher'
                    style={ { width: '100%', height: '0px' } }
                />
            </Collapse>
        );
        let initialComponentHeight = collapse.node.offsetHeight;

        document.getElementById('pusher').style.height = `${HEIGHT_DELTA}px`;

        setTimeout(() => {
            expect(collapse.node.offsetHeight).to.equal(initialComponentHeight);
            done();
        }, 1000);
    });

    it('should apply custom expanded label', () => {
        let collapse = render(
            <Collapse
                collapsedLabel='Раскрыть'
                isExpanded={ false }
            >
                Collapsing text
            </Collapse>
        );
        let linkNode = collapse.node.querySelector('.link');

        expect(linkNode).to.have.text('Раскрыть');
    });

    it('should apply custom collapsed label', () => {
        let collapse = render(
            <Collapse
                expandedLabel='Закрыть'
                isExpanded={ true }
            >
                Collapsing text
            </Collapse>
        );
        let linkNode = collapse.node.querySelector('.link');

        expect(linkNode).to.have.text('Закрыть');
    });

    it('should have default expanded label', () => {
        let collapse = render(<Collapse isExpanded={ false }>Collapsing text</Collapse>);
        let linkNode = collapse.node.querySelector('.link');

        expect(linkNode).to.have.text('Раскрыть');
    });
});
