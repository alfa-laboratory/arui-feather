/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Link } from './link';

describe('link', () => {
    it('should render without problems', () => {
        const link = shallow(<Link>Link-example</Link>);

        expect(link).toMatchSnapshot();
        expect(link.text()).toContain('Link-example');
    });

    it('should set/unset class on link focused/unfocused', () => {
        const link = mount(<Link>Link-example</Link>);

        link.simulate('focus');
        expect(link.children().props().className).toContain('link_focused');

        link.simulate('blur');
        expect(link.children().props().className).not.toContain('link_focused');
    });

    it('should set/unset class on link hovered/unhovered', () => {
        const link = mount(<Link>Link-example</Link>);

        link.simulate('mouseEnter');
        expect(link.children().props().className).toContain('link_hovered');

        link.simulate('mouseLeave');
        expect(link.children().props().className).not.toContain('link_hovered');
    });

    it('should call `onClick` callback after link was clicked disabled=false', () => {
        const onClick = jest.fn();
        const link = mount(<Link onClick={ onClick } disabled={ false }>Link-example</Link>);

        link.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call `onClick` callback after link was clicked disabled=true', () => {
        const onClick = jest.fn();
        const link = mount(<Link onClick={ onClick } disabled={ true }>Link-example</Link>);

        link.simulate('click');

        expect(onClick).not.toHaveBeenCalled();
    });

    it('should call `onDisabledClick` callback after link was clicked disabled=true', () => {
        const onDisabledClick = jest.fn();
        const link = mount(<Link onDisabledClick={ onDisabledClick } disabled={ true }>Link-example</Link>);

        link.simulate('click');

        expect(onDisabledClick).toHaveBeenCalled();
    });

    it('should not call `onDisabledClick` callback after link was clicked disabled=false', () => {
        const onDisabledClick = jest.fn();
        const link = mount(<Link onDisabledClick={ onDisabledClick } disabled={ false }>Link-example</Link>);

        link.simulate('click');

        expect(onDisabledClick).not.toHaveBeenCalled();
    });

    it('should call `onFocus` callback after link was focused', () => {
        const onFocus = jest.fn();
        const link = mount(<Link onFocus={ onFocus }>Link-example</Link>);

        link.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after link was blured', () => {
        const onBlur = jest.fn();
        const link = mount(<Link onBlur={ onBlur }>Link-example</Link>);

        link.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onMouseEnter` callback after link was hovered', () => {
        const onMouseEnter = jest.fn();
        const link = mount(<Link onMouseEnter={ onMouseEnter }>Link-example</Link>);

        link.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after link was leaved by cursor', () => {
        const onMouseLeave = jest.fn();
        const link = mount(<Link onMouseLeave={ onMouseLeave }>Link-example</Link>);

        link.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should set "disabled" class when disabled=true', () => {
        const link = mount(<Link disabled={ true }>Link-example</Link>);

        expect(link.children().props().className).toContain('link_disabled');
    });

    it('should render span tag with valid attributes when checked=true', () => {
        const link = mount<Link>(<Link checked={ true }>Link-example</Link>);
        const node = link.instance().getNode();

        expect(node.className).toContain('link_checked');
        expect(node.tagName).toBe('SPAN');
    });

    it('should render span tag with valid attributes when disabled=true', () => {
        const link = mount<Link>(<Link disabled={ true }>Link-example</Link>);
        const node = link.instance().getNode();

        expect(node.className).toContain('link_disabled');
        expect(node.tagName).toBe('SPAN');
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        const link = mount<Link>(<Link />);

        const node = link.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });

    it('should render with rel="noreferrer noopener" when using target="_blank"', () => {
        const link = mount<Link>(<Link target='_blank' />);

        expect(link).toMatchSnapshot();
    });
});
