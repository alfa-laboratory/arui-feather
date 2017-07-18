/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import Form from './form';

describe('form', () => {
    afterEach(cleanUp);

    it('should render without problems', () => {
        let form = render(<Form>Form-example</Form>);

        expect(form.node).to.exist;
        expect(form.node).to.have.text('Form-example');
        expect(form.node).to.have.class('form');
    });

    it('should render footer at the end of a form', () => {
        let form = render(<Form footer={ <div>footer</div> }>Form-content</Form>);
        let contentNode = form.node.querySelector('.form__footer');

        expect(contentNode).to.have.text('footer');
    });

    it('should call `onSubmit` callback after form was submitted', () => {
        let onSubmit = sinon.spy();
        let form = render(<Form onSubmit={ onSubmit } />);

        simulate(form.node, 'submit');

        expect(onSubmit).to.have.been.calledOnce;
    });
});
