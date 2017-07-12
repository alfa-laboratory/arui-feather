/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { render, cleanUp, simulate } from '../test-utils';

import InputAutocomplete from './input-autocomplete';

import { SCROLL_TO_CORRECTION } from '../vars';

const OPTIONS = [
    { value: 'Vkontakte' },
    { value: 'Facebook' },
    { value: 'Twitter' }
];

const OPTIONS2 = [
    {
        value: 'Vkontakte'
    },
    {
        value: 'Vkontakte',
        key: 'vk2'
    }
];

function renderInputAutocomplete(props = {}) {
    let inputAutocomplete = render(<InputAutocomplete { ...props } />);

    let inputNode = inputAutocomplete.node.querySelector('.input');
    let controlNode = inputAutocomplete.node.querySelector('input');
    let popupNode = document.querySelector('.popup');

    return { inputAutocomplete, inputNode, controlNode, popupNode };
}

describe('input-autocomplete', () => {
    let originalWindowScrollTo = window.scrollTo;

    beforeEach(() => {
        window.scrollTo = chai.spy();
    });

    afterEach(() => {
        cleanUp();
        window.scrollTo = originalWindowScrollTo;
    });

    it('should render without problem', () => {
        let { inputAutocomplete } = renderInputAutocomplete();

        expect(inputAutocomplete.node).to.exist;
    });

    it('should render without problem when give item with duplicate value', () => {
        let { popupNode } = renderInputAutocomplete({ options: OPTIONS2 });
        let optionsNode = popupNode.querySelectorAll('.menu-item');

        expect(optionsNode.length).is.equal(OPTIONS2.length);
    });

    it('should render input and popup with options', () => {
        let { popupNode, controlNode } = renderInputAutocomplete({ options: OPTIONS });

        expect(popupNode).to.have.class('popup');
        expect(controlNode).to.have.class('input__control');
    });

    it('should set class on public focus method', (done) => {
        let { inputAutocomplete, inputNode } = renderInputAutocomplete();

        inputAutocomplete.instance.focus();

        setTimeout(() => {
            expect(inputNode).to.have.class('input_focused');
            done();
        }, 0);
    });

    it('should scroll window to element on public scrollTo method', (done) => {
        let { inputAutocomplete, inputNode } = renderInputAutocomplete();
        let elemTopPosition = inputNode.getBoundingClientRect().top;
        let elemScrollTo = (elemTopPosition + window.pageYOffset) - SCROLL_TO_CORRECTION;

        inputAutocomplete.instance.scrollTo();

        setTimeout(() => {
            expect(window.scrollTo).to.have.been.called.with(0, elemScrollTo);
            done();
        }, 0);
    });

    it('should unset class on input blur', (done) => {
        let { inputAutocomplete, inputNode } = renderInputAutocomplete();

        inputAutocomplete.instance.focus();

        expect(inputNode).to.have.class('input_focused');

        setTimeout(() => {
            inputAutocomplete.instance.blur();

            setTimeout(() => {
                expect(inputNode).to.not.have.class('input_focused');
                done();
            }, 0);
        }, 0);
    });

    it('should set width to popup equal or more than button width', () => {
        let { popupNode, inputNode } = renderInputAutocomplete({ options: OPTIONS, opened: true });

        let inputWidth = inputNode.getBoundingClientRect().width;
        let popupWidth = popupNode.getBoundingClientRect().width;

        expect(popupWidth).to.be.at.least(inputWidth);
    });

    it('should set popup width equal to input width when equalPopupWidth = true', () => {
        let props = {
            options: [
                {
                    value: `Very, very long option text
                            used just to make autocomplete popup
                            strech really really wide and another
                            couple of words just to be sure`
                }
            ],
            equalPopupWidth: true,
            opened: true
        };

        let { popupNode, inputNode } = renderInputAutocomplete(props);
        let popupWidth = popupNode.getBoundingClientRect().width;
        let inputWidth = inputNode.getBoundingClientRect().width;

        expect(popupWidth).to.be.equal(inputWidth);
    });

    it('should set directions to popup', () => {
        let { popupNode } = renderInputAutocomplete({ options: OPTIONS, directions: ['right-bottom'] });
        expect(popupNode).to.have.class('popup_direction_right-bottom');
    });

    it('should render all options when input value is empty', () => {
        let { popupNode } = renderInputAutocomplete({ options: OPTIONS });
        let optionsNode = popupNode.querySelectorAll('.menu-item');

        expect(optionsNode.length).is.equal(OPTIONS.length);
    });

    it('should change input value after option was clicked', (done) => {
        let { popupNode, controlNode } = renderInputAutocomplete({ options: OPTIONS });
        let firstOptionNode = popupNode.querySelector('.menu-item');

        firstOptionNode.click();

        setTimeout(() => {
            expect(controlNode).to.have.attr('value', OPTIONS[0].value);
            done();
        }, 0);
    });

    it('should call `onItemSelect` callback after option was clicked', () => {
        let onItemSelect = chai.spy();
        let { popupNode } = renderInputAutocomplete({ onItemSelect, options: OPTIONS });
        let firstOptionNode = popupNode.querySelector('.menu-item');

        firstOptionNode.click();

        expect(onItemSelect).to.have.been.called.once;
    });

    it('should call `onChange` callback after option was clicked and pass value to it', () => {
        let onChange = chai.spy();
        let { popupNode } = renderInputAutocomplete({ onChange, options: OPTIONS });
        let firstOptionNode = popupNode.querySelector('.menu-item');

        firstOptionNode.click();

        expect(onChange).to.have.been.called.with('Vkontakte');
    });

    it('should call `onKeyDown` callback after key down in input', () => {
        let onKeyDown = chai.spy();
        let { controlNode } = renderInputAutocomplete({ onKeyDown });

        simulate(controlNode, 'keyDown');

        expect(onKeyDown).to.have.been.called.once;
    });

    it('should call `onFocus` callback after component was focused', (done) => {
        let onFocus = chai.spy();
        let { inputAutocomplete } = renderInputAutocomplete({ onFocus });

        inputAutocomplete.instance.focus();

        setTimeout(() => {
            expect(onFocus).to.have.been.called.once;
            done();
        }, 0);
    });

    it('should call `onBlur` callback after component was blured', (done) => {
        let onBlur = chai.spy();
        let { inputAutocomplete } = renderInputAutocomplete({ onBlur });

        inputAutocomplete.instance.focus();

        setTimeout(() => {
            inputAutocomplete.instance.blur();

            setTimeout(() => {
                expect(onBlur).to.have.been.called.once;
                done();
            }, 0);
        }, 0);
    });

    it('should call `onChange` callback', () => {
        let onChange = chai.spy();
        let { controlNode } = renderInputAutocomplete({ onChange });

        simulate(controlNode, 'change', { target: { value: 'other value' } });

        expect(onChange).to.have.been.called.once;
    });
});
