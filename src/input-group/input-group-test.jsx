/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import InputGroup from './input-group';
import Input from '../input/input';

describe('input-group', () => {
    afterEach(cleanUp);

    it('should render without any children', () => {
        let inputGroup = render(<InputGroup />);

        expect(inputGroup.node).to.exist;
        expect(inputGroup.node).to.have.class('input-group');
        expect(inputGroup.node).to.have.class('control-group');
    });

    it('should render with only one children', () => {
        let inputGroup = render(<InputGroup><Input key='1' /></InputGroup>);

        expect(inputGroup.node).to.exist;
        expect(inputGroup.node).to.have.class('input-group');
        expect(inputGroup.node).to.have.class('control-group');
    });

    it('should render with many input children without problems', () => {
        let inputGroup = render(<InputGroup><Input key='1' /><Input key='2' /></InputGroup>);

        expect(inputGroup.node).to.exist;
        expect(inputGroup.node).to.have.class('input-group');
        expect(inputGroup.node).to.have.class('control-group');
    });
});
