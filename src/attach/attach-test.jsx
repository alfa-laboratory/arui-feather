/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Attach from './attach';

describe('attach', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let attach = render(<Attach />);

        let buttonNode = attach.node.querySelector('.button');
        let labelNode = attach.node.querySelector('.attach__label');
        let controlNode = attach.node.querySelector('.attach__control');
        let statusNode = attach.node.querySelector('.attach__no-file');

        expect(attach.node).to.exist;
        expect(attach.node).to.have.class('attach');
        expect(statusNode).to.have.text('Нет файла');
        expect(labelNode).to.have.class('attach__label');
        expect(controlNode).to.have.class('attach__control');
        expect(buttonNode).to.have.class('button');
    });

    it('should set/unset class on attach focused/unfocused', (done) => {
        let attach = render(<Attach />);

        attach.instance.focus();

        setTimeout(() => {
            expect(attach.node).to.have.class('attach_focused');

            attach.instance.blur();

            setTimeout(() => {
                expect(attach.node).to.not.have.class('attach_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should set/unset class on attach hovered/unhovered', () => {
        let attach = render(<Attach />);

        simulate(attach.node, 'mouseEnter');
        expect(attach.node).to.have.class('attach_hovered');

        simulate(attach.node, 'mouseLeave');
        expect(attach.node).to.not.have.class('attach_hovered');
    });

    it('should call `onClick` callback after attach button was clicked', () => {
        let onClick = chai.spy();
        let attach = render(<Attach onClick={ onClick } />);
        let buttonNode = attach.node.querySelector('.button');

        buttonNode.click();

        expect(onClick).to.have.been.called.once;
    });

    it('should call `onFocus` callback after attach was focused', (done) => {
        let onFocus = chai.spy();
        let attach = render(<Attach onFocus={ onFocus } />);

        attach.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after attach was blured', (done) => {
        let onBlur = chai.spy();
        let attach = render(<Attach onBlur={ onBlur } />);

        attach.instance.focus();

        setTimeout(() => {
            attach.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onMouseEnter` callback after attach was hovered', () => {
        let onMouseEnter = chai.spy();
        let attach = render(<Attach onMouseEnter={ onMouseEnter } />);

        simulate(attach.node, 'mouseEnter');

        expect(onMouseEnter).to.have.been.called.once;
    });

    it('should call `onMouseLeave` callback after attach was leaved by cursor', () => {
        let onMouseLeave = chai.spy();
        let attach = render(<Attach onMouseLeave={ onMouseLeave } />);

        simulate(attach.node, 'mouseLeave');

        expect(onMouseLeave).to.have.been.called.once;
    });
});
