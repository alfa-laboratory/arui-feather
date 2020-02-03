/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { SlideDown } from './slide-down';

describe('slide-down', () => {
    it('should render without problems', () => {
        const slideDownNode = shallow(<SlideDown>slide-down-text</SlideDown>);

        expect(slideDownNode).toMatchSnapshot();
        expect(slideDownNode.text()).toContain('slide-down-text');
    });

    it('should render with height=0 by default', () => {
        const slideDownNode = shallow(
            <SlideDown>
                <div style={ { height: '100px' } } />
            </SlideDown>
        );

        expect(slideDownNode.props().style).toEqual({ height: 0 });
    });

    it('should render with height=auto when isExpanded=true', () => {
        const slideDownNode = shallow(
            <SlideDown isExpanded={ true } />
        );

        expect(slideDownNode.props().style).toEqual({ height: 'auto' });
    });

    it('should set `slide-down__content_expanded` class to content when isExpanded=true', () => {
        const slideDownNode = shallow(
            <SlideDown isExpanded={ true } />
        );

        const slideDownContentNode = slideDownNode.find('.slide-down__content');

        expect(slideDownContentNode.props().className).toContain('slide-down__content_expanded');
    });

    it('should call onAnimationStart when received new isExpanded prop', () => {
        const onAnimationStart = jest.fn();
        const props = { isExpanded: false, onAnimationStart };
        const slideDownNode = mount<SlideDown>(
            <SlideDown { ...props } />
        );

        slideDownNode.instance().UNSAFE_componentWillReceiveProps({ ...props, isExpanded: true });
        expect(onAnimationStart).toHaveBeenCalled();
    });

    it('should call onAnimationEnd when handleTransitionEnd is called', () => {
        const onAnimationEnd = jest.fn();
        const slideDownNode = shallow<SlideDown>(
            <SlideDown isExpanded={ false } onAnimationEnd={ onAnimationEnd } />
        );

        // @ts-ignore
        slideDownNode.instance().handleTransitionEnd({});
        expect(onAnimationEnd).toHaveBeenCalled();
    });
});
