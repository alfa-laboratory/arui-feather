/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import Benchmark from 'react-component-benchmark';
import { render, cleanUp } from '../test-utils';

import Collapse from './collapse';

const TEXT = 'Collapsing text';

describe('collapse', () => {
    afterEach(cleanUp);

    describe('common', () => {
        it('should render without problem', () => {
            let collapse = render(<Collapse>{ TEXT }</Collapse>);

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
                    { TEXT }
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
            let collapseContent = collapse.node.querySelector('.collapse__content');
            let linkNode = collapse.node.querySelector('.link');

            setTimeout(() => {
                document.getElementById('pusher').style.height = `${HEIGHT_DELTA}px`;

                linkNode.click();

                setTimeout(() => {
                    expect(collapseContent.style.height).to.equal(`${HEIGHT_DELTA}px`);
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
                    { TEXT }
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
                    { TEXT }
                </Collapse>
            );
            let linkNode = collapse.node.querySelector('.link');

            expect(linkNode).to.have.text('Закрыть');
        });

        it('should have default expanded label', () => {
            let collapse = render(<Collapse isExpanded={ false }>{ TEXT }</Collapse>);
            let linkNode = collapse.node.querySelector('.link');

            expect(linkNode).to.have.text('Expand');
        });

        it('should have default collapsed label', () => {
            let collapse = render(<Collapse isExpanded={ true }>{ TEXT }</Collapse>);
            let linkNode = collapse.node.querySelector('.link');

            expect(linkNode).to.have.text('Collapse');
        });
    });

    describe('benchmark', () => {
        let meanTime;
        let props;

        beforeEach(() => {
            meanTime = 0;
            props = {
                component: Collapse,
                componentProps: {
                    children: TEXT
                },
                onComplete: (results) => {
                    console.log(results);
                    meanTime = results.mean;
                },
                samples: 100
            };
        });

        it('should mount in a reasonable amount of time', () => {
            var hz;
            var period;
            var startTime = new Date;
            var runs = 0;
            var totalTime = 0;
            do {
            	// Code snippet goes here.
                let component = render(<Benchmark { ...props } type='mount' />);
                component.instance.start();
                console.log(meanTime);
                console.log('$$$');

            	runs++;
            	totalTime = new Date - startTime;
            } while (totalTime < 1000);

            // Convert milliseconds to seconds.
            totalTime /= 1000;

            // period → how long each operation takes
            period = totalTime / runs;

            // hz → the number of operations per second.
            hz = 1 / period;

            console.log(period);
            console.log(hz);
            console.log('#!@#!@#!@');
            console.log('########');

            // expect(meanTime).to.be.less.than(10);
        });
    });
});
