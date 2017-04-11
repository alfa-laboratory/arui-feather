/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import RadioGroup from './radio-group';
import Radio from '../radio/radio';

describe('radio-group', () => {
    afterEach(cleanUp);

    it('should render without any children', () => {
        let radioGroup = render(<RadioGroup />);

        expect(radioGroup.node).to.exist;
        expect(radioGroup.node).to.have.class('radio-group');
        expect(radioGroup.node).to.have.class('control-group');
    });

    it('should render with only one children', () => {
        let radioGroup = render(<RadioGroup><Radio key='1' /></RadioGroup>);

        expect(radioGroup.node).to.exist;
        expect(radioGroup.node).to.have.class('radio-group');
        expect(radioGroup.node).to.have.class('control-group');
    });

    it('should render with many radio children without problems', () => {
        let radioGroup = render(
            <RadioGroup>
                <Radio key='1' text='label' />
                <Radio key='2' text='label' />
            </RadioGroup>
        );

        expect(radioGroup.node).to.exist;
        expect(radioGroup.node).to.have.class('radio-group');
        expect(radioGroup.node).to.have.class('control-group');
    });

    it('should render checked radio with value from `value` props', () => {
        let radioGroup = render(
            <RadioGroup
                value='1'
            >
                <Radio key='1' value='1' text='label 1' />
                <Radio key='2' value='2' text='label 2' />
            </RadioGroup>
        );
        let radioNode = radioGroup.node.querySelector('.radio');

        expect(radioNode).to.have.class('radio_checked');
    });

    it('should render radio in error state with error on radioGroup', () => {
        let radioGroup = render(
            <RadioGroup error='errorText'>
                <Radio key='1' />
            </RadioGroup>
        );
        let radioNode = radioGroup.node.querySelector('.radio');

        expect(radioNode).to.have.class('radio_invalid');
    });

    it('should focus first child radio-button on public focus method', (done) => {
        let radioGroup = render(
            <RadioGroup>
                <Radio key='1' />
                <Radio key='2' />
                <Radio key='3' />
            </RadioGroup>
        );
        let firstRadioNode = radioGroup.node.querySelectorAll('input[type="radio"]')[0];

        radioGroup.instance.focus();

        setTimeout(() => {
            expect(document.activeElement === firstRadioNode).to.be.equal(true);
            done();
        }, 0);
    });

    it('should lose focus on public blur method', (done) => {
        let radioGroup = render(
            <RadioGroup>
                <Radio key='1' />
                <Radio key='2' />
                <Radio key='3' />
            </RadioGroup>
        );
        let firstRadioNode = radioGroup.node.querySelectorAll('input[type="radio"]')[0];

        radioGroup.instance.focus();

        setTimeout(() => {
            expect(document.activeElement === firstRadioNode).to.be.equal(true);

            radioGroup.instance.blur();

            setTimeout(() => {
                expect(document.activeElement === firstRadioNode).to.be.equal(false);
                done();
            }, 0);
        }, 0);
    });

    it('should call `onFocus` callback after radio-group was focused', (done) => {
        let onFocus = chai.spy();
        let radioGroup = render(
            <RadioGroup onFocus={ onFocus }>
                <Radio key='1' />
            </RadioGroup>
        );

        radioGroup.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after radio-group was blured', (done) => {
        let onBlur = chai.spy();
        let radioGroup = render(
            <RadioGroup onBlur={ onBlur }>
                <Radio key='1' />
            </RadioGroup>
        );

        radioGroup.instance.focus();

        setTimeout(() => {
            radioGroup.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onChange` callback after radio-group was checked', (done) => {
        let onChange = chai.spy();
        let radioGroup = render(
            <RadioGroup onChange={ onChange }>
                <Radio key='1' value={ '1' } />
            </RadioGroup>
        );
        let radioControlNode = radioGroup.node.querySelector('.radio__control');

        simulate(radioControlNode, 'change');

        setTimeout(() => {
            expect(onChange).to.have.been.called.once;
            expect(onChange).to.have.been.called.with('1');
            done();
        }, 0);
    });

    it('should render error-popup on focus when error set', (done) => {
        let radioGroup = render(
            <RadioGroup error={ 'Текст ошибки' } >
                <Radio key='1' />
            </RadioGroup>
        );

        radioGroup.instance.focus();

        setTimeout(() => {
            let popupNode = document.querySelector('.popup');
            expect(popupNode).to.exist;
            expect(popupNode).to.contain.text('Текст ошибки');
            done();
        }, 0);
    });

    it('should change other radio checked status when check one', function () {
        const radioGroupNode = render(
            <RadioGroup value='1'>
                <Radio key='1' value='1' />
                <Radio key='2' value='2' />
            </RadioGroup>
        ).node;
        const radios = radioGroupNode.querySelectorAll('input[type="radio"]');
        const secondRadioControlNode = radios[1];

        simulate(secondRadioControlNode, 'change');

        expect(radioGroupNode).to.have.valueOf('2');
    });

    it('shouldn\'t call `onChange` twice when press to the same radio twice', function () {
        const onChange = chai.spy();
        const radioGroupNode = render(
            <RadioGroup value='1' onChange={ onChange }>
                <Radio key='1' value='1' />
                <Radio key='2' value='2' />
            </RadioGroup>
        ).node;
        const radios = radioGroupNode.querySelectorAll('input[type="radio"]');
        const secondRadioControlNode = radios[1];

        simulate(secondRadioControlNode, 'change');
        simulate(secondRadioControlNode, 'change');

        expect(onChange).to.have.been.called.once;
    });
});
