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

    it('should render view line without problems', () => {
        let formField = render(<FormField view='line'>FormField-test</FormField>);

        expect(formField.node).to.have.class('form-field_view_line');
    });

    it('should render Label with text from property `label`', () => {
        let formField = render(<FormField label='FormField Label'>FormField-test</FormField>);
        let formFieldLabelNode = formField.node.firstChild;

        expect(formFieldLabelNode).to.have.class('form-field__label');
        expect(formFieldLabelNode).to.have.text('FormField Label');
    });
});
