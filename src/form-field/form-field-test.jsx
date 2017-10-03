/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp } from '../test-utils';

import FormField from './form-field';

describe('form-field', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let formField = render(<FormField>FormField-test</FormField>);

        expect(formField.node).to.exist;
        expect(formField.node).to.have.text('FormField-test');
    });
});
