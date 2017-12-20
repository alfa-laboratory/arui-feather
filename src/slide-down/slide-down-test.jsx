/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
import { Component } from 'react';
import { render, cleanUp } from '../test-utils';

import SlideDown from './slide-down';

class TestContainer extends Component {
    state = {
        isExpanded: true
    }

    render() {
        return (
            <SlideDown { ...this.props } isExpanded={ this.state.isExpanded } />
        );
    }
}

describe('slide-down', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let { node: slideDownNode } = render(<SlideDown>slide-down-text</SlideDown>);

        expect(slideDownNode).to.exist;
        expect(slideDownNode).to.have.text('slide-down-text');
        expect(slideDownNode).to.have.class('slide-down');
    });

    it('should render with height=0 by default', () => {
        let { node: slideDownNode } = render(
            <SlideDown>
                <div style={ { height: '100px' } } />
            </SlideDown>
        );

        expect(slideDownNode).to.have.attribute('style', 'height: 0px;');
    });

    it('should render with height=auto when isExpanded=true', () => {
        let { node: slideDownNode } = render(
            <SlideDown isExpanded={ true } />
        );

        expect(slideDownNode).to.have.attribute('style', 'height: auto;');
    });

    it('should set `slide-down__content_expanded` class to content when isExpanded=true', () => {
        let { node: slideDownNode } = render(
            <SlideDown isExpanded={ true } />
        );

        let slideDownContentNode = slideDownNode.querySelector('.slide-down__content');
        expect(slideDownContentNode).to.have.class('slide-down__content_expanded');
    });

    it('should call onAnimationStateChange when animation state changes', () => {
        let spy = sinon.spy();
        let { instance } = render(
            <TestContainer onAnimationStateChange={ spy } />
        );
        instance.setState({ isExpanded: false });
        expect(spy.getCall(0).args).to.eql([true]);
    });
});
