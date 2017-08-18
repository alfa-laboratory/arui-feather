/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import CheckBoxGroup from './checkbox-group';
import CheckBox from '../checkbox/checkbox';

describe('checkbox-group', () => {
    afterEach(cleanUp);

    it('should render without children', () => {
        let checkboxGroup = render(<CheckBoxGroup />);

        expect(checkboxGroup.node).to.exist;
    });

    it('should render with only one children', () => {
        let checkboxGroup = render(
            <CheckBoxGroup>
                <CheckBox key='1' />
            </CheckBoxGroup>
        );

        expect(checkboxGroup.node).to.exist;
        expect(checkboxGroup.node).to.have.class('checkbox-group');
        expect(checkboxGroup.node).to.have.class('control-group');
    });

    it('should render with many checkbox children without problems', () => {
        let checkboxGroup = render(
            <CheckBoxGroup>
                <CheckBox key='1' text='label' />
                <CheckBox key='2' text='label' />
            </CheckBoxGroup>
        );

        expect(checkboxGroup.node).to.exist;
        expect(checkboxGroup.node).to.have.class('checkbox-group');
        expect(checkboxGroup.node).to.have.class('control-group');
    });

    it('should render checked checkbox with value from `value` props', () => {
        let checkboxGroup = render(
            <CheckBoxGroup
                value={ ['value_1'] }
            >
                <CheckBox value='value_1' text='label 1' />
                <CheckBox value='value_2' text='label 2' />
            </CheckBoxGroup>
        );
        let checkboxNode = checkboxGroup.node.querySelector('.checkbox');

        expect(checkboxNode).to.have.class('checkbox_checked');
    });

    it('should focus first child checkbox-button on public focus method', (done) => {
        let checkboxGroup = render(
            <CheckBoxGroup>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );
        let firstCheckboxNode = checkboxGroup.node.querySelectorAll('input[type="checkbox"]')[0];

        checkboxGroup.instance.focus();

        setTimeout(() => {
            expect(document.activeElement === firstCheckboxNode).to.be.equal(true);
            done();
        }, 0);
    });

    it('should lose focus on public blur method', (done) => {
        let checkboxGroup = render(
            <CheckBoxGroup>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );
        let firstCheckboxNode = checkboxGroup.node.querySelectorAll('input[type="checkbox"]')[0];

        checkboxGroup.instance.focus();

        setTimeout(() => {
            expect(document.activeElement === firstCheckboxNode).to.be.equal(true);

            checkboxGroup.instance.blur();

            setTimeout(() => {
                expect(document.activeElement === firstCheckboxNode).to.be.equal(false);
                done();
            }, 0);
        }, 0);
    });

    it('should call `onFocus` callback after checkbox-group was focused', (done) => {
        let onFocus = sinon.spy();
        let checkBoxGroup = render(
            <CheckBoxGroup onFocus={ onFocus }>
                <CheckBox />
            </CheckBoxGroup>
        );

        checkBoxGroup.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after checkbox-group was blured', (done) => {
        let onBlur = sinon.spy();
        let checkBoxGroup = render(
            <CheckBoxGroup onBlur={ onBlur }>
                <CheckBox />
            </CheckBoxGroup>
        );

        checkBoxGroup.instance.focus();

        setTimeout(() => {
            checkBoxGroup.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.calledOnce;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onChange` callback after checkbox-group was checked', (done) => {
        let onChange = sinon.spy();
        let checkBoxGroup = render(
            <CheckBoxGroup onChange={ onChange }>
                <CheckBox value='value_1' />
            </CheckBoxGroup>
        );
        let checkboxControlNode = checkBoxGroup.node.querySelector('.checkbox__control');

        simulate(checkboxControlNode, 'change');

        setTimeout(() => {
            expect(onChange).to.have.been.calledOnce;
            expect(onChange).to.have.been.calledWith(['value_1']);
            done();
        }, 0);
    });

    it('should disable all child radios when disabled=true', () => {
        let checkBoxGroup = render(
            <CheckBoxGroup disabled={ true }>
                <CheckBox />
                <CheckBox />
                <CheckBox />
            </CheckBoxGroup>
        );

        let disabledCheckboxNodes = checkBoxGroup.node.querySelectorAll('.checkbox_disabled');
        expect(disabledCheckboxNodes.length).to.equal(3);
    });

    it('shouldn\'t call `onChange` callback when disabled=true', function () {
        let onChange = sinon.spy();
        let checkboxGroup = render(
            <CheckBoxGroup onChange={ onChange } disabled={ true }>
                <CheckBox />
            </CheckBoxGroup>
        );
        let checkbox = checkboxGroup.node.querySelector('.checkbox');

        simulate(checkbox, 'change');

        expect(onChange).to.have.not.been.called;
    });
});
