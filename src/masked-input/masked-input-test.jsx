/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import MaskedInput, { getAndroidVersion } from './masked-input';

describe('masked-input', () => {
    afterEach(cleanUp);

    // Тестирование функции, возвращающей версию андроид-браузера
    describe('android version', () => {
        it('should return version 4.0.4', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                configurable: true,
                get: () =>
                    'Mozilla/5.0 (Linux; U; Android 4.0.4; pt-br; MZ608 Build/7.7.1-141-7-FLEM-UMTS-LA) ' +
                    'AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30'
            });

            expect(getAndroidVersion()).to.equal('4.0.4');
        });

        it('should return false', () => {
            Object.defineProperty(window.navigator, 'userAgent', {
                configurable: true,
                get: () =>
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko)' +
                    'Chrome/67.0.3396.99 Safari/537.36'
            });

            expect(getAndroidVersion()).to.equal(false);
        });
    });

    it('should render without problems', () => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' />);

        expect(maskedInput.node).to.exist;
        expect(maskedInput.node).to.match('input');
    });

    it('should format unformatted value', () => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        expect(maskedInput.node.value).to.equal('1234 5678 9012 3456');
    });

    it('should format unformatted value with custom formatter', () => {
        const cyrillic = {
            c: {
                validate(char) {
                    return /^[ЁёА-Яа-я]$/.test(char);
                }
            }
        };
        let maskedInput = render(<MaskedInput formatCharacters={ cyrillic } mask='c 111 cc' value='12-3hjhkА456ИТг' />);

        expect(maskedInput.node.value).to.equal('А 456 ИТ');
    });

    it('should strip value size to mask size', () => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='1234 5678 9012 3456 7890 1234' />);

        expect(maskedInput.node.value).to.equal('1234 5678 9012 3456');
    });

    it('should format value skipping non maskable chars', () => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='Abc 1234 @&&*() 5678 klm90123456' />);

        expect(maskedInput.node.value).to.equal('1234 5678 9012 3456');
    });

    it('should reformat value by new mask after mask was changed', () => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        maskedInput = render(<MaskedInput mask='+1 (111) 111-11-11' value='1234567890123456' />);

        expect(maskedInput.node.value).to.equal('+1 (234) 567-89-01');
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
        let maskedInput = render(<MaskedInput mask={ mask } value='абв6гщз' />);

        maskedInput = render(<MaskedInput mask={ mask } formatCharacters={ cyrillic } value='абв6гщз' />);

        expect(maskedInput.node.value).to.equal('абв 6 гщз');
    });

    it('should reformat value after value was changed', () => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='1234567890123456' />);

        maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='0987654321098765' />);

        expect(maskedInput.node.value).to.equal('0987 6543 2109 8765');
    });

    it('should focus on input after focus() call', (done) => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' />);

        maskedInput.instance.focus();

        setTimeout(() => {
            expect(document.activeElement === maskedInput.node).to.be.equal(true);
            done();
        }, 0);
    });

    it('should remove focus from input after blur() call', (done) => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' />);

        maskedInput.instance.focus();

        setTimeout(() => {
            maskedInput.instance.blur();
            expect(document.activeElement !== maskedInput.node).to.be.equal(true);
            done();
        }, 0);
    });

    it('should call `onProcessInputEvent` during `onInput` process', (done) => {
        let onProcessInputEvent = sinon.spy();
        let maskedInput = render(
            <MaskedInput mask='1111 1111 1111 1111' value='1234 5' onProcessInputEvent={ onProcessInputEvent } />
        );

        maskedInput.instance.focus();

        setTimeout(() => {
            simulate(maskedInput.node, 'beforeInput');
            simulate(maskedInput.node, 'input', { target: { value: '1234 5' } });

            expect(onProcessInputEvent).to.have.been.calledOnce;
            done();
        }, 0);
    });

    it('should move caret position from uneditable position to next editable position during `onInput`', (done) => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='1234 5' />);

        maskedInput.instance.focus();

        setTimeout(() => {
            maskedInput.node.selectionStart = 4;
            maskedInput.node.selectionEnd = 4;

            simulate(maskedInput.node, 'beforeInput');
            simulate(maskedInput.node, 'input', { target: { value: '1234 5' } });

            expect(maskedInput.node.selectionStart).to.equal(5);
            expect(maskedInput.node.selectionEnd).to.equal(5);
            done();
        }, 0);
    });

    it('should move caret position from uneditable position to prev editable position during `onInput` (delete)', (done) => {
        let maskedInput = render(<MaskedInput mask='1111 1111 1111 1111' value='1234 5' />);

        maskedInput.instance.focus();

        setTimeout(() => {
            maskedInput.node.selectionStart = 5;
            maskedInput.node.selectionEnd = 5;

            simulate(maskedInput.node, 'beforeInput');
            simulate(maskedInput.node, 'input', { target: { value: '1234 ' } });

            expect(maskedInput.node.selectionStart).to.equal(4);
            expect(maskedInput.node.selectionEnd).to.equal(4);
            done();
        }, 0);
    });

    it('should move caret position from uneditable position to next editable position during `onInput` (replace)', (done) => {
        let maskedInput = render(<MaskedInput mask='+1 111 11 11 11' value='+7 903 752' />);

        maskedInput.instance.focus();

        setTimeout(() => {
            maskedInput.node.selectionStart = 2;
            maskedInput.node.selectionEnd = 5;

            simulate(maskedInput.node, 'beforeInput');
            simulate(maskedInput.node, 'input', { target: { value: '+7 84' } });

            expect(maskedInput.node.selectionStart).to.equal(3);
            expect(maskedInput.node.selectionEnd).to.equal(3);
            done();
        }, 0);
    });

    it('should return `HTMLInputElement` when `getControl` method called', () => {
        let maskedInput = render(<MaskedInput mask='111' />);
        let controlNode = maskedInput.instance.getControl();

        expect(controlNode).to.be.instanceOf(HTMLInputElement);
    });
});
