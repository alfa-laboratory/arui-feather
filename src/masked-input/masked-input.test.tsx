/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from 'react';
import { shallow, mount } from 'enzyme';

import MaskedInput, { getAndroidVersion } from './masked-input';

describe('masked-input', () => {
    // Тестирование функции, возвращающей версию андроид-браузера
    describe('android version', () => {
        it('should return version 4.0.4', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                configurable: true,
                get: () => 'Mozilla/5.0 (Linux; U; Android 4.0.4; pt-br; MZ608 Build/7.7.1-141-7-FLEM-UMTS-LA) ' +
                    'AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30'
            });

            expect(getAndroidVersion()).toBe('4.0.4');
        });

        it('should return false', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                configurable: true,
                get: () => 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko)' +
                    'Chrome/67.0.3396.99 Safari/537.36'
            });

            expect(getAndroidVersion()).toBe(false);
        });
    });

    it('should render without problems', () => {
        const maskedInput = shallow(<MaskedInput mask='1111 1111 1111 1111' />);

        expect(maskedInput).toMatchSnapshot();
    });

    it('should format unformatted value', () => {
        const maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        expect(maskedInput.find('input').props().value).toBe('1234 5678 9012 3456');
    });

    it('should format unformatted value with custom formatter', () => {
        const cyrillic = {
            c: {
                validate(char) {
                    return /^[ЁёА-Яа-я]$/.test(char);
                }
            }
        };
        const maskedInput = mount(
            <MaskedInput formatCharacters={ cyrillic } mask='c 111 cc' value='12-3hjhkА456ИТг' />
        );

        expect(maskedInput.find('input').props().value).toBe('А 456 ИТ');
    });

    it('should strip value size to mask size', () => {
        const maskedInput = mount(
            <MaskedInput mask='1111 1111 1111 1111' value='1234 5678 9012 3456 7890 1234' />
        );

        expect(maskedInput.find('input').props().value).toBe('1234 5678 9012 3456');
    });

    it('should format value skipping non maskable chars', () => {
        const maskedInput = mount(
            <MaskedInput mask='1111 1111 1111 1111' value='Abc 1234 @&&*() 5678 klm90123456' />
        );

        expect(maskedInput.find('input').props().value).toBe('1234 5678 9012 3456');
    });

    it('should reformat value by new mask after mask was changed', () => {
        const maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        maskedInput.setProps({
            mask: '+1 (111) 111-11-11'
        });

        expect(maskedInput.find('input').props().value).toBe('+1 (234) 567-89-01');
    });

    it('should reformat value by new mask after formatCharacters was changed', () => {
        const mask = 'ccc 1 ccc';
        const cyrillic = {
            c: {
                validate(char) {
                    return /^[ЁёА-Яа-я]$/.test(char);
                }
            }
        };
        const maskedInput = mount(<MaskedInput mask={ mask } value='абв6гщз' />);

        maskedInput.setProps({ formatCharacters: cyrillic });

        expect(maskedInput.find('input').props().value).toBe('абв 6 гщз');
    });

    it('should reformat value after value was changed', () => {
        const maskedInput = mount(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        maskedInput.setProps({ value: '0987654321098765' });

        expect(maskedInput.find('input').props().value).toBe('0987 6543 2109 8765');
    });

    it('should focus on input after focus() call', () => {
        const maskedInput = mount<MaskedInput>(<MaskedInput mask='1111 1111 1111 1111' />);
        const inputNode = maskedInput.instance().input;

        jest.spyOn(inputNode, 'focus');

        maskedInput.instance().focus();

        expect(inputNode.focus).toHaveBeenCalled();
    });

    it('should remove focus from input after blur() call', () => {
        const maskedInput = mount<MaskedInput>(<MaskedInput mask='1111 1111 1111 1111' />);
        const inputNode = maskedInput.instance().input;

        jest.spyOn(inputNode, 'blur');

        maskedInput.instance().blur();

        expect(inputNode.blur).toHaveBeenCalled();
    });

    it('should call `onProcessInputEvent` during `onInput` process', (done) => {
        const onProcessInputEvent = jest.fn();
        const maskedInput = mount<MaskedInput>(
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
            const maskedInput = mount<MaskedInput>(<MaskedInput mask='1111 1111 1111 1111' value='1234 5' />);
            const inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                inputNode.getDOMNode<HTMLInputElement>().selectionStart = 4;
                inputNode.getDOMNode<HTMLInputElement>().selectionEnd = 4;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '1234 5' } });

                expect(inputNode.getDOMNode<HTMLInputElement>().selectionStart).toBe(5);
                expect(inputNode.getDOMNode<HTMLInputElement>().selectionEnd).toBe(5);
                done();
            }, 0);
        });

    it('should move caret position from uneditable position to prev editable position during `onInput` (delete)',
        (done) => {
            const maskedInput = mount<MaskedInput>(<MaskedInput mask='1111 1111 1111 1111' value='1234 5' />);
            const inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                inputNode.getDOMNode<HTMLInputElement>().selectionStart = 5;
                inputNode.getDOMNode<HTMLInputElement>().selectionEnd = 5;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '1234 ' } });

                expect(inputNode.getDOMNode<HTMLInputElement>().selectionStart).toBe(4);
                expect(inputNode.getDOMNode<HTMLInputElement>().selectionEnd).toBe(4);
                done();
            }, 0);
        });

    it('should move caret position from uneditable position to next editable position during `onInput` (replace)',
        (done) => {
            const maskedInput = mount<MaskedInput>(<MaskedInput mask='+1 111 11 11 11' value='+7 903 752' />);
            const inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                inputNode.getDOMNode<HTMLInputElement>().selectionStart = 2;
                inputNode.getDOMNode<HTMLInputElement>().selectionEnd = 5;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '+7 84' } });

                expect(inputNode.getDOMNode<HTMLInputElement>().selectionStart).toBe(3);
                expect(inputNode.getDOMNode<HTMLInputElement>().selectionEnd).toBe(3);
                done();
            }, 0);
        });

    it('should move caret position, if the number of non-editable characters has decreased at left of the caret',
        (done) => {
            const maskedInput = mount<MaskedInput>(<MaskedInput mask='111 111 111' value='124 567' />);
            const inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                maskedInput.setProps({ mask: '1 111 111' });

                inputNode.getDOMNode<HTMLInputElement>().selectionStart = 3;
                inputNode.getDOMNode<HTMLInputElement>().selectionEnd = 3;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '1 234 567' } });

                expect(inputNode.getDOMNode<HTMLInputElement>().selectionStart).toBe(4);
                expect(inputNode.getDOMNode<HTMLInputElement>().selectionEnd).toBe(4);
                done();
            }, 0);
        });

    it('should move caret position, if the number of non-editable characters has decreased at left of the caret',
        (done) => {
            const maskedInput = mount<MaskedInput>(<MaskedInput mask='1 111 111' value='1 234 567' />);
            const inputNode = maskedInput.find('input');

            maskedInput.instance().focus();

            setTimeout(() => {
                maskedInput.setProps({ mask: '111 111 111' });

                inputNode.getDOMNode<HTMLInputElement>().selectionStart = 3;
                inputNode.getDOMNode<HTMLInputElement>().selectionEnd = 3;

                inputNode.simulate('beforeInput');
                inputNode.simulate('input', { target: { value: '124 567' } });

                expect(inputNode.getDOMNode<HTMLInputElement>().selectionStart).toBe(2);
                expect(inputNode.getDOMNode<HTMLInputElement>().selectionEnd).toBe(2);
                done();
            }, 0);
        });

    it('should return `HTMLInputElement` when `getControl` method called', () => {
        const maskedInput = mount<MaskedInput>(<MaskedInput mask='111' />);
        const controlNode = maskedInput.instance().getControl();

        expect(controlNode).toBeInstanceOf(HTMLInputElement);
    });
});
