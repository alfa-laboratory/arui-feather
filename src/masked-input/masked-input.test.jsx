/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import MaskedInput from './masked-input';

describe('masked-input', () => {
    it('should render without problems', () => {
        let maskedInput = shallow(<MaskedInput mask='1111 1111 1111 1111' />);

        expect(maskedInput).toMatchSnapshot();
    });

    it('should format unformatted value', () => {
        let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        expect(maskedInput.find('input').props().value).toBe('1234 5678 9012 3456');
    });

    it('should format unformatted value with custom formatter', () => {
        const cyrillic = {
            c: {
                validate(char) { return /^[ЁёА-Яа-я]$/.test(char); }
            }
        };
        let maskedInput = mount(
            <MaskedInput formatCharacters={ cyrillic } mask='c 111 cc' value='12-3hjhkА456ИТг' />
        );

        expect(maskedInput.find('input').props().value).toBe('А 456 ИТ');
    });

    it('should strip value size to mask size', () => {
        let maskedInput = mount(
            <MaskedInput mask='1111 1111 1111 1111' value='1234 5678 9012 3456 7890 1234' />
        );

        expect(maskedInput.find('input').props().value).toBe('1234 5678 9012 3456');
    });

    it('should format value skipping non maskable chars', () => {
        let maskedInput = mount(
            <MaskedInput mask='1111 1111 1111 1111' value='Abc 1234 @&&*() 5678 klm90123456' />
        );

        expect(maskedInput.find('input').props().value).toBe('1234 5678 9012 3456');
    });

    it('should reformat value by new mask after mask was changed', () => {
        let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        maskedInput.setProps({
            mask: '+1 (111) 111-11-11'
        });

        expect(maskedInput.find('input').props().value).toBe('+1 (234) 567-89-01');
    });

    it('should reformat value by new mask after formatCharacters was changed', () => {
        const mask = 'ccc 1 ccc';
        const cyrillic = {
            c: {
                validate(char) { return /^[ЁёА-Яа-я]$/.test(char); }
            }
        };
        let maskedInput = mount(<MaskedInput mask={ mask } value='абв6гщз' />);

        maskedInput.setProps({ formatCharacters: cyrillic });

        expect(maskedInput.find('input').props().value).toBe('абв 6 гщз');
    });

    it('should reformat value after value was changed', () => {
        let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        maskedInput.setProps({ value: '0987654321098765' });

        expect(maskedInput.find('input').props().value).toBe('0987 6543 2109 8765');
    });

    it('should focus on input after focus() call', () => {
        let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' />);
        let inputNode = maskedInput.instance().input;
        jest.spyOn(inputNode, 'focus');

        maskedInput.instance().focus();

        expect(inputNode.focus).toHaveBeenCalled();
    });

    it('should remove focus from input after blur() call', () => {
        let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' />);
        let inputNode = maskedInput.instance().input;
        jest.spyOn(inputNode, 'blur');

        maskedInput.instance().blur();

        expect(inputNode.blur).toHaveBeenCalled();
    });

    it('should call `onProcessInputEvent` during `onInput` process', (done) => {
        let onProcessInputEvent = jest.fn();
        let maskedInput = mount(
            <MaskedInput
                mask='1111 1111 1111 1111'
                value='1234 5'
                onProcessInputEvent={ onProcessInputEvent }
            />
        );

        maskedInput.instance().focus();

        setTimeout(() => {
            maskedInput.find('input').simulate('beforeInput');
            maskedInput.find('input').simulate('input', { target: { value: '1234 5' } });

            expect(onProcessInputEvent).toHaveBeenCalled();
            done();
        }, 0);
    });

    it('should move caret position from uneditable position to next editable position during `onInput`',
        (done) => {
            let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234 5' />);
            let inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                inputNode.getDOMNode().selectionStart = 4;
                inputNode.getDOMNode().selectionEnd = 4;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '1234 5' } });

                expect(inputNode.getDOMNode().selectionStart).toBe(5);
                expect(inputNode.getDOMNode().selectionEnd).toBe(5);
                done();
            }, 0);
        });

    it('should move caret position from uneditable position to prev editable position during `onInput` (delete)',
        (done) => {
            let maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234 5' />);
            let inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                inputNode.getDOMNode().selectionStart = 5;
                inputNode.getDOMNode().selectionEnd = 5;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '1234 ' } });

                expect(inputNode.getDOMNode().selectionStart).toBe(4);
                expect(inputNode.getDOMNode().selectionEnd).toBe(4);
                done();
            }, 0);
        });

    it('should move caret position from uneditable position to next editable position during `onInput` (replace)',
        (done) => {
            let maskedInput = mount(<MaskedInput mask='+1 111 11 11 11' value='+7 903 752' />);
            let inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                inputNode.getDOMNode().selectionStart = 2;
                inputNode.getDOMNode().selectionEnd = 5;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '+7 84' } });

                expect(inputNode.getDOMNode().selectionStart).toBe(3);
                expect(inputNode.getDOMNode().selectionEnd).toBe(3);
                done();
            }, 0);
        });

    it('should return `HTMLInputElement` when `getControl` method called', () => {
        let maskedInput = mount(<MaskedInput mask='111' />);
        let controlNode = maskedInput.instance().getControl();

        expect(controlNode).toBeInstanceOf(HTMLInputElement);
    });
});
