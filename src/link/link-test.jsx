/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Link from './link';

describe('link', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let link = render(<Link>Link-example</Link>);

        expect(link.node).to.exist;
        expect(link.node).to.have.text('Link-example');
        expect(link.node).to.have.class('link');
        expect(link.node.tagName).to.equal('A');
    });

    it('should render with `target` prop passed', () => {
        let link = render(<Link target='_blank'>Link-example</Link>);

        expect(link.node).to.have.attr('target', '_blank');
    });

    it('should render with `download` prop passed', () => {
        let link = render(<Link download='hello'>Link-example</Link>);

        expect(link.node).to.have.attr('download', 'hello');
    });

    it('should set/unset class on link focused/unfocused', () => {
        let link = render(<Link>Link-example</Link>);

        simulate(link.node, 'focus');
        expect(link.node).to.have.class('link_focused');

        simulate(link.node, 'blur');
        expect(link.node).to.not.have.class('link_focused');
    });

    it('should set/unset class on link hovered/unhovered', () => {
        let link = render(<Link>Link-example</Link>);

        simulate(link.node, 'mouseEnter');
        expect(link.node).to.have.class('link_hovered');

        simulate(link.node, 'mouseLeave');
        expect(link.node).to.not.have.class('link_hovered');
    });

    it('should call `onClick` callback after link was clicked', () => {
        let onClick = sinon.spy();
        let link = render(<Link onClick={ onClick }>Link-example</Link>);

        link.node.click();

        expect(onClick).to.have.been.calledOnce;
    });

    it('should call `onFocus` callback after link was focused', () => {
        let onFocus = sinon.spy();
        let link = render(<Link onFocus={ onFocus }>Link-example</Link>);

        simulate(link.node, 'focus');

        expect(onFocus).to.have.been.calledOnce;
    });

    it('should call `onBlur` callback after link was blured', () => {
        let onBlur = sinon.spy();
        let link = render(<Link onBlur={ onBlur }>Link-example</Link>);

        simulate(link.node, 'blur');

        expect(onBlur).to.have.been.calledOnce;
    });

    it('should call `onMouseEnter` callback after link was hovered', () => {
        let onMouseEnter = sinon.spy();
        let link = render(<Link onMouseEnter={ onMouseEnter }>Link-example</Link>);

        simulate(link.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.calledOnce;
    });

    it('should call `onMouseLeave` callback after link was leaved by cursor', () => {
        let onMouseLeave = sinon.spy();
        let link = render(<Link onMouseLeave={ onMouseLeave }>Link-example</Link>);

        simulate(link.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.calledOnce;
    });

    it('should set "disabled" class when disabled=true', () => {
        let link = render(<Link disabled={ true }>Link-example</Link>);

        expect(link.node).to.have.class('link_disabled');
    });

    it('should render span tag with valid attributes when checked=true', () => {
        let link = render(<Link checked={ true }>Link-example</Link>);
        let node = link.instance.getNode();

        expect(node).to.have.class('link_checked');
        expect(node.tagName).to.equal('SPAN');
        expect(node).to.not.have.attr('target');
        expect(node).to.not.have.attr('href');
    });

    it('should render span tag with valid attributes when disabled=true', () => {
        let link = render(<Link disabled={ true }>Link-example</Link>);
        let node = link.instance.getNode();

        expect(node).to.have.class('link_disabled');
        expect(node.tagName).to.equal('SPAN');
        expect(node).to.not.have.attr('target');
        expect(node).to.not.have.attr('href');
    });

    it('should return root `HTMLElement` after `getNode` method call', () => {
        let link = render(<Link />);

        let node = link.instance.getNode();

        expect(node).to.be.instanceOf(HTMLElement);
        expect(node).to.be.equal(link.node);
    });

    it('should render with rel="noreferrer noopener" when using target="_blank"', () => {
        let link = render(<Link target='_blank' rel='noreferrer noopener' />);

        let node = link.instance.getNode();

        expect(node).to.be.have.attr('target');
        expect(node).to.be.have.attr('rel');
        expect(node.getAttribute('rel')).to.be.equal('noreferrer noopener');
    });
});
