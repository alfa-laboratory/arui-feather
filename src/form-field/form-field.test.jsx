/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { mount } from 'enzyme';

import FormField from './form-field';

describe('form-field', () => {
    it('should render without problems', () => {
        let formField = mount(<FormField>FormField-test</FormField>);

        expect(formField).toMatchSnapshot();
    });
});
