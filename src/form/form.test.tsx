/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import { Form } from './form';

describe('form', () => {
    it('should render without problems', () => {
        const form = shallow(<Form>Form-example</Form>);

        expect(form).toMatchSnapshot();
        expect(form.text()).toContain('Form-example');
    });

    it('should render footer at the end of a form', () => {
        const form = shallow(<Form footer={ <div>footer</div> }>Form-content</Form>);
        const contentNode = form.find('.form__footer');

        expect(contentNode.text()).toContain('footer');
    });

    it('should call `onSubmit` callback after form was submitted', () => {
        const onSubmit = jest.fn();
        const form = mount(<Form onSubmit={ onSubmit } />);

        form.simulate('submit');

        expect(onSubmit).toHaveBeenCalled();
    });
});
