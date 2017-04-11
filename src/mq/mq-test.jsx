/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* eslint import/no-extraneous-dependencies: [2, {"devDependencies": true}] */

import bowser from 'bowser';
import Modernizr from '../modernizr';

import { render, cleanUp } from '../test-utils';

import Mq from './mq';

const IS_SMALL_ONLY = (window.innerWidth || document.documentElement.clientWidth ||
    document.body.clientWidth) <= 640;
const SUPPORTS_TOUCH = Modernizr.pointerevents || Modernizr.touchevents;

describe('mq', () => {
    afterEach(cleanUp);

    it('should not render this.props.children on conditions mismatch', () => {
        let mq = render(<Mq query='--small-only' touch={ true }><div /></Mq>);

        if (!bowser.mobile) {
            expect(mq.node).to.not.exist;
        }
    });

    it('should render with matching query and matching touch screen', () => {
        let mq = render(<Mq query='--small-only' touch={ true }><div /></Mq>);

        if (bowser.mobile) {
            expect(mq.node).to.exist;
        } else {
            expect(mq.node).to.not.exist;
        }
    });

    it('should render with matching query and matching non-touch screen', () => {
        let mq = render(<Mq query='--small-only' touch={ false }><div /></Mq>);

        if (bowser.mobile) {
            expect(mq.node).to.not.exist;
        } else if (IS_SMALL_ONLY) {
            expect(mq.node).to.exist;
        } else {
            expect(mq.node).to.not.exist;
        }
    });

    it('should render with matching query and missing touch', () => {
        let mq = render(<Mq query='--small-only'><div /></Mq>);

        if (bowser.mobile) {
            expect(mq.node).to.exist;
        } else if (IS_SMALL_ONLY) {
            expect(mq.node).to.exist;
        } else {
            expect(mq.node).to.not.exist;
        }
    });

    it('should render with missing query and matching touch screen', () => {
        let mq = render(<Mq touch={ true }><div /></Mq>);

        if (SUPPORTS_TOUCH) {
            expect(mq.node).to.exist;
        } else {
            expect(mq.node).to.not.exist;
        }
    });

    it('should render with missing query and matching non-touch screen', () => {
        let mq = render(<Mq touch={ false }><div /></Mq>);

        if (SUPPORTS_TOUCH) {
            expect(mq.node).to.not.exist;
        } else {
            expect(mq.node).to.exist;
        }
    });

    it('should render with missing query and missing touch', () => {
        let mq = render(<Mq><div /></Mq>);

        expect(mq.node).to.exist;
    });

    it('should not render with non-matching query', () => {
        let mq = render(<Mq query='--non-matching-query'><div /></Mq>);

        expect(mq.node).to.not.exist;
    });

    it('should not render with non-matching query', () => {
        let mq = render(<Mq query='--non-matching-query'><div /></Mq>);

        expect(mq.node).to.not.exist;
    });
});
