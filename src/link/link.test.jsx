/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import Link from './link';

describe('link', () => {
    it('should render without problems', () => {
        let link = shallow(<Link>Link-example</Link>);

        expect(link).toMatchSnapshot();
        expect(link.text()).toContain('Link-example');
    });

    it('should set/unset class on link focused/unfocused', () => {
        let link = mount(<Link>Link-example</Link>);

        link.simulate('focus');
        expect(link.children().props().className).toContain('link_focused');

        link.simulate('blur');
        expect(link.children().props().className).not.toContain('link_focused');
    });

    it('should set/unset class on link hovered/unhovered', () => {
        let link = mount(<Link>Link-example</Link>);

        link.simulate('mouseEnter');
        expect(link.children().props().className).toContain('link_hovered');

        link.simulate('mouseLeave');
        expect(link.children().props().className).not.toContain('link_hovered');
    });

    it('should call `onClick` callback after link was clicked disabled=false', () => {
        let onClick = jest.fn();
        let link = mount(<Link onClick={ onClick } disabled={ false }>Link-example</Link>);

        link.simulate('click');

        expect(onClick).toHaveBeenCalled();
    });

    it('should not call `onClick` callback after link was clicked disabled=true', () => {
        let onClick = jest.fn();
        let link = mount(<Link onClick={ onClick } disabled={ true }>Link-example</Link>);

        link.simulate('click');

        expect(onClick).not.toHaveBeenCalled();
    });

    it('should call `onDisabledLinkClick` callback after link was clicked disabled=true', () => {
        let onDisabledLinkClick = jest.fn();
        let link = mount(<Link onDisabledLinkClick={ onDisabledLinkClick } disabled={ true }>Link-example</Link>);

        link.simulate('click');

        expect(onDisabledLinkClick).toHaveBeenCalled();
    });

    it('should not call `onDisabledLinkClick` callback after link was clicked disabled=false', () => {
        let onDisabledLinkClick = jest.fn();
        let link = mount(<Link onDisabledLinkClick={ onDisabledLinkClick } disabled={ false }>Link-example</Link>);

        link.simulate('click');

        expect(onDisabledLinkClick).not.toHaveBeenCalled();
    });

    it('should call `onFocus` callback after link was focused', () => {
        let onFocus = jest.fn();
        let link = mount(<Link onFocus={ onFocus }>Link-example</Link>);

        link.simulate('focus');

        expect(onFocus).toHaveBeenCalled();
    });

    it('should call `onBlur` callback after link was blured', () => {
        let onBlur = jest.fn();
        let link = mount(<Link onBlur={ onBlur }>Link-example</Link>);

        link.simulate('blur');

        expect(onBlur).toHaveBeenCalled();
    });

    it('should call `onMouseEnter` callback after link was hovered', () => {
        let onMouseEnter = jest.fn();
        let link = mount(<Link onMouseEnter={ onMouseEnter }>Link-example</Link>);

        link.simulate('mouseEnter');

        expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should call `onMouseLeave` callback after link was leaved by cursor', () => {
        let onMouseLeave = jest.fn();
        let link = mount(<Link onMouseLeave={ onMouseLeave }>Link-example</Link>);

        link.simulate('mouseLeave');

        expect(onMouseLeave).toHaveBeenCalled();
    });

    it('should set "disabled" class when disabled=true', () => {
        let link = mount(<Link disabled={ true }>Link-example</Link>);

        expect(link.children().props().className).toContain('link_disabled');
    });

    it('should render span tag with valid attributes when checked=true', () => {
        let link = mount(<Link checked={ true }>Link-example</Link>);
        let node = link.instance().getNode();

        expect(node.className).toContain('link_checked');
        expect(node.tagName).toBe('SPAN');
    });

    it('should render span tag with valid attributes when disabled=true', () => {
        let link = mount(<Link disabled={ true }>Link-example</Link>);
        let node = link.instance().getNode();

        expect(node.className).toContain('link_disabled');
        expect(node.tagName).toBe('SPAN');
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let link = mount(<Link />);

        let node = link.instance().getNode();

        expect(node).toBeInstanceOf(HTMLElement);
    });

    it('should render with rel="noreferrer noopener" when using target="_blank"', () => {
        let link = mount(<Link target='_blank' rel='noreferrer noopener' />);

        expect(link).toMatchSnapshot();
    });
});
