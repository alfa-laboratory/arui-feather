/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow } from 'enzyme';

import { InputGroup } from './input-group';
import { Input } from '../input/input';

describe('input-group', () => {
    it('should render without any children', () => {
        const inputGroup = shallow(<InputGroup />);

        expect(inputGroup).toMatchSnapshot();
    });

    it('should render with only one children', () => {
        const inputGroup = shallow(<InputGroup><Input key='1' /></InputGroup>);

        expect(inputGroup).toMatchSnapshot();
    });

    it('should render with many input children without problems', () => {
        const inputGroup = shallow(<InputGroup><Input key='1' /><Input key='2' /></InputGroup>);

        expect(inputGroup).toMatchSnapshot();
    });
});
